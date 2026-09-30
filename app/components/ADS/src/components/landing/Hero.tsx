
"use client"
import { useState } from "react";
import { ArrowRight, Check, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import heroDashboard from "@/app/components/ADS/src/assets/hero-dashboard.jpg";
import { ChevronDown } from "lucide-react";
import { getUtmParams } from "@/lib/utm";


export function Hero() {
  const [sending, setSending] = useState(false);
  const [hasDoneAds, setHasDoneAds] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const hasDoneAdsVal = (hasDoneAds || String(formData.get("hasDoneAds") || "")).trim();
    const last3MonthsSpendVal = String(formData.get("last3MonthsSpend") || "").trim();

    setSending(true);
    try {
      const response = await fetch("/api/ads-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          brand: formData.get("brand"),
          hasDoneAds: hasDoneAdsVal,
          last3MonthsSpend: last3MonthsSpendVal,
          doneAdsBefore: hasDoneAdsVal,
          last_3_months_spend: last3MonthsSpendVal,
          "Have you done ADS before?": hasDoneAdsVal,
          "Last 3 Months Spend": last3MonthsSpendVal,
          budget: formData.get("budget"),
          challenge: formData.get("challenge"),
          goals: formData.get("goals"),
          source: "paid-marketing-hero",
          ...getUtmParams(),
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your request.");

       // Redirect only after successful submission
  window.location.href = "/thank-you";
    } catch (error) {
      toast.error("Could not send your request", {
        description: error instanceof Error ? error.message : "Please try again shortly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="top" className=" relative overflow-hidden  lg:pb-16 md:pb-24 pb-6 md:pt-36 pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-secondary/25 blur-[120px]"
      />
      <div
        aria-hidden
        className=" py-10 sm:py-[60px] lg:py-20 pointer-events-none absolute -bottom-52 -left-40 size-[32rem] rounded-full bg-muted blur-[110px]"
      />

      <div className="container relative grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="animate-rise lg:mt-10 mt-0">
          <div className="border-border bg-surface inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 subtitle font-semibold shadow-soft">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-secondary" />
            </span>
            Mumbai · Google &amp; Meta Ads specialists
          </div>

       <span
  className="mt-6 block text-[1.9rem] font-extrabold sm:text-[2.8rem] lg:text-[3.2rem]"
  style={{
    fontFamily: '"Bricolage Grotesque", sans-serif',
    fontWeight: 800,
    lineHeight: 1.1,
  }}
>
  The performance marketing agency in Mumbai that{" "}
  <span className="highlight-amber">engineers revenue</span>, not just reach.
</span>
          <p className=" subtitle text-black mt-6 max-w-xl">
           ₹20Cr+ ad spend managed, 4X average ROAS
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {[
              "Free account audit in 48 hours",
              "Google Ads and Meta Ads experts",
              "Creative + media under one roof",
              "No lock-in, monthly rolling",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 subtitle font-medium">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-secondary">
                  <Check className="size-3 text-secondary-foreground" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-muted-foreground subtitle">
                <strong className="text-foreground">4.8</strong> from 250+ clients
              </span>
            </div>
            <div className="flex items-center gap-2 subtitle">
              <TrendingUp className="size-4 text-secondary" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">1000+</strong> projects delivered
              </span>
            </div>
          </div>

<div className="lg:flex hidden gap-4 sm:gap-5 mt-10">
  <div
    className="
      flex
      flex-shrink-0
      items-center
      justify-center
      overflow-hidden
      rounded-[20px]
      border
      border-[#e8e8e8]
      bg-white

      w-[120px]
      h-[70px]

      sm:w-[150px]
      sm:h-[80px]

      md:w-[170px]
      md:h-[90px]

      lg:w-[190px]
      lg:h-[100px]
    "
  >
    <img
      src="/images/Google-Ads-Certified.png"
      alt="Google Ads Certified Partner"
      className="h-full w-full object-contain"
    />
  </div>

  <div
    className="
      flex
      flex-shrink-0
      items-center
      justify-center
      overflow-hidden
      rounded-[20px]
      border
      border-[#e8e8e8]
      bg-white

      w-[120px]
      h-[70px]

      sm:w-[150px]
      sm:h-[80px]

      md:w-[170px]
      md:h-[90px]

      lg:w-[190px]
      lg:h-[100px]
    "
  >
    <img
      src="/images/meta-partner.webp"
      alt="Meta Business Partner"
      className="h-full w-full object-contain"
    />
  </div>
</div>

<a
  href="#audit"
  className="lg:hidden group bg-ink text-background mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5"
>
  Get free audit
  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
</a>


        </div>

        {/* Lead form */}
        <div id="audit" className="lg:sticky lg:top-20">
          <form
            onSubmit={onSubmit}
            className="card-soft animate-rise p-6 shadow-lift sm:p-8"
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
               <h6>Get your free ads audit in 48 hrs</h6>
                {/* <p className="text-muted-foreground mt-1.5 subtitle">
                  One page. No sales script. Real numbers.
                </p> */}




                
              </div>
              <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[0.65rem] font-bold tracking-wide text-secondary-foreground uppercase">
                Free
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
  <input
    required
    name="name"
    placeholder="Your name"
    className={`${inputCls} `}
  />
</Field>

<Field label="Phone / WhatsApp">
  <input
    required
    name="phone"
    type="tel"
    placeholder="+91 98XXXXXXXX"
    className={`${inputCls} `}
  />
</Field>
              </div>

              <Field label="Work email">
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@company.com"
 className={`${inputCls} `}                />
              </Field>

              <Field label="Brand name, website or Instagram link">
                <input
                  required
                  name="brand"
                  placeholder="Your brand, website or @instagram"
                  className={`${inputCls} `}
                />
              </Field>

              <div className={`grid gap-4 ${hasDoneAds === "Yes" ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}>
                <Field label="Have you done ADS before?">
                  <div className="relative">
                    <select
                      required
                      name="hasDoneAds"
                      value={hasDoneAds}
                      onChange={(e) => setHasDoneAds(e.target.value)}
                      className={`${inputCls} appearance-none pr-11`}
                    >
                      <option value="" disabled>
                        Select option
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
                      strokeWidth={2}
                    />
                  </div>
                </Field>

                {hasDoneAds === "Yes" && (
                  <Field label="What's your last 3 months spend?">
                    <input
                      required
                      name="last3MonthsSpend"
                      placeholder="e.g. ₹50,000 / ₹2 Lakhs"
                      className={`${inputCls} `}
                    />
                  </Field>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
  <Field label="Monthly ad budget">
    <div className="relative">
      <select
        required
        name="budget"
        defaultValue=""
        className={`${inputCls} appearance-none pr-11`}
      >
        <option value="" disabled>
          Select budget
        </option>
        <option>Above ₹1 lakh</option>
        <option>₹1 lakh – ₹3 lakh</option>
        <option>₹3 lakh – ₹5 lakh</option>
        <option>₹5 lakh – ₹15 lakh</option>
        <option>₹15 lakh+</option>
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
        strokeWidth={2}
      />
    </div>
  </Field>

  <Field label="Biggest marketing challenge">
    <div className="relative">
      <select
        required
        name="challenge"
        defaultValue=""
        className={`${inputCls} appearance-none pr-11`}
      >
        <option value="" disabled>
          Select challenge
        </option>
        <option>Not getting enough leads</option>
        <option>High cost per lead</option>
        <option>Low ROAS</option>
        <option>Scaling campaigns</option>
        <option>Not sure where to start</option>
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
        strokeWidth={2}
      />
    </div>
  </Field>
</div>

              <Field label="Anything about your growth goals (optional)">
                <textarea
                  name="goals"
                  rows={3}
                  placeholder="Tell us about your business and targets…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

            </div>

            <button
              type="submit"
              disabled={sending}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-4 text-sm font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:shadow-amber disabled:opacity-70"
            >
              {sending ? "Sending…" : "Get my free audit"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-muted-foreground mt-4 text-center subtitle">
              We reply within 48 working hours. Your details stay private.
            </p>
          </form>
        </div>

       
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-all !placeholder:text-[14px] placeholder:font-normal placeholder:font-[inherit] placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-muted-foreground mb-1.5 block subtitle">{label}</span>
      {children}
    </label>
  );
}
