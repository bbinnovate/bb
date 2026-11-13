"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";
import Button from "../Button";
import Image from "next/image";
export default function LightCameraAction() {
  const rootRef = useRef<HTMLElement | null>(null);
  const muxRef = useRef<unknown | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Mux error suppression (same as before)
  useEffect(() => {
    const _origConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      try {
        const first = args[0];
        if (
          typeof first === "string" &&
          first.includes("getErrorFromHlsErrorData()")
        ) {
          return;
        }
      } catch (e) {
        return _origConsoleError(...args);
      }
      _origConsoleError(...args);
    };
    return () => {
      console.error = _origConsoleError;
    };
  }, []);
  // Scroll-linked animation (replacement for ScrollTrigger)
  // section is 300vh high, inner content is sticky, so we get ≈ "+=200%" behaviour
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  /** ---------------- WORD COLORS (Light. Camera. Action) ---------------- **/
  const word1Color = useTransform(
    scrollYProgress,
    [0, 0.1, 1],
    ["#1D1D1D", "#FAB31E", "#FAB31E"] // stays highlighted
  );
  const word2Color = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 1],
    ["#1D1D1D", "#1D1D1D", "#FAB31E", "#FAB31E"]
  );
  const word3Color = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3, 1],
    ["#1D1D1D", "#1D1D1D", "#FAB31E", "#FAB31E"]
  );
  /** ---------------- FRAME (yellow shutter frame container) ---------------- **/
  // Roughly: appear after words, stay, then fade out & slightly overscale (like GSAP tl)
  const frameOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.8, 1],
    [0, 1, 1, 0]
  );
  const frameScale = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.8, 1],
    [0.94, 1, 1, 1.02]
  );
  /** ---------------- SHUTTER PANELS ---------------- **/
  // Sequence: off-screen → close (0,0) → open back out
  // We keep the same "70%" feel using %, like your xPercent / yPercent.
  const panelTRX = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.55, 0.65],
    ["70%", "0%", "0%", "70%"]
  );
  const panelTRY = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.55, 0.65],
    ["-70%", "0%", "0%", "-70%"]
  );
  const panelBLX = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.55, 0.65],
    ["-70%", "0%", "0%", "-70%"]
  );
  const panelBLY = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.55, 0.65],
    ["70%", "0%", "0%", "70%"]
  );
  const panelTRRotation = useMemo(() => (isMobile ? 62 : 29), [isMobile]);
  const panelBLRotation = useMemo(() => (isMobile ? 62 : 29), [isMobile]);
  const panelTROrigin = useMemo(
    () => (isMobile ? "57% 59%" : "66% 17%"),
    [isMobile]
  );
  const panelBLOrigin = useMemo(
    () => (isMobile ? "17% -11%" : "20% -52%"),
    [isMobile]
  );
  /** ---------------- VIDEO (Mux Player container) ---------------- **/
  // GSAP: opacity 0 -> 1, scale 0.16 -> 1, zIndex raised during shutter retract
  const videoOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    [0, 1]
  );
  const videoScale = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    [0.16, 1]
  );
  const videoZIndex = useTransform(
    scrollYProgress,
    [0.4, 0.41],
    [-50, 10]
  );
  return (
    <div className="w-full container black-text py-10 sm:py-15 lg:py-20">
      {/* Outer section controls scroll distance; inner content is sticky (pinned) */}
      <section
        ref={rootRef}
        className="relative w-full h-[300vh]" // ≈ "+=200%" scroll space
      >
        <motion.div className="sticky top-0 min-h-[100svh] flex items-center justify-center">
          {/* Headline & logo */}
          <div className="relative w-full min-h-[100svh] flex items-center justify-center">
            {/* Headline */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              {/* Logo */}
              <div className="w-[90px] h-[90px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] lg:w-[110px] lg:h-[110px] rounded-full overflow-hidden border border-white bg-white flex items-center justify-center mx-auto">
                <Image
                  src="/favicon.png"
                  alt="Logo"
                  width={130}
                  height={130}
                  className="object-contain w-full h-full"
                />
              </div>
              {/* Text */}
              <h2 className="select-none relative -z-10 text-center flex flex-col md:flex-row gap-2">
                <motion.span
                  data-word
                  className="inline-block"
                  style={{ color: word1Color }}
                >
                  Light.
                </motion.span>
                <motion.span
                  data-word
                  className="inline-block"
                  style={{ color: word2Color }}
                >
                  Camera.
                </motion.span>
                <motion.span
                  data-word
                  className="inline-block"
                  style={{ color: word3Color }}
                >
                  Action
                </motion.span>
              </h2>
            </div>
            {/* Video container with Mux Player */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="
                  relative
                  w-[85vw] aspect-[9/16]
                  lg:w-full md:aspect-video
                  overflow-hidden rounded-2xl
                "
                style={{
                  opacity: videoOpacity,
                  scale: videoScale,
                  zIndex: videoZIndex,
                }}
              >
                <MuxPlayer
                  key={isMobile ? "mobile" : "desktop"}
                  playbackId={
                    isMobile
                      ? "pUVDITP3rvpG8xijjIIauh3TeT01Kqxk3ZWqaVinOugI"
                      : "yeCTXyhZ02exbUuun802zIY9GHyyUotThjV2WuHWNWMA8"
                  }
                  metadata={{
                    video_id: "video-id-54321",
                    video_title: "Test video title",
                    viewer_user_id: "user-id-007",
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  streamType="on-demand"
                  style={
                    {
                      "--controls": "none",
                      "--media-object-fit": "cover",
                      "--media-object-position": "center",
                      width: "100%",
                      height: "100%",
                    } as React.CSSProperties
                  }
                  ref={(el) => {
                    muxRef.current = el;
                    try {
                      if (el && typeof el.addEventListener === "function") {
                        el.addEventListener("error", (ev: Event) => {
                          console.error("MuxPlayer error event:", ev);
                        });
                      }
                    } catch {
                      // Ignore errors when adding event listener
                    }
                  }}
                />
                {/* yellow accent line */}
             <div className="absolute right-0 top-0 hidden h-full w-3 sm:block sm:w-5 md:w-5 candy-border"></div>
                {/* <div
                  className="absolute bottom-10 right-20 z-50
                    sm:right-20 sm:bottom-10
                    translate-x-1/2 sm:translate-x-0 "
                >
                  <Button
                    href="https://bbstudios.bombayblokes.com"
                    text="BB Studios"
                    className="white-text font-semibold transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div> */}
              </motion.div>
            </div>
            {/* Frame + shutter panels */}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center z-20"
              aria-hidden
              style={{
                opacity: frameOpacity,
                scale: frameScale,
              }}
            >
              <div
                className="
                  relative
                  w-[90vw] max-w-[560px] aspect-[9/16]
                  md:w/full md:max-w-full md:aspect-video
                  overflow-hidden rounded-2xl
                "
              >
                <motion.div
                  className="absolute w-[210%] md:w-[140%] h-[100%] bg-[#FAB31E]/95 rounded-2xl pointer-events-none top-[-20%] z-30"
                  style={{
                    x: panelTRX,
                    y: panelTRY,
                    rotate: panelTRRotation,
                    transformOrigin: panelTROrigin,
                  }}
                />
                <motion.div
                  className="absolute w-[210%] md:w-[140%] h-[100%] bg-[#FAB31E]/95 rounded-2xl pointer-events-none bottom-[-20%] z-30"
                  style={{
                    x: panelBLX,
                    y: panelBLY,
                    rotate: panelBLRotation,
                    transformOrigin: panelBLOrigin,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}