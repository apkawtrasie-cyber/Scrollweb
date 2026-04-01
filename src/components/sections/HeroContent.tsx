"use client";

export default function HeroContent() {
  return (
    <div className="hero-wrap absolute inset-0 z-0 flex items-center justify-center opacity-0">
      {/* Neon fog background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-neon-green/8 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[80px]" />
      </div>

      {/* Hero text and button */}
      <div className="hero-inner relative z-10 text-center w-full px-6 sm:px-8 md:px-12 will-change-transform">
        <div className="max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] mx-auto">
          <h1 className="font-display text-text-main text-[clamp(1.5rem,6vw,3rem)] uppercase leading-[1.2] tracking-wide">
            Twoja strona, która żyje.
          </h1>
          <p className="mt-4 sm:mt-5 text-neon-green neon-glow-sm font-display text-[clamp(0.9rem,3vw,1.2rem)] tracking-wide leading-relaxed">
            Odkryj nowy wymiar cyfrowej narracji.
          </p>

          <div className="mt-24 sm:mt-28 md:mt-16">
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
  );
}
