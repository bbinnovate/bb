"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Branding - thecha to your vada pav",
    desc: "Branding adds flavor and personality to your brand, giving it a strong identity that everything else builds on.",
    img: "/images/Branding.webp",
  },
  {
    id: 2,
    title: "UI/UX - The First Bite",
    desc: "The first bite defines the entire experience. UI/UX design ensures the user's first interaction with your digital presence is enjoyable, intuitive, and memorable.",
    img: "/images/UI-UX1.png",
  },
  {
    id: 3,
    title: "Web development - the aftertaste",
    desc: "The aftertaste is what lingers and leaves an impression. Web development ensures your website functions smoothly and leaves a lasting, reliable impression on your audience.",
    img: "/images/Website2.webp",
  },
  {
    id: 4,
    title: "Digital marketing - spreading the aroma",
    desc: "Just like the aroma of a Vada Pav spreads and attracts people, digital marketing spreads your message to the audience, making your brand visible and enticing.",
    img: "/images/SocialMedia.webp",
  },
];

export default function SecondSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="second-section" className="relative w-full px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 flex justify-center sm:mb-16 lg:mb-20">
          <h1 className="black-text max-w-4xl text-center" style={{ textTransform: "none" }}>
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
                <div className="grid min-h-[170px] grid-cols-[52px_1fr] items-center gap-4 px-2 py-7 sm:min-h-[190px] sm:grid-cols-[80px_1fr] sm:gap-7 sm:px-5 lg:grid-cols-[100px_1fr_300px] lg:gap-10 lg:px-8">
                  <span className="numbering text-highlight self-start pt-1 text-left">
                    {service.id.toString().padStart(2, "0")}
                  </span>

                  <div className="max-w-3xl">
                    <h2 className="black-text mb-3 text-left transition-transform duration-300 group-hover:translate-x-1 group-focus:translate-x-1">
                      {service.title}
                    </h2>
                    <p className="body2 black-text max-w-2xl text-left opacity-75">{service.desc}</p>
                  </div>

                  <div className="hidden h-[180px] overflow-hidden rounded-2xl lg:block">
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
                            sizes="300px"
                            className="h-full w-full rounded-2xl object-cover shadow-lg"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="col-start-2 mt-5 overflow-hidden rounded-xl lg:hidden">
                    <Image
                      src={service.img}
                      alt={service.title}
                      width={600}
                      height={400}
                      sizes="(max-width: 640px) 90vw, 60vw"
                      className="h-auto max-h-64 w-full rounded-xl object-cover shadow-md"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
