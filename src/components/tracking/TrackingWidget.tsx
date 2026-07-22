import { useState } from "react";
import { Search, Loader2, PackageCheck, CheckCircle2, Circle, Mail, MapPin, ArrowRight } from "lucide-react";
import { findShipment, STATUS_FLOW, type Shipment, type Milestone } from "@/lib/shipments";

type Result = { shipment: Shipment; milestones: Milestone[] } | null;

export function TrackingWidget() {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [q, setQ] = useState("");
  const [bulk, setBulk] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [bulkResults, setBulkResults] = useState<Array<{ id: string; result: Result }>>([]);
  const [notFound, setNotFound] = useState<string | null>(null);

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return;
    setLoading(true); setNotFound(null); setResult(null);
    try {
      const r = await findShipment(q);
      if (!r) setNotFound(q.trim().toUpperCase());
      else setResult(r);
    } finally { setLoading(false); }
  }

  async function onBulk(e: React.FormEvent) {
    e.preventDefault();
    const ids = bulk.split(/[\s,\n]+/).map(s => s.trim()).filter(Boolean);
    if (!ids.length) return;
    setLoading(true); setBulkResults([]);
    const out = await Promise.all(ids.map(async id => ({ id, result: await findShipment(id) })));
    setBulkResults(out);
    setLoading(false);
  }

  return (
    <div className="rounded-xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
      <div className="flex border-b border-border">
        {(["single", "bulk"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 px-4 py-3.5 text-sm font-semibold transition ${
              mode === m ? "bg-white text-navy border-b-2 border-red" : "bg-secondary text-muted-foreground hover:text-navy"
            }`}
          >
            {m === "single" ? "Single Consignment" : "Bulk Tracking"}
          </button>
        ))}
      </div>

      <div className="p-5 md:p-6">
        {mode === "single" ? (
          <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2.5">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter AWB / Tracking ID (e.g. XP-DOM-9901)"
              className="flex-1 h-12 rounded-md border border-input px-4 text-sm font-medium outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-12 inline-flex items-center justify-center gap-2 rounded-md bg-red px-6 text-sm font-semibold text-red-foreground hover:brightness-110 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Track Shipment
            </button>
          </form>
        ) : (
          <form onSubmit={onBulk} className="flex flex-col gap-2.5">
            <textarea
              value={bulk}
              onChange={(e) => setBulk(e.target.value)}
              placeholder="Paste multiple AWB / Tracking IDs (comma, space or newline separated)"
              rows={3}
              className="w-full rounded-md border border-input px-4 py-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-11 inline-flex items-center justify-center gap-2 rounded-md bg-red px-6 text-sm font-semibold text-red-foreground hover:brightness-110 disabled:opacity-60 self-start"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Track {bulk.split(/[\s,\n]+/).filter(Boolean).length || ""} shipments
            </button>
          </form>
        )}

        <div className="mt-3 text-xs text-muted-foreground">
          Try demo IDs: <button onClick={() => { setQ("XP-DOM-9901"); setMode("single"); }} className="font-mono font-semibold text-navy hover:text-red">XP-DOM-9901</button>
          <span> · </span>
          <button onClick={() => { setQ("XP-INT-5002"); setMode("single"); }} className="font-mono font-semibold text-navy hover:text-red">XP-INT-5002</button>
        </div>

        {notFound && (
          <div className="mt-5 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
            <span className="font-semibold text-destructive">No shipment found</span> for tracking ID <span className="font-mono">{notFound}</span>.
          </div>
        )}

        {result && <ShipmentResult data={result} />}

        {bulkResults.length > 0 && (
          <div className="mt-5 space-y-3">
            {bulkResults.map(({ id, result: r }) => (
              <div key={id} className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm font-semibold">{id.toUpperCase()}</div>
                  {r ? (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      r.shipment.is_overseas ? "bg-red/10 text-red" : "bg-navy/10 text-navy"
                    }`}>{r.shipment.status}</span>
                  ) : <span className="text-xs text-destructive">Not found</span>}
                </div>
                {r && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                    <span>{r.shipment.origin}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span>{r.shipment.destination}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ShipmentResult({ data }: { data: { shipment: Shipment; milestones: Milestone[] } }) {
  const { shipment, milestones } = data;
  const currentIdx = Math.max(0, STATUS_FLOW.findIndex(s => s.toLowerCase() === shipment.status.toLowerCase()));

  return (
    <div className="mt-6 rounded-lg border border-border bg-slate/50 overflow-hidden">
      <div className="p-5 md:p-6 border-b border-border bg-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-navy">{shipment.tracking_number}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                shipment.is_overseas ? "bg-red/10 text-red" : "bg-navy/10 text-navy"
              }`}>
                {shipment.is_overseas ? "Overseas" : "Domestic"}
              </span>
            </div>
            <div className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Sender</div>
                <div className="font-semibold">{shipment.sender_company}</div>
                <div className="text-xs text-muted-foreground">{shipment.origin}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Receiver</div>
                <div className="font-semibold">{shipment.receiver_company}</div>
                <div className="text-xs text-muted-foreground">{shipment.destination}</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Current Status</div>
            <div className="mt-1 inline-flex items-center gap-2 rounded-md bg-navy px-3 py-1.5 text-navy-foreground">
              <PackageCheck className="h-4 w-4 text-red" />
              <span className="text-sm font-semibold">{shipment.status}</span>
            </div>
            {shipment.estimated_delivery && (
              <div className="mt-2 text-xs text-muted-foreground">
                ETA: <span className="font-semibold text-foreground">{new Date(shipment.estimated_delivery).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            )}
            <div className="mt-1 text-xs text-muted-foreground">Weight: {shipment.weight_kg} kg</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 p-5 md:p-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Milestone Timeline</div>
          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
            <ol className="space-y-4">
              {STATUS_FLOW.map((s, i) => {
                const reached = i <= currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <li key={s} className="flex items-start gap-3">
                    <div className={`relative z-10 mt-0.5 h-6 w-6 shrink-0 rounded-full flex items-center justify-center ${
                      reached ? "bg-navy text-navy-foreground" : "bg-white border-2 border-border text-muted-foreground"
                    } ${isCurrent ? "ring-4 ring-red/20" : ""}`}>
                      {reached ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className={`text-sm font-semibold ${reached ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {milestones.length > 0 && (
            <>
              <div className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Event Log</div>
              <ol className="space-y-4">
                {milestones.slice().reverse().map((m) => (
                  <li key={m.id} className="flex gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 text-red shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{m.location}</div>
                      <div className="text-sm text-muted-foreground">{m.status_text}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(m.timestamp).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>

        <aside className="border-t md:border-t-0 md:border-l border-border bg-white p-5 md:p-6">
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 text-navy">
              <Mail className="h-4 w-4 text-red" />
              <div className="text-xs font-semibold uppercase tracking-widest">Dedicated Support</div>
            </div>
            {shipment.is_overseas ? (
              <div className="mt-3">
                <div className="text-sm font-semibold">Overseas & Customs Desk</div>
                <p className="mt-1 text-xs text-muted-foreground">For international cargo, customs clearance and duties support.</p>
                <a href="mailto:overseas@dtdc.live" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red hover:underline">
                  overseas@dtdc.live <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <div className="mt-3">
                <div className="text-sm font-semibold">Domestic Freight Desk</div>
                <p className="mt-1 text-xs text-muted-foreground">For domestic shipment support and freight enquiries.</p>
                <a href="mailto:help@dtdc.live" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red hover:underline">
                  help@dtdc.live <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
          <div className="mt-4 rounded-lg bg-slate p-4 text-xs text-muted-foreground">
            Reference this AWB when contacting support: <span className="font-mono font-semibold text-foreground">{shipment.tracking_number}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
