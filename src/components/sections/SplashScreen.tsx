"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !pinRef.current ||
      !topRef.current ||
      !bottomRef.current ||
      !fogRef.current ||
      !heroWrapRef.current ||
      !heroInnerRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: pinRef.current,
        scrub: 0.3,
        pinSpacing: true,
      },
    });

    // ── PHASE 1: Shutter opens ──
    tl.to(topRef.current, { yPercent: -100, ease: "none", duration: 1 }, 0);
    tl.to(bottomRef.current, { yPercent: 100, ease: "none", duration: 1 }, 0);

    tl.fromTo(
      fogRef.current,
      { opacity: 0, scale: 0.8 },
      {
        ease: "none",
        duration: 1,
        keyframes: {
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1.3, 1.6],
        },
      },
      0
    );

    tl.fromTo(heroWrapRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 1 }, 0);
    tl.fromTo(heroInnerRef.current, { scale: 0.7 }, { scale: 1, ease: "none", duration: 1 }, 0);

    // ── PHASE 2: Hero text + button scale up (40% mobile, 55% desktop) ──
    const isMobile = window.innerWidth < 768;
    tl.to(heroInnerRef.current, { scale: isMobile ? 1.4 : 1.55, ease: "none", duration: 1 }, 1);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">

        {/* Hero Content (underneath panels) */}
        <div ref={heroWrapRef} className="absolute inset-0 z-0 flex items-center justify-center" style={{ opacity: 0 }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-neon-green/8 blur-[120px]" />
          </div>
          <div ref={heroInnerRef} className="relative z-10 text-center w-full px-4 sm:px-8 md:px-12" style={{ willChange: "transform" }}>
            <div className="mx-auto">
              <h1 className="font-display text-text-main text-[clamp(1.2rem,5vw,3rem)] uppercase leading-[1.2] tracking-wide">
                Twoja strona, która żyje.
              </h1>
              <p className="mt-4 sm:mt-5 text-neon-green neon-glow-sm font-display text-[clamp(0.9rem,3vw,1.2rem)] tracking-wide leading-relaxed">
                Odkryj nowy wymiar cyfrowej narracji.
              </p>
              <div style={{ marginTop: "40px" }}>
                <button
                  onClick={() => {
                    const next = document.getElementById("next-section");
                    if (next) next.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative px-8 sm:px-12 md:px-14 py-3 sm:py-4 md:py-5 border border-neon-green text-neon-green font-display uppercase tracking-[0.25em] text-xs sm:text-sm md:text-base hover:bg-neon-green/10 transition-colors duration-300 neon-box-glow cursor-pointer"
                >
                  Zobacz więcej
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SVG filter */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="fog-turbulence">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Fog layer */}
        <div ref={fogRef} className="absolute inset-0 z-[5] pointer-events-none" style={{ opacity: 0 }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300px]" style={{ filter: "url(#fog-turbulence)" }}>
            <div className="absolute inset-0 bg-neon-green/15 blur-[80px]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[500px]">
            <div className="absolute inset-0 bg-neon-green/8 blur-[120px] rounded-full" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60px]">
            <div className="absolute inset-0 bg-neon-green/20 blur-[40px]" />
          </div>
        </div>

        {/* Top Half: ANDRZEJ */}
        <div ref={topRef} className="absolute top-0 left-0 w-full h-1/2 bg-bg-dark z-10 flex items-end justify-center pb-[2vh]" style={{ willChange: "transform" }}>
          <span
            className="font-display text-neon-green text-[15vw] sm:text-[12vw] md:text-[9vw] uppercase leading-none tracking-wider neon-glow select-none"
            style={{ fontStyle: "normal", transform: "none" }}
          >
            Andrzej
          </span>
        </div>

        {/* Bottom Half: MICH */}
        <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-bg-dark z-10 flex items-start justify-center pt-[1vh]" style={{ willChange: "transform" }}>
          <span className="font-display-alt text-neon-green text-[18vw] sm:text-[14vw] md:text-[10vw] uppercase leading-none tracking-[0.4em] neon-glow select-none">
            Mich
          </span>
        </div>
      </div>
    </div>
  );
}
