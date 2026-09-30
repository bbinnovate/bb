"use client";
import { useEffect, useState } from "react";
import { Menu, X, Banknote } from "lucide-react";
import { cn } from "@/app/components/ADS/src/lib/utils";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "FAQs", href: "#faq" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [revenue, setRevenue] = useState(1000); // Start count from 1000
  const [isFlashing, setIsFlashing] = useState(false);
  const [addedBadge, setAddedBadge] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen ONLY to live Shopify order received events to bump navbar money!
  useEffect(() => {
    const handleShopifyOrder = (e: Event) => {
      const customEvent = e as CustomEvent<{ amount: number; amountText: string }>;
      const amount = customEvent.detail?.amount || 25000;
      const amountText = customEvent.detail?.amountText || `₹${amount.toLocaleString("en-IN")}`;

      // 1. Bump revenue strictly when notification arrives
      setRevenue((prev) => prev + amount);

      // 2. Trigger glow & floating badge animation
      setIsFlashing(true);
      setAddedBadge(amountText);

      setTimeout(() => {
        setIsFlashing(false);
      }, 1200);

      setTimeout(() => {
        setAddedBadge(null);
      }, 3500);
    };

    window.addEventListener("shopify-order-received", handleShopifyOrder);
    return () => window.removeEventListener("shopify-order-received", handleShopifyOrder);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/85 border-b backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-3 md:h-20">
         <Link href="/paid-marketing">
                <Image
                  src="/images/bblogo.webp"
                  alt="Bombay Blokes Logo"
                  width={210}
                  height={80}
                  className="object-cover transition-opacity duration-300"
                />
              </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-black hover:text-foreground relative subtitle font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Brand Color Navbar Money Badge with Money Icon */}
          <div
            className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-secondary text-secondary-foreground font-bold text-xs sm:text-sm shadow-md border border-black/10 transition-all duration-300 ${
              isFlashing
                ? "scale-110 ring-4 ring-black/20 shadow-xl"
                : ""
            }`}
          >
            <Banknote className="w-4 h-4 text-black shrink-0" strokeWidth={2.5} />
            <span className="text-black/80 font-bold hidden xs:inline text-[11px] uppercase tracking-wider">
              Revenue:
            </span>
            <span className="font-extrabold text-black tracking-tight font-mono text-xs sm:text-sm">
              ₹{revenue.toLocaleString("en-IN")}
            </span>

            {/* Floating Order Revenue Animation Pill */}
            {addedBadge && (
              <span className="absolute -bottom-8 right-0 text-[11px] font-black text-white bg-black border border-white/20 px-2.5 py-0.5 rounded-full shadow-2xl animate-bounce">
                +{addedBadge}
              </span>
            )}
          </div>

          <a
            href="#audit"
            className="bg-ink text-background hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:shadow-lift sm:inline-flex hover:-translate-y-0.5"
          >
            Get Free Audit
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-black lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="bg-background border-b lg:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-lg px-3 py-3 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setOpen(false)}
              className="bg-ink text-background mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Get Free Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
