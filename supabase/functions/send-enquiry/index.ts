import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = await request.json();
    const requiredFields = ["fullName", "businessEmail", "companyName"];
    const missingField = requiredFields.find((field) => !String(payload[field] ?? "").trim());

    if (missingField) {
      return new Response(JSON.stringify({ error: `${missingField} is required` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");
    if (!resendApiKey || !fromEmail) {
      throw new Error("RESEND_API_KEY and RESEND_FROM_EMAIL must be configured");
    }

    const email = {
      from: fromEmail,
      to: [String(payload.tradeType ?? "").toLowerCase().includes("overseas") ? "overseas@dtdc.live" : "help@dtdc.live"],
      reply_to: String(payload.businessEmail).trim(),
      subject: `Merchant Enquiry - ${String(payload.companyName).trim()}`,
      text: [
        `Full Name: ${String(payload.fullName).trim()}`,
        `Business Email: ${String(payload.businessEmail).trim()}`,
        `Company Name: ${String(payload.companyName).trim()}`,
        `GSTIN / Tax ID: ${String(payload.taxId ?? "").trim()}`,
        `Estimated Monthly Volume: ${String(payload.volume ?? "").trim()}`,
        `Trade Type: ${String(payload.tradeType ?? "").trim()}`,
        "",
        `Requirement Details:\n${String(payload.details ?? "").trim()}`,
      ].join("\n"),
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: "Email provider rejected the request" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-enquiry error:", error);
    return new Response(JSON.stringify({ error: "Unable to send enquiry" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
