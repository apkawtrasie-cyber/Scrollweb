"use client";

export default function SplashShutter() {
  return (
    <>
      {/* Top Half: "ANDRZEJ" */}
      <div className="splash-top absolute top-0 left-0 w-full h-1/2 bg-bg-dark z-10 flex items-end justify-center pb-[2vh] will-change-transform">
        <span
          className="font-display text-neon-green text-[15vw] sm:text-[12vw] md:text-[9vw] uppercase leading-none tracking-wider neon-glow select-none"
          style={{
            fontStyle: "italic",
            transform: "skewX(-10deg) translateX(-0.1em)",
          }}
        >
          Andrzej
        </span>
      </div>

      {/* Bottom Half: "MICH" */}
      <div className="splash-bottom absolute bottom-0 left-0 w-full h-1/2 bg-bg-dark z-10 flex items-start justify-center pt-[1vh] will-change-transform">
        <span className="font-display-alt text-neon-green text-[18vw] sm:text-[14vw] md:text-[10vw] uppercase leading-none tracking-[0.4em] neon-glow select-none">
          Mich
        </span>
      </div>
    </>
  );
}
