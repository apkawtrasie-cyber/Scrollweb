"use client";

import {
  Code2,
  Atom,
  FileType,
  Globe,
  Sparkles,
  Palette,
  Server,
} from "lucide-react";
import type { Skill } from "@/data/skills";
import type { Ref } from "react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Code2, Atom, FileType, Globe, Sparkles, Palette, Server,
};

interface SkillCardProps {
  skill: Skill;
  index: number;
  onClick?: () => void;
  ref?: Ref<HTMLDivElement>;
}

export default function SkillCard({ skill, index, onClick, ref }: SkillCardProps) {
  const Icon = iconMap[skill.icon] || Code2;

  return (
    <div
      ref={ref}
      data-card-id={skill.id}
      onClick={onClick}
      className="skill-card absolute pointer-events-auto cursor-pointer"
      style={{ willChange: "transform" }}
    >
      <div
        className="relative rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col items-center text-center h-full justify-center gap-2"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${skill.accent}40 0%, ${skill.accent}18 50%, transparent 80%), ${skill.cardBg}`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.55)",
          boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 0 40px ${skill.accent}08`,
        }}
      >
        {/* Icon — centered with subtle glow */}
        <div
          className="flex items-center justify-center rounded-xl w-10 h-10 sm:w-11 sm:h-11"
          style={{
            background: `${skill.accent}18`,
            boxShadow: `0 0 20px ${skill.accent}20, 0 0 40px ${skill.accent}10`,
          }}
        >
          <Icon size={20} style={{ color: skill.accent }} />
        </div>

        {/* Title */}
        <h3
          className="font-display uppercase tracking-wider leading-tight text-xs sm:text-sm"
          style={{ color: "#1a1a1a" }}
        >
          {skill.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-[10px] sm:text-[11px] leading-snug font-sans line-clamp-3">
          {skill.description}
        </p>
      </div>
    </div>
  );
}
