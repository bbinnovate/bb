"use client"

import { useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Card from "./Card"

const SERVICES_DATA = [
  {
    number: "01",
    title: "Web Development & UI UX",
    image: "/images/webdev/SuperSoxnew.jpg",
    link: "/services/website-development",
    bgClass: "bg-zinc-900 border-zinc-700/50",
    frontSrc: "/images/servicespage/bb1.png",
  },
  {
    number: "02",
    title: "Design & Branding",
    image: "/images/branding-cs/barnd3.jpg",
    link: "/services/design-branding",
    bgClass: "bg-emerald-950 border-emerald-700/50",
    frontSrc: "/images/servicespage/bb2.png",
  },
  {
    number: "03",
    title: "SEO",
    image: "/images/seo-cs/manbaaa.png",
    link: "/services/seo-services",
    bgClass: "bg-neutral-900 border-neutral-700/50",
    frontSrc: "/images/servicespage/bb3.png",
  },
  {
    number: "04",
    title: "GEO",
    image: "/images/geo-cs/geo-1.jpg",
    link: "/services/geo-services",
    bgClass: "bg-blue-950 border-blue-700/50",
    frontSrc: "/images/servicespage/bb4.png",
  },
  {
    number: "05",
    title: "Performance Marketing",
    image: "/images/pm/Chatterboxnew2.jpg",
    link: "/services/performance-marketing",
    bgClass: "bg-purple-950 border-purple-700/50",
    frontSrc: "/images/servicespage/bb5.png",
  },
  {
    number: "06",
    title: "Social Media Management",
    image: "/images/sm/Manba.jpg",
    link: "/services/social-media-marketing",
    bgClass: "bg-stone-900 border-stone-700/50",
    frontSrc: "/images/servicespage/bb6.png",
  },
] as const

const PinSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const row = rowRef.current
      if (!section || !row) return

      const cards = row.querySelectorAll<HTMLElement>("[data-card-shell]")
      const flippers = row.querySelectorAll<HTMLElement>("[data-flip-inner]")

      const radius = 16
      const gridRadii = [
        `${radius}px 0 0 0`,        // Card 1: Top-Left
        "0",                         // Card 2: Top-Center
        `0 ${radius}px 0 0`,        // Card 3: Top-Right
        `0 0 0 ${radius}px`,        // Card 4: Bottom-Left
        "0",                         // Card 5: Bottom-Center
        `0 0 ${radius}px 0`,        // Card 6: Bottom-Right
      ]

      cards.forEach((card, i) => {
        const faces = card.querySelectorAll<HTMLElement>("[data-card-face]")
        gsap.set(faces, { borderRadius: gridRadii[i] })
      })

      flippers.forEach((f) => {
        gsap.set(f, { rotationY: 0, transformStyle: "preserve-3d" })
      })

      const flipParams = [
        { rotateZ: -2, moveY: -6, moveX: -6 },
        { rotateZ: 0,  moveY: -8, moveX: 0 },
        { rotateZ: 2,  moveY: -6, moveX: 6 },
        { rotateZ: -2, moveY: 6,  moveX: -6 },
        { rotateZ: 0,  moveY: 8,  moveX: 0 },
        { rotateZ: 2,  moveY: 6,  moveX: 6 },
      ]

      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isMobile: "(max-width: 639px)",
        },
        (context) => {
          const { isDesktop, isTablet } = context.conditions || {}
          const targetGap = isDesktop ? "2rem" : isTablet ? "1.25rem" : "0.5rem"
          const targetScale = isDesktop ? 1 : isTablet ? 0.95 : 0.85

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=350%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true,
            },
          })

          // 1. Large prominent single banner rectangle comes up smoothly from bottom
          tl.fromTo(
            row,
            { y: "45vh", opacity: 0, scale: 0.95 },
            { y: "0vh", opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
          )

          // 2. Divide big banner into 3x2 grid (3 top, 3 bottom) & round all corners to 16px
          tl.to(
            row,
            {
              gap: targetGap,
              scale: targetScale,
              duration: 1.2,
              ease: "power2.inOut",
            },
            ">+0.1"
          )

          cards.forEach((card) => {
            const faces = card.querySelectorAll<HTMLElement>("[data-card-face]")
            tl.to(
              faces,
              { borderRadius: `${radius}px`, duration: 1.2, ease: "power2.inOut" },
              "<"
            )
          })

          // 3. THEN flip all 6 cards in sequence to reveal distinct images, titles & links
          flippers.forEach((flipper, i) => {
            tl.to(
              flipper,
              {
                rotationY: 180,
                rotationZ: flipParams[i].rotateZ,
                y: flipParams[i].moveY,
                x: flipParams[i].moveX,
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3)",
                duration: 1.2,
                ease: "power2.inOut",
                force3D: true,
              },
              i === 0 ? ">+0.15" : "<+0.05"
            )
          })

          // 4. Pause in view so user can comfortably read and click all cards
          tl.to({}, { duration: 1.2 })
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <div
      ref={sectionRef}
      className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden px-2 sm:px-4 md:px-8 lg:px-12"
    >
      <div
        ref={rowRef}
        className="grid grid-cols-3 gap-0 overflow-visible will-change-transform max-w-full justify-items-center items-center"
      >
        {SERVICES_DATA.map((item) => (
          <Card
            key={item.number}
            src={item.frontSrc}
            alt={item.title}
            backImage={item.image}
            href={item.link}
            backfaceClassName={item.bgClass}
          >
            
             <div className="mt-auto">
  <span className="block text-lg sm:text-xl lg:text-2xl font-mono font-bold opacity-80 text-white drop-shadow">
    {item.number}
  </span>

  <h4 className="text-white drop-shadow-md leading-tight group-hover:text-amber-300 transition-colors">
    {item.title}
  </h4>
</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PinSection