"use client";

import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { StatsContent } from "./departmentConfig";
import { motion} from "framer-motion";
import Button from "../components/Button";
import ContactButton from "../components/ContactButton";
import { usePathname } from "next/navigation";

const pageContent = {
  "/website-development-services": {
    subtitle:
      "No templates, no shortcuts. Just clean code, thoughtful design, and websites built to perform.",
  },

  "/performance-marketing-services": {
    subtitle:
      "No vanity metrics. Just campaigns engineered to grow revenue.",
  },

  "/social-media-marketing": {
    subtitle:
      "No guesswork, no generic posting calendar. Just strategy that builds real audiences.",
  },

  "/seo": {
    subtitle:
      "No guesswork, no shortcuts. Just strategies that drive real rankings.",
  },
};

const AdsStatsSection = ({ content }: { content: StatsContent }) => {



const pathname = usePathname();



const pageData =
  pageContent[pathname as keyof typeof pageContent] ??
  pageContent["/website-development-services"];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });
  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      {/* Top row: headline left, achievement stats right */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12">

        {/* Left: badge + headline */}
        <div className="lg:flex-1">
          
<div className="w-full text-center mb-2">
 <h6 className="inline-block text-center  text-black">
  We operate on{" "}
  <span className="text-highlight">
    results
  </span>
 </h6>

  <p className="lg:mt-4 mt-1 max-w-4xl mx-auto text-center text-black subtitle">
  {pageData.subtitle}
</p>
</div>

        
          
        </div>

      
      </div>

      {/* Problem stat cards */}
      <div
  className={`grid gap-[18px] lg:mt-10 mt-5 ${
    content.statCards.length === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 lg:grid-cols-5"
  }`}
>
  {content.statCards.map((card, index) => {
    const parts = card.boldWord
      ? card.description.split(new RegExp(`(${card.boldWord})`, "i"))
      : [card.description];

    const isLastOdd =
      content.statCards.length % 2 !== 0 &&
      index === content.statCards.length - 1;

    return (
      <motion.div
        key={card.value}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`
          bg-white
          border border-[#A1A1A1]
          
          rounded-[20px]
          lg:p-6 p-4

          flex
          flex-col
         
          ${
            isLastOdd
              ? "col-span-2 lg:col-span-1"
              : ""
          }
        `}
      >
        <div className="font-['Poppins'] text-[40px] font-[500] text-highlight">
          <CountUp
  start={0}
  end={parseInt(card.value.replace(/[^0-9,]/g, ""))}
  duration={2}
/>
          {card.value.replace(/[0-9,]/g, "")}
        </div>

        <p className=" subtitle text-[#46463f]">
          {parts.map((part, i) =>
            card.boldWord &&
            part.toLowerCase() === card.boldWord.toLowerCase() ? (
              <b key={i} className="text-[#0A0A0A] font-bold">
                {part}
              </b>
            ) : (
              part
            )
          )}
        </p>
      </motion.div>
    );
  })}
</div>

      {/* CTA banner */}
      {/* <div className="mt-[18px] bg-[var(--color-primary)] rounded-[20px] p-6 sm:p-8 lg:p-9 flex flex-wrap gap-6 items-center justify-between">
        <p className="font-['Poppins'] font-semibold text-[18px] sm:text-[22px] lg:text-[22px] leading-[1.35] text-white max-w-[720px]">
          {content.ctaBanner.text}
        </p>
        <div>
          
    <ContactButton
  href="#contact-form"
  text={content.ctaBanner.buttonText}
  className="white-text cursor-pointer"
/>
    </div>
       
      </div> */}
    </section>
  );
};

export default AdsStatsSection;
