"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Branding ",
    subtitle : " Give your brand a personality",
    desc: "A brand is more than a name or a logo. It's the feeling people associate with you. We develop distinctive brand identities with strategies, design and a clear brand vision.",
    img: "/images/Branding.webp",
  },
  {
    id: 2,
    title: "UI/UX ",
    subtitle : " Designed around people",
    desc: "Every click, scroll and interaction has a part to play. We design interfaces that bring together aesthetics, functionality and ease of use to create meaningful digital experiences that reflect your brand. ",
    img: "/images/UI-UX1.png",
  },
  {
    id: 3,
    title: "Web Development ",
    subtitle : " Designed around people",
    desc: "Think of your website as your brand's home on the internet. We build digital spaces that capture your brand's personality and give people a reason to explore. we focus on speed, responsiveness, scalability and smooth user experiences.",
    img: "/images/Website2.webp",
  },
  {
    id: 4,
    title: "Digital Marketing ",
    subtitle : " Make some noise",
    desc: "The internet is crowded and your brand doesn't have to get lost in it. We find the stories, ideas and strategies that give people a reason to stop, shop, and remember your brand.",
    img: "/images/SocialMedia.webp",
  },
  {
  id: 5,
  title: "SEO",
  subtitle: "Climb the search ladder",
  desc: "Visibility is where discovery begins. We help your brand rise through search rankings with a strategic approach to SEO, combining keyword research, on-page optimization, technical improvements and quality content. ",
  img: "/images/seo-cs/manbaaa.png",
},
{
  id: 6,
  title: "GEO",
  subtitle: "More than a search result",
  desc: "Search is changing, and your brand needs to be part of the conversation. We make your business AI-ready with strategies designed for generative search experiences and AI-powered discovery. ",
  img: "/images/geo-cs/geo-1.jpg",
},
];

export default function SecondSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="second-section" className="relative w-full py-10 sm:py-15 lg:py-20">
      <div className=" w-full container">
        <div className="mb-12 flex justify-center sm:mb-16 lg:mb-20">
          <h1 className="black-text text-center"  >
            <span className="text-highlight">Born in Bombay,</span> crafting digital experiences that connect and inspire.
          </h1>
        </div>

        <div className="border-t border-black/20">
          {services.map((service) => {
            const isActive = active === service.id;

            return (
              <div
                key={service.id}
                className={`group relative border-b border-black/20 transition-colors duration-300 ${isActive ? "bg-black/[0.025]" : "bg-transparent"}`}
                onMouseEnter={() => setActive(service.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(service.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActive(null);
                  }
                }}
                tabIndex={0}
                aria-label={`${service.title}: ${service.desc}`}
              >
                <div className="grid min-h-[170px] grid-cols-[40px_1fr] items-center gap-4 px-2 py-7 sm:min-h-[190px] sm:grid-cols-[52px_1fr] sm:gap-7 sm:px-5 lg:grid-cols-[100px_1fr_300px] lg:gap-10 lg:px-8">
                  <span className="numbering text-highlight self-start pt-1 text-left text-[24px] sm:text-[28px] lg:text-[120px]">
                    {service.id.toString().padStart(2, "0")}
                  </span>

                  <div className="max-w-3xl">
                    <h2 className="black-text mb-1 text-left transition-transform duration-300  ">
                      {service.title}
                    </h2>

                     <h5 className="black-text mb-3 text-left transition-transform duration-300  ">
                      {service.subtitle}
                    </h5>

                    <p className="body2 black-text hidden max-w-2xl text-left opacity-75 lg:block">{service.desc}</p>
                  </div>

                  <div className="absolute right-8 top-1/2 z-10 hidden h-[220px] w-[260px] -translate-y-1/2 overflow-hidden rounded-2xl lg:block">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 16, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -12, scale: 0.97 }}
                          transition={{ duration: 0.24, ease: "easeOut" }}
                          className="h-full w-full"
                        >
                          <Image
                            src={service.img}
                            alt={service.title}
                            width={600}
                            height={400}
                            sizes="260px"
                            className="aspect-square h-full w-full rounded-2xl object-cover shadow-lg"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="col-span-2 mt-2 w-full overflow-hidden rounded-xl lg:hidden">
                    <Image
                      src={service.img}
                      alt={service.title}
                      width={600}
                      height={400}
                      sizes="(max-width: 640px) 90vw, 60vw"
                      className="aspect-square w-full rounded-xl object-cover shadow-md"
                    />
                  </div>

                  <p className="body2 black-text col-span-2 text-left opacity-75 lg:hidden">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
