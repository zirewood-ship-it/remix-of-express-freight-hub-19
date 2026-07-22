import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, Globe, Mail, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — DTDC XPRESS+" },
      { name: "description", content: "Domestic and overseas merchant support desks for DTDC XPRESS+ B2B logistics." },
      { property: "og:title", content: "Contact & Support — DTDC XPRESS+" },
      { property: "og:description", content: "Separate desks for domestic and overseas B2B enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="bg-navy text-navy-foreground">
        <div className="container-x py-14 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold">Contact & Support</h1>
          <p className="mt-4 text-white/75 max-w-2xl">
            Two dedicated desks. Zero overlap. Reach the team that handles your specific trade lane.
          </p>
        </div>
      </section>

      <section className="container-x py-14 grid md:grid-cols-2 gap-5">
        <SupportCard
          icon={Truck}
          tag="Domestic"
          title="Domestic Freight & Tracking"
          desc="Pan-India LTL/FTL, AirMax domestic, warehousing and last-mile queries."
          email="help@dtdc.live"
        />
        <SupportCard
          icon={Globe}
          tag="Overseas"
          title="Overseas Cargo & Customs"
          desc="International air, ocean, customs brokerage, duties and DDP delivery."
          email="overseas@dtdc.live"
        />
      </section>

      <section className="container-x pb-20">
        <div className="rounded-2xl border border-border bg-white p-6 md:p-10 shadow-sm">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-red">Merchant Enquiry</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-navy">Tell us about your B2B trade needs.</h2>
            <p className="mt-2 text-muted-foreground">Our merchant success desk will respond within one business day.</p>
          </div>

          {sent ? (
            <div className="mt-8 rounded-lg border border-navy/20 bg-navy/5 p-6 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-navy mt-0.5" />
              <div>
                <div className="font-semibold text-navy">Enquiry received.</div>
                <div className="text-sm text-muted-foreground mt-1">A merchant success manager will be in touch within one business day.</div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-8 grid gap-4 md:grid-cols-2"
            >
              <Field label="Full Name" required><input required className="input" placeholder="Full name" /></Field>
              <Field label="Business Email" required><input required type="email" className="input" placeholder="ops@company.com" /></Field>
              <Field label="Company Name" required><input required className="input" placeholder="Legal business name" /></Field>
              <Field label="GSTIN / Tax ID"><input className="input" placeholder="e.g. 29AAAAA0000A1Z5" /></Field>
              <Field label="Estimated Monthly Volume">
                <select className="input">
                  <option>Under 500 kg / month</option>
                  <option>500 – 5,000 kg / month</option>
                  <option>5T – 25T / month</option>
                  <option>25T+ / month</option>
                </select>
              </Field>
              <Field label="Trade Type">
                <select className="input">
                  <option>Domestic freight</option>
                  <option>Overseas / cross-border</option>
                  <option>Both</option>
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Requirement Details"><textarea className="input h-28 py-2" placeholder="Lanes, cargo type, timelines…" /></Field>
              </div>
              <div className="md:col-span-2">
                <button className="inline-flex items-center gap-2 rounded-md bg-red px-6 py-3 text-sm font-semibold text-red-foreground">
                  Submit Enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      <style>{`.input{width:100%;border-radius:.375rem;border:1px solid var(--color-input);padding:.625rem .875rem;font-size:.875rem;background:white;outline:none;height:2.75rem}.input:focus{border-color:var(--color-navy);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-navy) 10%, transparent)}textarea.input{height:auto}`}</style>
    </>
  );
}

function SupportCard({ icon: Icon, tag, title, desc, email }: { icon: any; tag: string; title: string; desc: string; email: string; }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-navy-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-red/10 text-red">{tag}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <a href={`mailto:${email}`} className="mt-5 inline-flex items-center gap-2 rounded-md bg-slate border border-border px-4 py-3 text-sm font-semibold text-navy hover:bg-secondary w-full">
        <Mail className="h-4 w-4 text-red" /> {email}
      </a>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red">*</span>}
      </div>
      {children}
    </label>
  );
}
