import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Building2, KeyRound, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Merchant Portal — DTDC XPRESS+" },
      { name: "description", content: "B2B merchant login and enterprise onboarding for DTDC XPRESS+." },
      { property: "og:title", content: "Merchant Portal — DTDC XPRESS+" },
      { property: "og:description", content: "Sign in or start enterprise onboarding." },
    ],
  }),
  component: Portal,
});

function Portal() {
  return (
    <section className="container-x py-16 md:py-24 grid md:grid-cols-2 gap-8 items-start">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-red">Merchant Access</div>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold text-navy">Enterprise Merchant Portal</h1>
        <p className="mt-4 text-muted-foreground max-w-md">
          A single sign-on for booking, tracking, invoicing and API keys. Onboarding
          is confirmed by our merchant success desk within one business day.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          {[
            [ShieldCheck, "SOC-2 compliant merchant workspace"],
            [Building2, "Multi-branch billing & consolidated invoicing"],
            [KeyRound, "Production API keys for ERP integration"],
          ].map(([Icon, t], i) => (
            <li key={i} className="flex items-start gap-3">
              <Icon className="h-5 w-5 text-red mt-0.5" />
              <span>{t as string}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-white shadow-sm p-6 md:p-8">
        <div className="flex gap-2">
          <button className="flex-1 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-navy-foreground">Merchant Login</button>
          <Link to="/contact" className="flex-1 rounded-md border border-input px-4 py-2.5 text-sm font-semibold text-center">New Onboarding</Link>
        </div>
        <div className="mt-6 space-y-4">
          <Field label="Business Email">
            <input type="email" placeholder="ops@yourcompany.com" className="input" />
          </Field>
          <Field label="Merchant Code / GSTIN">
            <input placeholder="e.g. 29AAAAA0000A1Z5" className="input" />
          </Field>
          <Field label="Password">
            <input type="password" placeholder="••••••••" className="input" />
          </Field>
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-red px-5 py-3 text-sm font-semibold text-red-foreground">
            Sign in to Portal <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 pt-5 border-t border-border text-xs text-muted-foreground">
          New enterprise merchant? <Link to="/contact" className="font-semibold text-navy hover:text-red">Request onboarding →</Link>
        </div>
      </div>
      <style>{`.input{height:2.75rem;width:100%;border-radius:.375rem;border:1px solid var(--color-input);padding:0 .875rem;font-size:.875rem;background:white;outline:none}.input:focus{border-color:var(--color-navy);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-navy) 10%, transparent)}`}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">{label}</div>
      {children}
    </label>
  );
}
