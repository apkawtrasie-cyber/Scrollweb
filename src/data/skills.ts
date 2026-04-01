export interface Skill {
  id: string;
  title: string;
  icon: string;
  description: string;
  /** Card background color (milky/frosted tones) */
  cardBg: string;
  /** Accent color for icon and title */
  accent: string;
}

export const skills: Skill[] = [
  {
    id: "html-css",
    title: "HTML & CSS",
    icon: "Code2",
    description:
      "Semantyczny markup i nowoczesne layouty — od Flexbox po Grid. Tworzę dostępne, responsywne strony, które wyglądają perfekcyjnie na każdym urządzeniu.",
    cardBg: "rgba(255, 255, 255, 0.92)",
    accent: "#e44d26",
  },
  {
    id: "react",
    title: "React",
    icon: "Atom",
    description:
      "Komponentowa architektura i zarządzanie stanem w dużej skali. Buduję interaktywne interfejsy z hookami, context API i Server Components.",
    cardBg: "rgba(240, 248, 255, 0.90)",
    accent: "#61dafb",
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "FileType",
    description:
      "Statyczne typowanie, które eliminuje błędy zanim trafią do produkcji. Piszę bezpieczny, samodokumentujący się kod z pełnym IntelliSense.",
    cardBg: "rgba(245, 245, 250, 0.88)",
    accent: "#3178c6",
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "Globe",
    description:
      "Server-side rendering, static generation i edge functions. Dostarczam błyskawicznie ładujące się aplikacje z idealnym SEO.",
    cardBg: "rgba(235, 235, 235, 0.90)",
    accent: "#555555",
  },
  {
    id: "gsap",
    title: "GSAP & Motion",
    icon: "Sparkles",
    description:
      "ScrollTrigger, Flip, timeline — tworzę płynne, kinowe animacje, które opowiadają historię i angażują użytkownika na każdym scrollu.",
    cardBg: "rgba(248, 255, 240, 0.90)",
    accent: "#88ce02",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    icon: "Palette",
    description:
      "Utility-first CSS z pełną kontrolą nad designem. Szybkie prototypy i spójny system designu — zero zbędnego kodu, maksimum efektu.",
    cardBg: "rgba(240, 249, 255, 0.91)",
    accent: "#38bdf8",
  },
  {
    id: "nodejs",
    title: "Node.js",
    icon: "Server",
    description:
      "Backend w JavaScript — REST API, WebSocket, mikroserwisy. Buduję szybkie i skalowalne serwery z Express, Fastify i edge runtime.",
    cardBg: "rgba(245, 250, 245, 0.89)",
    accent: "#68a063",
  },
];
