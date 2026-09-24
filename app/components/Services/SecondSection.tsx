"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Step = {
  number: string;
  title: string;
  image: string;
  link: string;
};

const allSteps: Step[] = [

  {
    number: "01",
    title: "Web Development & UI UX",
   image: "/images/webdev/SuperSoxnew.jpg",
    link: "/services/website-development",
  },
  {
    number: "02",
    title: "Design & Branding",
   image: "/images/branding-cs/barnd3.jpg",
    link: "/services/design-branding",
  },
 
  {
    number: "03",
    title: "SEO",
   image: "/images/seo-cs/manbaaa.png",
    link: "/services/seo-services",
  },
  {
    number: "04",
    title: "GEO",
   image: "/images/geo-cs/geo-1.jpg",
    link: "/services/geo-services",
  },
  {
    number: "05",
    title: "Performance Marketing",
    image: "/images/pm/Chatterboxnew2.jpg",
    link: "/services/performance-marketing",
  },
  {
    number: "06",
    title: "Social Media Management",
    image: "/images/sm/Manba.jpg",
    link: "/services/social-media-marketing",
  },
  
];

const SecondSection = () => {
  const pathname = usePathname();

  const leftHeading = pathname.startsWith("/work")
    ? "Case Studies"
    : "Our Work";

  const centerHeading = pathname.startsWith("/work")
    ? "Case Studies"
    : "Our Work";

  const visibleSteps = allSteps;

  const pairs: Step[][] = [];

  for (let i = 0; i < visibleSteps.length; i += 2) {
    pairs.push(visibleSteps.slice(i, i + 2));
  }

  return (
    <section
      id="second-section"
      className="container py-10 sm:py-15 lg:py-20"
    >
      {pathname.startsWith("/work") ? (
        <h2 className="black-text mr-4 lg:mb-5 mb-4">
          Case Studies
        </h2>
      ) : pathname.startsWith("/service") ? (
        <div className="flex items-center justify-center w-full py-5">
          <h2 className="text-center black-text">
            Our Work
          </h2>
        </div>
      ) : null}

      {/* Projects Grid */}
      <div className="space-y-6">
        {pairs.map((pair, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {pair.map((step, i) => {
              const isEvenRow = rowIdx % 2 === 0;
              const isFirstBig = isEvenRow ? i === 0 : i !== 0;
              const colSpan = isFirstBig ? 3 : 2;

              return (
                <Link
                  key={i}
                  href={step.link}
                  className={`col-span-1 md:col-span-${colSpan} relative h-[220px] sm:h-[300px] md:h-[340px] rounded-[15px] overflow-hidden group`}
                >
                  {/* Background image */}
                  <Image
                    width={1000}
                    height={1000}
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover bg-black z-0"
                  />

                  {/* 🔥 Black fade overlay (below text) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />

                  {/* Text above overlay */}
                  <div className="absolute inset-0 z-[2] flex items-end p-4">
                    <CardText
                      number={step.number}
                      title={step.title}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

const CardText: React.FC<{
  number: string;
  title: string;
}> = ({ number, title }) => (
  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
    <span className="text-highlight casenumbering">
      {number}
    </span>

    <h3 className="white-text leading-tight">
      {title}
    </h3>
  </div>
);

export default SecondSection;