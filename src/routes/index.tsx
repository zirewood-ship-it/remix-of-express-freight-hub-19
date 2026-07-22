import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Truck, Plane, Landmark, Warehouse, ArrowRight, Calculator, Globe, ShieldCheck, Zap, BarChart3,
} from "lucide-react";
import { TrackingWidget } from "@/components/tracking/TrackingWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DTDC XPRESS+ — B2B Enterprise Global Logistics" },
      { name: "description", content: "Track B2B freight, get instant rate estimates, and access enterprise-grade global logistics for Merchant-to-Merchant trade." },
      { property: "og:title", content: "DTDC XPRESS+ — B2B Enterprise Global Logistics" },
      { property: "og:description", content: "Accelerated global logistics for enterprise and B2B merchants." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Truck, title: "LTL & FTL Freight", desc: "Less-than-truckload and full-truckload freight across pan-India corridors with GPS-tracked fleet." },
  { icon: Plane, title: "AirMax Priority Freight", desc: "Time-critical air freight to 200+ international lanes. Guaranteed uplift and priority handling." },
  { icon: Landmark, title: "Cross-Border Customs", desc: "Licensed customs house agents. HS classification, IEC support and door-to-door DDP delivery." },
  { icon: Warehouse, title: "Warehousing & ERP API", desc: "Bonded warehousing, VMI programs and REST APIs to integrate with your SAP / Oracle / NetSuite." },
];

function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <RateEstimator />
      <TrustBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
        backgroundSize: "60px 60px, 40px 40px",
      }} />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-red/20 blur-3xl" />
      <div className="container-x relative py-14 md:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
            Merchant-to-Merchant Trade Only
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Accelerated Global Logistics for <span className="text-red">Enterprise & B2B Merchants</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            Purpose-built for B2B trade orders. Move pallets, containers and air-freight across
            50+ countries with a single merchant contract, live tracking, and a dedicated
            enterprise success desk.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/portal" className="inline-flex items-center gap-2 rounded-md bg-red px-5 py-3 text-sm font-semibold text-red-foreground hover:brightness-110">
              Start Merchant Onboarding <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Explore Services
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "50+", v: "Countries" },
              { k: "12k+", v: "B2B Merchants" },
              { k: "99.4%", v: "On-time SLA" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl md:text-3xl font-bold">{s.k}</div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
            <Zap className="h-4 w-4 text-red" /> Live Tracking Hub
          </div>
          <TrackingWidget />
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-red">Key B2B Services</div>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">One partner for every enterprise freight mode.</h2>
        <p className="mt-3 text-muted-foreground">From regional trucking to cross-border air, we consolidate your logistics under a single merchant contract.</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.title} className="group rounded-xl border border-border bg-white p-6 hover:border-navy hover:shadow-lg transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-navy-foreground group-hover:bg-red transition">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const RATE_PER_KG: Record<string, number> = {
  "IN-IN": 22, "IN-DE": 480, "IN-US": 620, "IN-AE": 310, "IN-SG": 280, "IN-GB": 510, "IN-CN": 250,
};
const TRANSIT_DAYS: Record<string, string> = {
  "IN-IN": "2–4 days", "IN-DE": "6–9 days", "IN-US": "7–11 days", "IN-AE": "4–6 days",
  "IN-SG": "4–6 days", "IN-GB": "6–9 days", "IN-CN": "5–8 days",
};
const COUNTRIES = [
  { code: "IN", name: "India" }, { code: "DE", name: "Germany" }, { code: "US", name: "United States" },
  { code: "AE", name: "UAE" }, { code: "SG", name: "Singapore" }, { code: "GB", name: "United Kingdom" }, { code: "CN", name: "China" },
];

function RateEstimator() {
  const [origin, setOrigin] = useState("IN");
  const [dest, setDest] = useState("DE");
  const [weight, setWeight] = useState(100);
  const [dim, setDim] = useState("120x100x80");

  const quote = useMemo(() => {
    const key = `${origin}-${dest}`;
    const rate = RATE_PER_KG[key] ?? RATE_PER_KG[`IN-${dest}`] ?? 400;
    const [l, w, h] = dim.split("x").map(Number);
    const vol = (l && w && h) ? Math.round((l * w * h) / 5000) : 0;
    const chargeable = Math.max(weight, vol);
    const price = chargeable * rate;
    const transit = TRANSIT_DAYS[key] ?? TRANSIT_DAYS[`IN-${dest}`] ?? "5–9 days";
    return { chargeable, price, transit, vol };
  }, [origin, dest, weight, dim]);

  return (
    <section className="bg-slate">
      <div className="container-x py-16 md:py-24 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-red">Quick Freight Rate Estimator</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Get an instant B2B quote.</h2>
          <p className="mt-3 text-muted-foreground max-w-md">
            Enter your lane and cargo details for a live estimate. Final rates include fuel,
            customs and last-mile — confirmed by your merchant desk within 2 business hours.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              [Globe, "Live rates across 50+ international lanes"],
              [ShieldCheck, "All-risk cargo insurance available at 0.18% of CIF"],
              [BarChart3, "Volumetric weight auto-calculated (L×W×H / 5000)"],
            ].map(([Icon, t], i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-navy text-navy-foreground shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span>{t as string}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-navy">
            <Calculator className="h-5 w-5 text-red" />
            <div className="font-bold">Rate Calculator</div>
          </div>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Field label="Origin Country">
              <select value={origin} onChange={e => setOrigin(e.target.value)} className="input">
                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Destination Country">
              <select value={dest} onChange={e => setDest(e.target.value)} className="input">
                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Parcel Weight (kg)">
              <input type="number" min={1} value={weight} onChange={e => setWeight(Number(e.target.value) || 0)} className="input" />
            </Field>
            <Field label="Dimensions L×W×H (cm)">
              <input value={dim} onChange={e => setDim(e.target.value)} className="input" placeholder="120x100x80" />
            </Field>
          </div>

          <div className="mt-6 rounded-lg bg-navy text-navy-foreground p-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Chargeable</div>
                <div className="mt-1 text-xl font-bold">{quote.chargeable} kg</div>
                {quote.vol > 0 && <div className="text-xs text-white/60">Vol: {quote.vol} kg</div>}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Transit</div>
                <div className="mt-1 text-xl font-bold">{quote.transit}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Estimated Quote</div>
                <div className="mt-1 text-xl font-bold text-red">₹{quote.price.toLocaleString("en-IN")}</div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Indicative rate. Actual quote confirmed by merchant desk. For overseas cargo, email <a className="font-semibold text-red hover:underline" href="mailto:overseas@dtdc.live">overseas@dtdc.live</a>.
          </p>
        </div>
      </div>
      <style>{`.input{height:2.5rem;width:100%;border-radius:.375rem;border:1px solid var(--color-input);padding:0 .75rem;font-size:.875rem;background:white;outline:none}.input:focus{border-color:var(--color-navy);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-navy) 10%, transparent)}`}</style>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="container-x py-16 md:py-20 text-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Trusted by enterprise merchants</div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-bold text-muted-foreground/70">
        <div>TATA STEEL</div><div>MAHINDRA</div><div>RELIANCE</div><div>WIPRO</div><div>ADITYA BIRLA</div><div>ASHOK LEYLAND</div>
      </div>
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
