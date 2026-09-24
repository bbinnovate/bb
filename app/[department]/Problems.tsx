'use client';
import { usePathname } from "next/navigation";
import { Outfit, Poppins } from 'next/font/google';

const pageContent = {
  "/website-development-services": {
    heading: (
      <>
        Why Most{" "}
        <span className="text-highlight">
          Websites Fail
        </span>
      </>
    ),

    subtitle:
      "A beautiful website means nothing if it doesn't generate leads, build trust, or convert visitors into customers.",

    leftTitle: "Common Website Problems",

    rightTitle: "How We Solve Them",

    problems: [
      "Outdated design that hurts credibility",
      "Slow loading speeds increasing bounce rates",
      "Poor mobile responsiveness across devices",
      "Confusing navigation reducing conversions",
      "Weak calls-to-action that fail to generate leads",
    ],

    solutions: [
      "Modern UI/UX designed for conversions",
      "Lightning-fast performance optimization",
      "Mobile-first responsive development",
      "Clear user journeys with intuitive navigation",
      "Strategic CTAs that turn visitors into customers",
    ],
  },

  "/performance-marketing-services": {
    heading: (
      <>
        What Happens When Ads Are{" "}
        <span className="text-highlight">
          Managed Incorrectly?
        </span>
      </>
    ),

    subtitle:
      "Most businesses waste a significant portion of their ad budget because campaigns aren't optimized for performance.",

    leftTitle: "The Amateur Approach",

    rightTitle: "Here's How We Fix It",

    problems: [
      "Poor audience targeting wasting ad spend",
      "High CPC due to weak ad copy",
      "Low landing page conversion rates",
      "No accurate tracking or attribution",
      "Creative fatigue reducing performance",
    ],

    solutions: [
      "Laser focused audience targeting",
      "High-converting ad copy",
      "Landing pages optimized for conversions",
      "Transparent ROAS & CPA reporting",
      "Continuous creative testing and optimization",
    ],
  },

  "/social-media-management": {
    heading: (
      <>
        Why Brands{" "}
        <span className="text-highlight">
          Stop Growing
        </span>
      </>
    ),

    subtitle:
      "Posting consistently isn't enough. Without strategy, content rarely delivers meaningful business growth.",

    leftTitle: "Common Social Media Mistakes",

    rightTitle: "How We Grow Your Brand",

    problems: [
      "Low engagement despite regular posting",
      "No consistent brand identity",
      "Content that doesn't connect with audiences",
      "Weak community engagement",
      "No measurable business results",
    ],

    solutions: [
      "Content strategies built around your audience",
      "Strong, consistent brand positioning",
      "Creative content that drives engagement",
      "Active community management",
      "Performance tracking with clear growth metrics",
    ],
  },

  "/seo": {
    heading: (
      <>
        Why Websites{" "}
        <span className="text-highlight">
          Never Rank
        </span>
      </>
    ),

    subtitle:
      "Without a solid SEO strategy, even the best websites remain invisible on Google.",

    leftTitle: "SEO Mistakes",

    rightTitle: "Our SEO Strategy",

    problems: [
  "Poor keyword targeting",
  "Technical SEO issues",
  "Thin or duplicate content",
  "Slow website performance",
  "Weak backlink profile",
  "No visibility in AI search and answer engines (GEO/AEO gaps)",
],

solutions: [
  "Comprehensive keyword research",
  "Technical SEO optimization",
  "High-quality content strategy",
  "Core Web Vitals optimization",
  "Authority-building link strategy",
  "GEO & AEO optimization — structured content built for AI answer engines",
],
  },
};

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });


import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const problems = [
  "Poor audience targeting wasting 60% of budget",
  "High CPCs due to irrelevant ad copy",
  "Low conversion rates on landing pages",
  "Zero accurate attribution or reporting",
  "Stale creatives blinding your audience"
];

const solutions = [
  "Laser focused audience segmentation & retargeting",
  "A/B tested ad copy driving high CTRs",
  "CRO optimized landing pages built to convert",
  "100% transparent ROAS & CPA dashboarding",
  "Rapid creative testing to combat ad fatigue"
];

export default function Problems() {

  const pathname = usePathname();

const content =
  pageContent[pathname as keyof typeof pageContent] ??
  pageContent["/website-development-services"];
  return (
    <section className="container py-10 sm:py-15 lg:py-20 relative overflow-hidden">
      <div className=" relative z-10">
        
        <div className="text-center ">
          <motion.h6 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
             className=" inline-block text-center font-outfit  text-black"

          >
             {content.heading}
          </motion.h6>
          <p className="lg:mt-4 mt-1 max-w-2xl mx-auto text-black subtitle">{content.subtitle}   </p>




        </div>

        <div className="flex flex-col lg:flex-row lg:gap-12 gap-8 items-center justify-center lg:mt-10 mt-5" >
          
          {/* BAD SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-secondary border border-[#A1A1A1] rounded-[20px] lg:p-8 p-4 md:p-12 w-full lg:w-1/2 relative overflow-hidden group hover:border-highlight/50 transition-colors "
          >
            <span className="block font-outfit font-[500] text-[18px] lg:text-[25px] leading-[1.2] text-black mb-8 border-b border-[#A1A1A1] pb-4">{content.leftTitle}</span>
            <ul className="space-y-6">
              {content.problems.map((prob, i) => (
  <motion.li
    key={i}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: i * 0.1 }}
    viewport={{ once: true }}
    className="flex items-center gap-4 text-black font-medium subtitle"
  >
    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
    {prob}
  </motion.li>
))}
            </ul>
          </motion.div>

          {/* ARROW */}
          <div className="hidden lg:flex items-center justify-center -mx-4 z-10 bg-white p-4 rounded-[30px] border border-primary/10 ">
            <ArrowRight className="w-8 h-8 text-primary" />
          </div>

          {/* GOOD SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-secondary border border-[#A1A1A1] rounded-[20px] lg:p-8 p-4 md:p-12 w-full lg:w-1/2 relative overflow-hidden group hover:border-highlight/50 transition-colors "
           >
            <div className="absolute top-0 right-0 w-64 h-64 bg-highlight/5 rounded-[20px] blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            
            <span className="block font-outfit font-[500] text-[18px] lg:text-[25px] leading-[1.2] text-primary mb-8 border-b border-[#A1A1A1] pb-4 relative z-10">{content.rightTitle}</span>
            <ul className="space-y-6 relative z-10">
              {content.solutions.map((sol, i) => (
  <motion.li
    key={i}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.3 + i * 0.1 }}
    viewport={{ once: true }}
    className="flex items-center gap-4 text-primary font-[500] subtitle"
  >
    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
    {sol}
  </motion.li>
))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
