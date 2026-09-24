"use client";
import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Step = {
  number: string;
  title: string;
  image: string;
  category: string;
  link: string;
};

const allSteps: Step[] = [
  // 🟦 WEB DEVELOPMENT (5)
  { number: "01", title: "Supersox", image: "/images/webdev/SuperSoxnew.jpg", category: "Web Development", link: "/work/website-development/supersox" },
  { number: "02", title: "Blancora", image: "/images/webdev/Blancoranew.jpg", category: "Web Development", link: "/work/website-development/blancora" },
  { number: "03", title: "Mr Blox", image: "/images/webdev/MrBloxnew.jpg", category: "Web Development", link: "/work/website-development/mrblox" },
  { number: "04", title: "My Suit Tailor", image: "/images/webdev/MSTnew.jpg", category: "Web Development", link: "/work/website-development/mysuittailor" },
  { number: "05", title: "JK Diamonds Institute", image: "/images/webdev/Jk-Diamonds2.jpg", category: "Web Development", link: "/work/website-development/jkdiamondsinstitute" },
  { number: "06", title: "The Feline Foundation", image: "/images/webdev/FelineFoundation2.jpg", category: "Web Development", link: "/work/website-development/thefelinefoundation" },
  { number: "07", title: "SCS Sports", image: "/images/webdev/SCS2.jpg", category: "Web Development", link: "/work/website-development/scssports" },

  // 🟩 PERFORMANCE MARKETING (4)
  { number: "01", title: "JK Diamonds Institute", image: "/images/pm/Jk-diamondsnew.jpg", category: "Performance Marketing", link: "/work/performance-marketing/jkdiamondsinstitute" },
  { number: "02", title: "Dancing Leaf", image: "/images/pm/Dancingleafnew2.jpg", category: "Performance Marketing", link: "/work/performance-marketing/dancingleaf" },
  { number: "03", title: "Chatterbox Labels", image: "/images/pm/Chatterboxnew2.jpg", category: "Performance Marketing", link: "/work/performance-marketing/chatterboxlabels" },
  { number: "04", title: "SCS Sports", image: "/images/pm/SCSnew.jpg", category: "Performance Marketing", link: "/work/performance-marketing/scssports" },

  // 🟥 SOCIAL MEDIA (3)
  { number: "01", title: "Supersox", image: "/images/sm/SS.jpg", category: "Social Media", link: "/work/social-media-marketing/supersox" },
  { number: "02", title: "Manba Finance", image: "/images/sm/Manba.jpg", category: "Social Media", link: "/work/social-media-marketing/manbafinance" },
  { number: "03", title: "Parvez Damania", image: "/images/sm/Damania.jpg", category: "Social Media", link: "/work/social-media-marketing/damania" },
  { number: "04", title: "SCS Sports", image: "/images/sm/SCS.jpg", category: "Social Media", link: "/work/social-media-marketing/scssports" },
  { number: "05", title: "Ric Rac", image: "/images/sm/Ricrac2.jpg", category: "Social Media", link: "/work/social-media-marketing/ricrackids" },

  // 🟨 SEO (3)
  { number: "01", title: "Manba Finance", image: "/images/seo-cs/manbaaa.png", category: "SEO", link: "/work/seo-services/manbafinance" },
  // { number: "02", title: "Presolv 360", image: "/images/seo-cs/Prosolv.png", category: "SEO", link: "/work/seo-services/presolv360" },
  { number: "03", title: "SCS Sports", image: "/images/seo-cs/SCS1.png", category: "SEO", link: "/work/seo-services/scssports" },


  // 🟨 Branding (3)
  { number: "01", title: "Padel Park", image: "/images/Branding/Padel-Park2.jpg", category: "Branding", link: "/work/design-branding/padelpark" },
  { number: "02", title: "Bombay Artisan Co", image: "/images/Branding/BomBay-Artisan-Co2.jpg", category: "Branding", link: "/work/design-branding/bombayartisanco" },
  { number: "03", title: "Manba Finance", image: "/images/Branding/Manba-Bus2.jpg", category: "Branding", link: "/work/design-branding/manbafinance" },
  { number: "03", title: "Making India Play", image: "/images/Branding/Making-India-Play2.jpg", category: "Branding", link: "/work/design-branding/makingindiaplay" },

];

const categories = ["Web Development", "Performance Marketing", "Social Media", "SEO" ,"Branding"];

const SecondSection = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

const leftHeading = pathname.startsWith("/work")
  ? "Case Studies"
  : "Our Work";

const centerHeading = pathname.startsWith("/work")
  ? "Case Studies"
  : "Our Work";

  const processSteps =
    activeCategory === "All"
      ? allSteps
      : allSteps.filter((step) => step.category === activeCategory);

  const visibleSteps = showAll ? processSteps : processSteps.slice(0, 5);

  const pairs: Step[][] = [];
  for (let i = 0; i < visibleSteps.length; i += 2) {
    pairs.push(visibleSteps.slice(i, i + 2));
  }

  // ✅ Smooth scroll logic (both directions)
  const handleCategoryClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(cat);
    setShowAll(false);

    const container = scrollRef.current;
    const button = e.currentTarget;

    if (container) {
      const buttonLeft = button.offsetLeft;
      const buttonRight = buttonLeft + button.offsetWidth;
      const visibleLeft = container.scrollLeft;
      const visibleRight = visibleLeft + container.clientWidth;

      // Scroll right if button near right edge
      if (buttonRight > visibleRight - 50) {
        container.scrollTo({
          left: buttonRight - container.clientWidth + 50,
          behavior: "smooth",
        });
      }
      // Scroll left if button near left edge
      else if (buttonLeft < visibleLeft + 50) {
        container.scrollTo({
          left: buttonLeft - 50,
          behavior: "smooth",
        });
      }
    }
  };




  
  return (
    <section id="second-section" className="container py-10 sm:py-15 lg:py-20">
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
      {/* Category Scroll Buttons */}
      <div
        ref={scrollRef}
        className="flex flex-nowrap gap-2 lg:gap-3 overflow-x-auto no-scrollbar mb-5 lg:mb-10 scroll-smooth"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={(e) => handleCategoryClick(cat, e)}
            className={`cursor-pointer shrink-0 px-4 py-1 mb-5 lg:mb-0 rounded-full border body3 transition-all duration-300
              ${
                activeCategory === cat
                  ? "bg-[var(--color-primary)] text-[var(--color-secondary)] border-[var(--color-primary)]"
                  : "bg-[var(--color-secondary)] text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
     <div className="space-y-6">
  {pairs.map((pair, rowIdx) => (
    <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
              <CardText number={step.number} title={step.title} />
            </div>
          </Link>
        );
      })}
    </div>
  ))}
</div>


      {/* Show More / Less */}
      {processSteps.length > 5 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 border border-[var(--color-primary)] cursor-pointer text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      )}
    </section>
  );
};

const CardText: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
    <span className="text-highlight casenumbering">{number}</span>
    <h3 className="white-text leading-tight">{title}</h3>
  </div>
);

export default SecondSection;
