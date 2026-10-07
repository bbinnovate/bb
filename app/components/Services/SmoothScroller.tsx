"use client";

import gsap from "gsap";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

type SmoothScrollerProps = {
  children: ReactNode;
};

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}