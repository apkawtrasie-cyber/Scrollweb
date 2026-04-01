"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { skills } from "@/data/skills";
import { X } from "lucide-react";
import SkillCard from "./SkillCard";

/*
 * Exploding Grid — 7 cards with IRREGULAR sizes
 *
 * CLOSED: Cards form a grid covering the profile photo.
 * SCROLL: Cards spread outward 360° (moderate distance, stay on screen).
 * CLICK:  Card GSAP-animates to center at 1.2× with blur backdrop.
 *         Close → card flies back to its position. No page jump.
 *
 * See /docs/card-positions.md for manual tuning.
 */

/* ─────────────────────────────────────────────
 *  IRREGULAR CARD SIZES — each card is different
 * ───────────────────────────────────────────── */
const SIZES = {
  mobile: [
    { w: 92, h: 116 },  // 0: HTML — top single
    { w: 100, h: 124 }, // 1: React — upper-left
    { w: 96, h: 120 },  // 2: TS — upper-right
    { w: 104, h: 128 }, // 3: Next — mid-left
    { w: 98, h: 122 },  // 4: GSAP — mid-right
    { w: 96, h: 120 },  // 5: Tailwind — lower-left
    { w: 100, h: 124 }, // 6: Node — lower-right
  ],
  desktop: [
    { w: 138, h: 172 }, { w: 156, h: 194 }, { w: 142, h: 178 },
    { w: 162, h: 200 }, { w: 150, h: 186 }, { w: 144, h: 180 },
    { w: 152, h: 190 },
  ],
};

/* ─────────────────────────────────────────────
 *  MOBILE COVERING — diamond / pyramid around photo
 *
 *         [0]            ← top single (centered)
 *       [1] [2]          ← upper pair
 *     [3]  📷  [4]      ← flanking photo
 *       [5] [6]          ← lower pair (mirror of upper)
 *
 * ─────────────────────────────────────────────
 *  DESKTOP COVERING — 3-2-2 grid
 *
 *     [0]  [1]  [2]     ← top row
 *       [3]  [4]        ← mid row
 *       [5]  [6]        ← bot row
 * ───────────────────────────────────────────── */
function getCovering(m: boolean) {
  if (m) {
    // ── MOBILE: diamond pattern ──
    return [
      { x:   0, y: -115, z: 1 },  // 0: top single
      { x: -52, y:  -48, z: 2 },  // 1: upper-left
      { x:  52, y:  -48, z: 3 },  // 2: upper-right
      { x: -62, y:   18, z: 4 },  // 3: mid-left (flanking photo)
      { x:  62, y:   18, z: 5 },  // 4: mid-right
      { x: -52, y:   80, z: 6 },  // 5: lower-left
      { x:  52, y:   80, z: 7 },  // 6: lower-right
    ];
  }

  // ── DESKTOP: 3-2-2 grid ──
  const s = SIZES.desktop;
  const avgW = s.reduce((a, c) => a + c.w, 0) / s.length;
  const avgH = s.reduce((a, c) => a + c.h, 0) / s.length;
  const gx = 5;
  const gy = 5;

  return [
    { x: -(avgW + gx), y: -(avgH + gy), z: 1 },
    { x:  0,            y: -(avgH + gy), z: 2 },
    { x:  (avgW + gx), y: -(avgH + gy), z: 3 },
    { x: -(avgW / 2 + gx), y: 0,             z: 4 },
    { x:  (avgW / 2 + gx), y: 0,             z: 5 },
    { x: -(avgW / 2 + gx), y:  (avgH + gy), z: 6 },
    { x:  (avgW / 2 + gx), y:  (avgH + gy), z: 7 },
  ];
}

/* ─────────────────────────────────────────────
 *  EXPLODED STATE
 *  Mobile: clamped to viewport so cards never leave screen.
 *  Desktop: moderate spread, symmetric left/right.
 * ───────────────────────────────────────────── */
function getExploded(vw: number, vh: number) {
  if (vw < 768) {
    // ── MOBILE: safe distances, never exceed screen ──
    const maxCW = Math.max(...SIZES.mobile.map(s => s.w));
    const maxCH = Math.max(...SIZES.mobile.map(s => s.h));
    const pad = 10;
    const safeX = vw / 2 - maxCW / 2 - pad;   // max horizontal offset
    const safeY = vh / 2 - maxCH / 2 - pad;   // max vertical offset
    const sx = Math.min(safeX, 130);           // cap for small screens
    const sy = Math.min(safeY, 260);

    return [
      { x:  0,   y: -sy },           // 0: top center
      { x: -sx,  y: -(sy * 0.55) },  // 1: upper-left
      { x:  sx,  y: -(sy * 0.55) },  // 2: upper-right
      { x: -sx,  y:  0 },            // 3: mid-left
      { x:  sx,  y:  0 },            // 4: mid-right
      { x: -sx,  y:  (sy * 0.55) },  // 5: lower-left
      { x:  sx,  y:  (sy * 0.55) },  // 6: lower-right
    ];
  }

  // ── DESKTOP: symmetric spread ──
  const dx = vw * 0.30;
  const dy = vh * 0.26;
  return [
    { x: -dx,          y: -dy },          // 0: top-left
    { x:  0,            y: -(dy * 1.4) },  // 1: top-center
    { x:  dx,           y: -dy },          // 2: top-right
    { x: -(dx * 1.3),  y:  0 },           // 3: mid-left
    { x:  (dx * 1.3),  y:  0 },           // 4: mid-right
    { x: -dx,          y:  dy },           // 5: bot-left
    { x:  dx,           y:  dy },          // 6: bot-right
  ];
}

export default function CardReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openIndexRef = useRef<number | null>(null);
  const savedState = useRef<{ x: number; y: number; scale: number; zIndex: number } | null>(null);

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardsRef.current[i] = el;
  }, []);

  /* ── OPEN card as modal ── */
  const openCard = useCallback((i: number) => {
    const card = cardsRef.current[i];
    const bd = backdropRef.current;
    const btn = closeBtnRef.current;
    const container = cardsContainerRef.current;
    if (!card || !bd || !btn || !container || openIndexRef.current !== null) return;
    openIndexRef.current = i;

    // Save current GSAP-controlled position
    savedState.current = {
      x: Number(gsap.getProperty(card, "x")),
      y: Number(gsap.getProperty(card, "y")),
      scale: Number(gsap.getProperty(card, "scale")),
      zIndex: Number(gsap.getProperty(card, "zIndex")),
    };

    const w = card.offsetWidth;
    const h = card.offsetHeight;

    // Lift cards container above backdrop (z-55 > backdrop z-50)
    container.style.zIndex = "55";

    // Fly card to center at 1.6× scale (60% bigger for readability)
    // x/y position the LEFT/TOP edge; -w/2,-h/2 centers the card at (0,0)
    gsap.to(card, {
      x: -w / 2,
      y: -h / 2,
      scale: 1.6,
      zIndex: 60,
      duration: 0.5,
      ease: "power3.out",
    });

    // Blur backdrop — always visible to focus attention on card
    gsap.to(bd, {
      opacity: 1, duration: 0.35,
      onStart: () => { bd.style.pointerEvents = "auto"; },
    });
    gsap.to(btn, {
      opacity: 1, duration: 0.35, delay: 0.15,
      onStart: () => { btn.style.pointerEvents = "auto"; },
    });
  }, []);

  /* ── CLOSE card modal ── */
  const closeCard = useCallback(() => {
    const i = openIndexRef.current;
    const s = savedState.current;
    if (i === null || !s) return;
    const card = cardsRef.current[i];
    const bd = backdropRef.current;
    const btn = closeBtnRef.current;
    const container = cardsContainerRef.current;
    if (!card || !bd || !btn) return;

    // Fly card back
    gsap.to(card, {
      x: s.x, y: s.y, scale: s.scale, zIndex: s.zIndex,
      duration: 0.5, ease: "power3.inOut",
      onComplete: () => {
        openIndexRef.current = null;
        savedState.current = null;
        // Reset container z-index so cards don't block scroll interaction
        if (container) container.style.zIndex = "";
      },
    });

    gsap.to(btn, { opacity: 0, duration: 0.2, onComplete: () => { btn.style.pointerEvents = "none"; } });
    gsap.to(bd, { opacity: 0, duration: 0.35, onComplete: () => { bd.style.pointerEvents = "none"; } });
  }, []);

  /* ── GSAP ScrollTrigger setup ── */
  useEffect(() => {
    if (!sectionRef.current || !pinRef.current || !photoRef.current) return;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const m = vw < 768;
    const sizes = m ? SIZES.mobile : SIZES.desktop;
    const covering = getCovering(m);
    const exploded = getExploded(vw, vh);

    // Set initial covering positions (each card at its own size)
    cards.forEach((card, i) => {
      gsap.set(card, {
        x: covering[i].x - sizes[i].w / 2,
        y: covering[i].y - sizes[i].h / 2,
        zIndex: covering[i].z,
        width: sizes[i].w,
        height: sizes[i].h,
        scale: 1,
        opacity: 1,
      });
    });

    gsap.set(photoRef.current, { filter: "blur(8px) brightness(0.25)" });

    // Faster spread — 80% pin duration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=80%",
        pin: pinRef.current,
        scrub: 0.3,
        pinSpacing: true,
      },
    });

    cards.forEach((card, i) => {
      tl.fromTo(card,
        { x: covering[i].x - sizes[i].w / 2, y: covering[i].y - sizes[i].h / 2, scale: 1 },
        { x: exploded[i].x - sizes[i].w / 2, y: exploded[i].y - sizes[i].h / 2, scale: 1, ease: "power2.out", duration: 1, overwrite: "auto" },
        0,
      );
    });

    tl.fromTo(photoRef.current,
      { filter: "blur(8px) brightness(0.25)" },
      { filter: "blur(0px) brightness(1)", ease: "power2.out", duration: 1 },
      0,
    );

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── Photo + asymmetric neon glow ── */}
        <div ref={photoRef} className="absolute inset-0 flex items-center justify-center">
          <div className="absolute rounded-full pointer-events-none" style={{
            width: 280, height: 280, left: "50%", top: "50%",
            transform: "translate(-58%, -54%)",
            background: "radial-gradient(ellipse at 35% 40%, rgba(57,255,20,0.13) 0%, rgba(57,255,20,0.04) 40%, transparent 70%)",
            filter: "blur(30px)",
          }} />
          <div className="absolute rounded-full pointer-events-none" style={{
            width: 180, height: 180, left: "50%", top: "50%",
            transform: "translate(-36%, -42%)",
            background: "radial-gradient(ellipse at 65% 55%, rgba(57,255,20,0.06) 0%, transparent 60%)",
            filter: "blur(20px)",
          }} />
          <div className="relative w-[144px] h-[192px] sm:w-[160px] sm:h-[216px] md:w-[176px] md:h-[240px]">
            {/* Neon glow underneath — bottom edge lighting */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[120%] h-[40%] rounded-full pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.35) 0%, rgba(57,255,20,0.12) 40%, transparent 70%)",
              filter: "blur(18px)",
            }} />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-[20%] rounded-full pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.5) 0%, transparent 70%)",
              filter: "blur(10px)",
            }} />
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/andrzejmich.ch.png" alt="Andrzej Mich" fill className="object-cover"
                sizes="(max-width: 768px) 144px, 176px" priority />
              <div className="absolute inset-0 rounded-2xl" style={{
                boxShadow: "inset 0 0 40px rgba(57,255,20,0.05), 0 0 60px rgba(57,255,20,0.08), 0 12px 40px rgba(57,255,20,0.15), 0 4px 16px rgba(57,255,20,0.1)",
              }} />
            </div>
          </div>
        </div>

        {/* ── Cards container — z-index set dynamically for modal ── */}
        <div ref={cardsContainerRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)" }}>
            {skills.map((skill, i) => (
              <SkillCard key={skill.id} ref={(el) => setCardRef(el, i)}
                skill={skill} index={i} onClick={() => openCard(i)} />
            ))}
          </div>
        </div>

        {/* ── Blur backdrop (z-50, below open card z-60) ── */}
        <div ref={backdropRef}
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          style={{ opacity: 0, pointerEvents: "none", zIndex: 50 }}
          onClick={closeCard}
        />

        {/* ── Close button (z-70, above open card) ── */}
        <button ref={closeBtnRef} onClick={closeCard}
          className="absolute w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-colors"
          style={{ opacity: 0, pointerEvents: "none", zIndex: 70, top: "calc(50% - 18vh)", right: "calc(50% - 12vw)" }}
        >
          <X size={18} color="#333" />
        </button>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-0 w-full text-center z-30 pointer-events-none">
          <p className="text-text-muted/60 font-display text-[10px] sm:text-xs uppercase tracking-[0.4em]">
            Scroll ↓
          </p>
        </div>
      </div>
    </section>
  );
}
