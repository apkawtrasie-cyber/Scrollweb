"use client";

export default function FogEffect() {
  return (
    <>
      {/* SVG filter for organic fog texture */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="fog-turbulence">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="4"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="60"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Fog Layer */}
      <div className="splash-fog absolute inset-0 z-5 pointer-events-none opacity-0">
        {/* Central fog band */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300px]"
          style={{ filter: "url(#fog-turbulence)" }}
        >
          <div className="absolute inset-0 bg-neon-green/15 blur-[80px]" />
        </div>
        {/* Wider diffuse layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[500px]">
          <div className="absolute inset-0 bg-neon-green/8 blur-[120px] rounded-full" />
        </div>
        {/* Sharp core glow at the split */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60px]">
          <div className="absolute inset-0 bg-neon-green/20 blur-[40px]" />
        </div>
      </div>
    </>
  );
}
