import type { VercelRequest, VercelResponse } from "@vercel/node";

type Enquiry = {
  fullName?: string;
  businessEmail?: string;
  companyName?: string;
  taxId?: string;
  volume?: string;
  tradeType?: string;
  details?: string;
};

function value(input: unknown): string {
  return typeof input === "string" ? input.trim() : "";
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const enquiry = (request.body ?? {}) as Enquiry;
  const fullName = value(enquiry.fullName);
  const businessEmail = value(enquiry.businessEmail);
  const companyName = value(enquiry.companyName);

  if (!fullName || !businessEmail || !companyName) {
    return response.status(400).json({ error: "Name, business email, and company name are required" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendApiKey || !fromEmail) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
    return response.status(500).json({ error: "Email service is not configured" });
  }

  const recipient = value(enquiry.tradeType).toLowerCase().includes("overseas")
    ? "overseas@dtdc.live"
    : "help@dtdc.live";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipient],
      reply_to: businessEmail,
      subject: `Merchant Enquiry - ${companyName}`,
      text: [
        `Full Name: ${fullName}`,
        `Business Email: ${businessEmail}`,
        `Company Name: ${companyName}`,
        `GSTIN / Tax ID: ${value(enquiry.taxId)}`,
        `Estimated Monthly Volume: ${value(enquiry.volume)}`,
        `Trade Type: ${value(enquiry.tradeType)}`,
        "",
        `Requirement Details:\n${value(enquiry.details)}`,
      ].join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend rejected email:", await resendResponse.text());
    return response.status(502).json({ error: "Email provider rejected the request" });
  }

  return response.status(200).json({ ok: true });
}
