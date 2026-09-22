 import { BarChart3, IndianRupee, Users, Zap } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";
import teamOffice from "@/app/components/ADS/src/assets/team.jpg";
import Image from "next/image";

const stats = [
  { icon: BarChart3, value: "₹200Cr+", label: "Revenue delivered" },
  { icon: IndianRupee, value: "₹50Cr+", label: "Managed ad spend" },
  { icon: Users, value: "250+", label: "Happy clients" },
  { icon: Zap, value: "4X", label: "Average ROAS" },
];

export function WhyUs() {
  return (
    <section id="results" className=" container  py-6 sm:py-8 lg:py-8">


        <Reveal className="  text-center">

    <span className="eyebrow subtitle">Why Bombay Blokes</span>
         <a className=" heading mt-3 block">
            We engineer revenue, not just reach.
          </a>
          <p className="black-text mt-3 subtitle">
           Performance-driven Meta and Google Ads campaigns focused on ROAS, conversions and real business growth.
          </p>
</Reveal>

      <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

        
        <Reveal >
      

          <div className="mt-9 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="card-soft h-full p-5">
                  <s.icon className="size-5 text-secondary" />
                  <div className="font-display mt-4 text-3xl font-extrabold sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="black-text mt-1 subtitle">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <a
            href="#audit"
            className="bg-ink text-background mt-8 inline-flex rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            Get free audit
          </a>
        </Reveal>

        <Reveal delay={120} className="relative">
         <Image
  src={teamOffice}
  alt="Bombay Blokes performance marketing team reviewing campaign dashboards in Mumbai"
  width={1200}
  height={900}
  className="border-border w-full rounded-3xl border object-cover shadow-lift"
/>
        
        </Reveal>
      </div>
    </section>
  );
}
