import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rates")({
  head: () => ({
    meta: [
      { title: "Rates & Transit Time — DTDC XPRESS+" },
      { name: "description", content: "Indicative B2B freight rates and transit windows for domestic and international lanes." },
      { property: "og:title", content: "Rates & Transit Time — DTDC XPRESS+" },
      { property: "og:description", content: "Indicative freight rates and transit windows." },
    ],
  }),
  component: Rates,
});

const lanes = [
  { from: "Bengaluru, IN", to: "Gurugram, IN", mode: "FTL Road", transit: "2–3 days", rate: "₹22/kg", overseas: false },
  { from: "Mumbai, IN", to: "Chennai, IN", mode: "LTL Road", transit: "3–4 days", rate: "₹28/kg", overseas: false },
  { from: "Delhi, IN", to: "Kolkata, IN", mode: "AirMax Domestic", transit: "24–36 hrs", rate: "₹95/kg", overseas: false },
  { from: "Mumbai, IN", to: "Hamburg, DE", mode: "AirMax Priority", transit: "6–9 days", rate: "₹480/kg", overseas: true },
  { from: "Chennai, IN", to: "Dubai, AE", mode: "AirMax Priority", transit: "4–6 days", rate: "₹310/kg", overseas: true },
  { from: "Bengaluru, IN", to: "New York, US", mode: "AirMax Priority", transit: "7–11 days", rate: "₹620/kg", overseas: true },
  { from: "Mumbai, IN", to: "Singapore, SG", mode: "Ocean LCL", transit: "10–14 days", rate: "₹85/kg", overseas: true },
  { from: "Mundra, IN", to: "Rotterdam, NL", mode: "Ocean FCL 40'", transit: "22–28 days", rate: "₹2.4L / container", overseas: true },
];

function Rates() {
  return (
    <>
      <section className="bg-navy text-navy-foreground">
        <div className="container-x py-14 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold">Rates & Transit Time</h1>
          <p className="mt-4 text-white/75 max-w-2xl">Indicative merchant rates for popular lanes. Volume merchants access contracted rates via the Merchant Portal.</p>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate">
                <tr className="text-left">
                  <Th>Origin</Th><Th>Destination</Th><Th>Service Mode</Th><Th>Transit Time</Th><Th>Indicative Rate</Th><Th>Type</Th>
                </tr>
              </thead>
              <tbody>
                {lanes.map((l, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/40">
                    <Td className="font-medium">{l.from}</Td>
                    <Td className="font-medium">{l.to}</Td>
                    <Td>{l.mode}</Td>
                    <Td>{l.transit}</Td>
                    <Td className="font-semibold text-navy">{l.rate}</Td>
                    <Td>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        l.overseas ? "bg-red/10 text-red" : "bg-navy/10 text-navy"
                      }`}>{l.overseas ? "Overseas" : "Domestic"}</span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Rates exclude GST, fuel surcharge and destination taxes. Contracted rates available on volumes &gt; 5T / month.
        </p>
      </section>
    </>
  );
}

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{children}</th>
);
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 ${className}`}>{children}</td>
);
