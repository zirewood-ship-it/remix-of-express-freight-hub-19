import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Plane, Ship, Landmark, Warehouse, Thermometer, ArrowRight, Package } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "B2B Services & Freight — DTDC XPRESS+" },
      { name: "description", content: "Enterprise B2B cargo services: LTL, FTL, air, ocean, customs brokerage, temperature-controlled and container freight." },
      { property: "og:title", content: "B2B Services & Freight — DTDC XPRESS+" },
      { property: "og:description", content: "Detailed B2B cargo options for enterprise merchants." },
    ],
  }),
  component: Services,
});

const cargo = [
  {
    icon: Truck,
    title: "LTL & FTL Road Freight",
    tagline: "Pan-India surface network",
    specs: ["Fleet: 32ft SXL / 40ft MXL / Reefer / Container", "Payload: 3T – 32T", "Coverage: 21,000+ pin codes", "GPS-tracked with driver-app milestones"],
  },
  {
    icon: Plane,
    title: "AirMax Priority Freight",
    tagline: "Time-critical international air",
    specs: ["Dedicated block-space agreements with LH, EK, SQ", "Priority uplift within 24h", "Consolidated & direct routing", "Available ex-BLR / BOM / DEL / MAA / HYD"],
  },
  {
    icon: Ship,
    title: "Ocean FCL & LCL",
    tagline: "Full-container & consol cargo",
    specs: ["20ft / 40ft / 40HC / Reefer / Flat-rack", "LCL weekly consolidations to 40+ ports", "Origin & destination customs included", "Marine cargo insurance available"],
  },
  {
    icon: Landmark,
    title: "Cross-Border Customs Brokerage",
    tagline: "Licensed CHA operations",
    specs: ["HS classification & duty optimization", "IEC / AD-code registration support", "DDP door-to-door delivery", "Free-trade agreement advisory"],
  },
  {
    icon: Thermometer,
    title: "Temperature-Controlled Transit",
    tagline: "Pharma & perishables",
    specs: ["GDP-certified cold chain", "Range: -25°C to +25°C", "Live temperature telemetry", "Validated reefer containers"],
  },
  {
    icon: Warehouse,
    title: "Warehousing & ERP API",
    tagline: "3PL + integrations",
    specs: ["Bonded & FTWZ warehouses", "REST APIs for SAP / Oracle / NetSuite", "Vendor-managed inventory (VMI)", "Real-time inventory & GRN webhooks"],
  },
];

function Services() {
  return (
    <>
      <section className="bg-navy text-navy-foreground">
        <div className="container-x py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Package className="h-3.5 w-3.5 text-red" /> Services & Freight
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.1]">B2B cargo, engineered for scale.</h1>
            <p className="mt-4 text-white/75 text-lg max-w-2xl">
              Every mode of freight your enterprise trade requires — under one merchant contract, one API and one
              accountable success desk.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cargo.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-white p-6 hover:shadow-lg transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red text-red-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-navy">{c.title}</h3>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-1">{c.tagline}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.specs.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-red shrink-0" />
                    <span className="text-foreground/80">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-slate border border-border p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-navy">Need a custom freight plan?</h3>
            <p className="mt-2 text-muted-foreground max-w-xl">Our enterprise team designs multi-modal routing and dedicated capacity for high-volume merchants.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-red px-5 py-3 text-sm font-semibold text-red-foreground">
            Talk to Enterprise Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
