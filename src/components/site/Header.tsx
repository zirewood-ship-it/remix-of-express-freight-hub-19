import { Link } from "@tanstack/react-router";
import { Menu, X, Package } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services & Freight" },
  { to: "/rates", label: "Rates & Transit Time" },
  { to: "/portal", label: "Merchant Portal" },
  { to: "/contact", label: "Contact Support" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy text-navy-foreground">
            <Package className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight text-navy">
              DTDC <span className="text-red">XPRESS+</span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              B2B Enterprise
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 rounded-md hover:text-navy hover:bg-secondary transition"
              activeProps={{ className: "text-navy bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/portal"
            className="inline-flex items-center rounded-md bg-red px-4 py-2 text-sm font-semibold text-red-foreground shadow-sm hover:brightness-110 transition"
          >
            Merchant Login / Onboarding
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-x py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/portal"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-red px-4 py-2.5 text-sm font-semibold text-red-foreground"
            >
              Merchant Login / Onboarding
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
