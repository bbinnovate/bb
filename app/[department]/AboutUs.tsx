'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Award } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const iconMap = {
  award: Award,
  trending: TrendingUp,
  users: Users,
  target: Target,
};

const pageContent = {
  "/website-development-services": {
    eyebrow: "WHY BOMBAY BLOKES",

    title: (
      <>
        We Engineer{" "}
        <span className="text-[var(--color-highlight)]">
          Websites That Perform
        </span>{" "}
         Not Just Websites That Exist
      </>
    ),

    body: [
      "Most agencies treat web development as a side service to their marketing work. We don't. Every website goes through structured planning, clean architecture, rigorous QA, and a dedicated project manager   so what you get isn't just a deliverable, it's a foundation built to scale with your business.",
    ],

    cta: "Get Free Audit",

    stats: [
      {
        icon: iconMap.award,
        value: "10+",
        label: "Years of Experience",
      },
      {
        icon: iconMap.trending,
        value: "24-Hr",
        label: "Response Time",
      },
      {
        icon: iconMap.users,
        value: "0",
        label: "Hidden Costs or Surprise Fees",
      },
      {
        icon: iconMap.target,
        value: "10 Days",
        label: "Post-Launch Support",
      },
    ],
  },

  "/performance-marketing-services": {
    eyebrow: "WHY BOMBAY BLOKES",

    title: (
      <>
        We Engineer{" "}
        <span className="text-[var(--color-highlight)]">
          Revenue
        </span>
        , Not Just Reach
      </>
    ),

    body: [
      "At Bombay Blokes, we deliver data driven performance marketing that turns ad spend into measurable business growth. From Meta Ads, Google Ads, and lead generation to conversion rate optimization (CRO), audience targeting, and ROAS focused campaigns, we continuously optimize every touchpoint to maximize ROI, increase conversions, and scale your business with complete transparency. ",
    ],

    cta: "Get Free Audit",

    stats: [
      {
        icon: iconMap.award,
        value: "1000+",
        label: "Projects Delivered",
      },
      {
        icon: iconMap.trending,
        value: "₹20Cr+",
        label: "Managed Ad Spend",
      },
      {
        icon: iconMap.users,
        value: "150+",
        label: "Happy Clients",
      },
      {
        icon: iconMap.target,
        value: "4X",
        label: "Average ROAS",
      },
    ],
  },

  "/social-media-management": {
    eyebrow: "WHY BOMBAY BLOKES",

    title: (
      <>
        We Build{" "}
        <span className="text-[var(--color-highlight)]">
          Brands
        </span>
        , Not Just Content Calendars
      </>
    ),

    body: [
      "Most agencies post content and call it a strategy. We don't. Every social media plan is built around audience research, platform-specific content, and active community management   backed by real ad-spend experience, not just creative templates.",
    ],

    cta: "Get Free Audit",

    stats: [
      {
        icon: iconMap.trending,
        value: "₹20Cr+",
        label: "Managed Ad Spend",
      },
      {
        icon: iconMap.target,
        value: "4X",
        label: "Average ROAS",
      },
      {
        icon: iconMap.users,
        value: "150+",
        label: "Happy Clients",
      },
      {
        icon: iconMap.award,
        value: "10+",
        label: "Years of Experience",
      },
    ],
  },

  "/seo": {
    eyebrow: "WHY BOMBAY BLOKES",

    title: (
      <>
       We Engineer Visibility{" "}
        <span className="text-[var(--color-highlight)]">
         On Google, and On AI
        </span>
        
      </>
    ),

    body: [
      "SEO isn't just about ranking on Google anymore. Every strategy we build includes technical audits, content built for search intent, and authority-building backlinks   plus structured data and content architecture designed for GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization), so your brand gets surfaced by AI tools like ChatGPT, Perplexity, and Google AI Overviews, not just buried on page two.",
    ],

    cta: "Get Free Audit",

    stats: [
      {
        icon: iconMap.award,
        value: "10+",
        label: "Years of Experience",
      },
      {
        icon: iconMap.trending,
        value: "24-Hr",
        label: "Response Time",
      },
      {
        icon: iconMap.users,
        value: "0",
        label: "Hidden Costs or Surprise Fees",
      },
      {
        icon: iconMap.target,
        value: "100%",
        label: "White Hat SEO Practices",
      },
    ],
  },
};

export default function AboutUs() {
  const pathname = usePathname();

const content =
  pageContent[pathname as keyof typeof pageContent] ??
  pageContent["/website-development-services"];
  return (
    <section className=" py-10 sm:py-15 lg:py-20 bg-black text-secondary relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-highlight)]/5 rounded-[20px] blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-[20px] blur-[100px] pxranslate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className=" container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-10 items-center">
        
        {/* Left text */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-[var(--color-highlight)] mb-6 font-medium uppercase tracking-widest text-sm">
  <span className="w-3 h-3 rounded-full bg-[var(--color-highlight)] inline-block"></span>
  {content.eyebrow}
</div>
         
           <h6 className="inline-block font-outfit text-white mb-3">
  {content.title}
</h6>

            <div className="space-y-3 subtitle text-[#CACACA]">
  {content.body.map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ))}
</div>

             <div className="w-full mt-3">
<button
  onClick={() => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="py-[8px] px-[23px] rounded-[5px] cursor-pointer bg-[#F9B31B] border shadow-[2px_2px_0px_0px_#FFFFFF] text-black"
>
  {content.cta}
</button>
</div>
          </motion.div>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
  {content.stats.map((stat, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="
        bg-secondary/5 border
        border-[var(--color-highlight)]/40
        backdrop-blur-md
        rounded-[20px]

        p-4 lg:p-8

        hover:bg-secondary/10
        hover:border-secondary/20

        transition-all
        duration-300
        group
      "
    >
      <div
        className="
          w-10 h-10
          lg:w-14 lg:h-14

         rounded-[20px]

          bg-[var(--color-highlight)]/10

          flex items-center justify-center

          mb-3 lg:mb-6

          group-hover:scale-110
          group-hover:bg-[var(--color-highlight)]

          transition-all
          duration-300
        "
      >
        <stat.icon
  className="
    w-5 h-5
    lg:w-7 lg:h-7
    text-[var(--color-highlight)]
    group-hover:text-black
    transition-colors
  "
/>
      </div>

      <div>
        <a
          className="
            block

            text-2xl
            lg:text-5xl
font-[500]
            
            text-white

            mb-1 lg:mb-2
          "
        >
          {stat.value}
        </a>

        <p
          className="
            text-[10px]
            lg:text-sm

            text-[#CACACA]

            font-[500]
           
            tracking-wider
          "
        >
          {stat.label}
        </p>
      </div>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
}
