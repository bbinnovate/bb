"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../Button";
import Image from "next/image";
const images = [
  "/images/bomai1.webp",
  "/images/bomai2.webp",
  "/images/bomai3.webp",
  "/images/bomai4.webp",
  "/images/bomai5.webp",
  "/images/bomai6.webp",
];
const videos = [
  { src: "/video/previews/preview-1.mp4", title: "Campaign Reel 01" },
  { src: "/video/previews/preview-2.mp4", title: "Campaign Reel 02" },
  { src: "/video/previews/preview-3.mp4", title: "Campaign Reel 03" },
  { src: "/video/previews/preview-4.mp4", title: "Campaign Reel 04" },
  { src: "/video/previews/preview-6.mp4", title: "Campaign Reel 05" },
  { src: "/video/previews/preview-7.mp4", title: "Campaign Reel 06" },
];
const tools = [
  {
    id: "expenses",
    name: "Expense Tracker",
    image: "/images/expenses.png",
    href: "https://expenses.bombayblokes.com/",
  },
  {
    id: "product-studio",
    name: "AI Product Studio",
    image: "/images/product-iamge.png",
    href: "https://productimagegeneration.vercel.app/studio",
  },
  {
    id: "stacktrack",
    name: "The Ledger",
    image: "/images/stacktrack.png",
    href: "https://stacktrack.bombayblokes.com/",
  },
  {
    id: "scraper",
    name: "Product Scraper",
    image: "/images/scraper1.png",
    href: "https://bb-scraper.vercel.app/",
  },
];
gsap.registerPlugin(ScrollTrigger);
export default function BombAISection() {
  const root = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const INITIAL_TEXT = "Click To Generate Your AI Images";
  const NEW_TEXT = "Generate High converting Image For Meta Ads.";
  const [labelText, setLabelText] = useState(INITIAL_TEXT);
  const [activeTab, setActiveTab] = useState<"images" | "video" | "tools">("images");
  const [showImages, setShowImages] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
      tl.from(".bomb-card", {
        y: 50,
        opacity: 10,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(".bomb-strip", { x: 50, opacity: 10, duration: 0.2 }, "-=0.4")
        .from(".bomb-cta", { y: 20, opacity: 10, duration: 0.6 }, "-=0.2");
      const proxy = { count: INITIAL_TEXT.length };
      tl.to(proxy, {
        count: 0,
        duration: 0.4,
        ease: "none",
        onUpdate: () => {
          const n = Math.floor(proxy.count);
          setLabelText(INITIAL_TEXT.slice(0, n));
          if (labelRef.current) {
            gsap.to(labelRef.current, {
              opacity: n === 0 ? 0 : 0.6 + 0.4 * (n / INITIAL_TEXT.length),
              duration: 0.1,
            });
          }
        },
      });
      tl.add(() => {
        setLabelText(NEW_TEXT);
        if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, y: 20 });
      });
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      tl.add(() => {
        if (!cardRef.current) return;
        const target = cardRef.current.scrollHeight;
        gsap.to(cardRef.current, {
          height: target,
          duration: 0.5,
          ease: "power2.out",
        });
      }, "+=0.0");
      tl.from(
        gridRef.current?.children || [],
        {
          opacity: 0,
          y: 40,
          stagger: 0.11,
          duration: 0.6,
          ease: "power2.out",
        },
        "<"
      );
    }, root);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (activeTab === "images" || !cardRef.current) return;

    const card = cardRef.current;
    gsap.killTweensOf(card);
    gsap.to(card, {
      height: card.scrollHeight,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        card.style.height = "auto";
      },
    });
  }, [activeTab]);
  useEffect(() => {
    if (activeTab !== "video" || !gridRef.current) return;

    const videoElements = Array.from(gridRef.current.querySelectorAll("video"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "100px 0px", threshold: 0.1 }
    );

    videoElements.forEach((video) => observer.observe(video));
    return () => {
      observer.disconnect();
      videoElements.forEach((video) => video.pause());
    };
  }, [activeTab]);
  return (
    <section
      ref={root}
      className="relative isolate container py-10 sm:py-15 lg:py-20"
      aria-label="Bomb.AI section"
    >
      <div className="mx-auto w-full ">
        <div
          ref={cardRef}
          className="bomb-card relative z-10 rounded-3xl shadow-2xl ring-1 ring-black/10 overflow-hidden"
          /* #1D1D1D -> var(--color-primary) */
          style={{ backgroundColor: "var(--color-primary)", height: 500 }}
        >
          <div
            className="bomb-strip absolute top-0 right-0 h-full w-3 sm:w-5 md:w-7 z-0 pointer-events-none"
            /* #FAB31E -> var(--color-highlight) */
            // style={{ backgroundColor: "var(--color-highlight)" }}
          />
          <div className="absolute right-0 top-0 h-full w-3 sm:w-5 md:w-5  candy-border"></div>
          <div className="relative z-10 flex flex-col items-center justify-start h-full px-5 py-10 sm:py-14 md:py-16">
             <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
  {/* Logo */}
  {/* <div className=" w-[50px] h-[50px] sm:w-[30px] sm:h-[30px] md:w-[50px] md:h-[50px] lg:w-[90px] lg:h-[90px] rounded-full overflow-hidden border border-white bg-white flex items-center justify-center">
    <Image
      src="/images/bombai.jpg"
      alt="Logo"
      width={30}
      height={30}
      className="object-contain w-full h-full"
    />
  </div> */}

  {/* Text */}
  <h1 className="text-highlight font-semibold">
    Bomb.AI
  </h1>
</div>

            <button
              type="button"
              className="bomb-cta mt-8 w-full max-w-[900px] rounded-full border text-left outline-none transition focus-visible:ring-4 active:scale-[0.99]"
              /* border, text, bg from vars */
              style={{
                borderColor: "var(--color-highlight)",
                color: "var(--color-secondary)",
                background: "transparent",
              }}
              aria-label="Click to generate your AI images"
            >
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full border"
                  /* border color */
                  style={{
                    borderColor: "var(--color-highlight)",
                    color: "var(--color-highlight)",
                  }}
                >
                  {/* stroke inherits currentColor from span */}
                  <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                </span>
                <span
                  ref={labelRef}
                  className="flex-1 text-sm sm:text-base font-['Poppins']"
                  /* label text color */
                  style={{ color: "var(--color-highlight)" }}
                >
                  {labelText}
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border"
                    /* border + icon color */
                    style={{
                      borderColor: "var(--color-highlight)",
                      color: "var(--color-highlight)",
                    }}
                  >
                    <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10a7 7 0 0 1-14 0" />
                    <path d="M12 17v6" />
                  </svg>
                  </span>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border"
                    /* border + bars color */
                    style={{
                      borderColor: "var(--color-highlight)",
                      color: "var(--color-highlight)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 30 31"
                      fill="none"
                    >
                      {/* fills use currentColor */}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.97955 11.2258V19.7744C5.97955 20.5319 4.5918 20.5319 4.5918 19.7744V11.2258C4.5918 10.4684 5.97955 10.4684 5.97955 11.2258Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.75519 8.85276V22.1476C8.75519 22.905 7.36743 22.905 7.36743 22.1476V8.85276C7.36743 8.0953 8.75519 8.0953 8.75519 8.85276Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.5306 13.5251V17.4758C11.5306 18.2333 10.1428 18.2333 10.1428 17.4758V13.5251C10.1428 12.7677 11.5306 12.7677 11.5306 13.5251Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.3062 11.0744V19.9257C14.3062 20.6832 12.9185 20.6832 12.9185 19.9257V11.0744C12.9185 10.317 14.3062 10.317 14.3062 11.0744Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.0816 6.35618V24.6444C17.0816 25.4018 15.6938 25.4018 15.6938 24.6444V6.35618C15.6938 5.59872 17.0816 5.59872 17.0816 6.35618Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.857 8.85421V22.1464C19.857 22.9038 18.4692 22.9039 18.4692 22.1464V8.85423C18.4692 8.09678 19.857 8.09676 19.857 8.85421Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.6326 12.9885V18.0122C22.6326 18.7697 21.2449 18.7697 21.2449 18.0122V12.9885C21.2449 12.231 22.6326 12.231 22.6326 12.9885Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.4083 11.2263V19.7739C25.4083 20.5314 24.0205 20.5314 24.0205 19.7739V11.2263C24.0205 10.4688 25.4083 10.4688 25.4083 11.2263Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28.1837 12.987V18.0135C28.1837 18.7709 26.7959 18.7709 26.7959 18.0135V12.987C26.7959 12.2296 28.1837 12.2296 28.1837 12.987Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.20416 12.987V18.0135C3.20416 18.7709 1.81641 18.7709 1.81641 18.0135V12.987C1.81641 12.2296 3.20416 12.2296 3.20416 12.987Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
            <div className="mt-8 flex w-full max-w-4xl justify-center gap-3" role="tablist" aria-label="Bomb.AI examples">
              {(["images", "video", "tools"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? "border-[var(--color-highlight)] bg-[var(--color-highlight)] text-black"
                      : "border-white/30 text-white hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div
              ref={gridRef}
              className={`mt-6 grid w-full max-w-4xl gap-4 ${activeTab === "tools" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}
            >
              {activeTab === "images" && images.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-gray-700/40 relative"
                >
                  {/* Skeleton Loader */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-gray-700/60 via-gray-600/60 to-gray-700/60 bg-[length:200%_100%] animate-shimmer transition-opacity duration-500 ${
                      showImages[i] ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      animation: showImages[i] ? "none" : "shimmer 2s infinite",
                    }}
                  />
                  {/* Actual Image */}
                  <Image
                    src={src}
                    alt={`AI Generated Image ${i + 1}`}
                    width={400}
                    height={400}
                    quality={60}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      showImages[i] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => {
                      setShowImages((prev) => {
                        const newState = [...prev];
                        newState[i] = true;
                        return newState;
                      });
                    }}
                  />
                </div>
              ))}
              {activeTab === "video" && videos.map((video) => (
                <div key={video.src} className="relative aspect-square overflow-hidden rounded-xl bg-black/50">
                  <video
                    src={video.src}
                    aria-label={video.title}
                    muted
                    loop
                    preload="none"
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  {/* <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 text-xs font-medium text-white">
                    {video.title}
                  </span> */}
                </div>
              ))}
              {activeTab === "tools" && tools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${tool.name}`}
                  className={`group overflow-hidden rounded-2xl border p-3 text-left transition-transform hover:-translate-y-1 sm:p-4 ${
                    tool.id === "expenses" || tool.id === "stacktrack"
                      ? "border-white/10 bg-[#111210] text-white"
                      : tool.id === "product-studio"
                        ? "border-black/10 bg-[#f7f8fa] text-[#171717]"
                        : "border-[#f1df9b] bg-gradient-to-br from-[#fffdf6] to-[#fff0b8] text-[#171717]"
                  }`}
                >
                  <div className="relative mb-3 aspect-[2/1] w-full overflow-hidden rounded-xl">
                    <Image
                      src={tool.image}
                      alt={`${tool.name} preview`}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 42vw, 380px"
                      quality={60}
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-current/10 pt-3">
                    <h3 className="min-w-0 truncate text-sm font-semibold sm:text-base">{tool.name}</h3>
                    <span className="shrink-0 text-sm font-semibold text-[#fab31e] group-hover:underline">Open ↗</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex justify-center items-center py-10">
              <Button
                href="https://bbstudios.bombayblokes.com/bomb.ai"
                text="Explore Our Ai Studios"
                className="text-white font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
