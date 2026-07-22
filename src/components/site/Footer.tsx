import { Link } from "@tanstack/react-router";
import { Package, Mail, Globe, Truck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red">
              <Package className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-lg font-bold">DTDC XPRESS+</div>
              <div className="text-[10px] font-semibold uppercase tracking-widest opacity-70">
                B2B Enterprise Logistics
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-md">
            Accelerated global logistics for enterprise and B2B merchants. Air, ocean, road
            and cross-border freight backed by a dedicated merchant success desk.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            <div className="flex items-start gap-3">
              <Truck className="h-4 w-4 mt-0.5 text-red shrink-0" />
              <div>
                <div className="font-semibold">Domestic Tracking & Freight</div>
                <a href="mailto:help@dtdc.live" className="text-white/80 hover:text-white">help@dtdc.live</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="h-4 w-4 mt-0.5 text-red shrink-0" />
              <div>
                <div className="font-semibold">Overseas & International</div>
                <a href="mailto:overseas@dtdc.live" className="text-white/80 hover:text-white">overseas@dtdc.live</a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Services</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/services" className="hover:text-white">LTL & FTL Freight</Link></li>
            <li><Link to="/services" className="hover:text-white">AirMax Priority</Link></li>
            <li><Link to="/services" className="hover:text-white">Customs Brokerage</Link></li>
            <li><Link to="/services" className="hover:text-white">Warehousing & API</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Company</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/rates" className="hover:text-white">Rates & Transit</Link></li>
            <li><Link to="/portal" className="hover:text-white">Merchant Portal</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Support</Link></li>
            <li><a href="mailto:help@dtdc.live" className="hover:text-white inline-flex items-center gap-1"><Mail className="h-3 w-3" /> Email us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} DTDC XPRESS+. Enterprise B2B logistics.</div>
          <div>Merchant-to-Merchant trade orders only.</div>
        </div>
      </div>
    </footer>
  );
}
