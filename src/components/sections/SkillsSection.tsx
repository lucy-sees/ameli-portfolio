"use client";

import { useEffect } from "react";
import SkillBar from "@/components/ui/SkillBar";
import { SKILLS } from "@/lib/data";

export default function SkillsSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#skills-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "#skills", start: "top 80%" },
      });
      gsap.from(".gsap-skill-item", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: "#skills-grid", start: "top 75%" },
      });
      document.querySelectorAll<HTMLElement>(".gsap-skill-bar").forEach((bar) => {
        const targetWidth = bar.dataset.width ?? "0%";
        gsap.to(bar, {
          width: targetWidth, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 88%" },
        });
      });
    };
    init();
  }, []);

  const leftSkills = SKILLS.slice(0, 2);
  const rightSkills = SKILLS.slice(2);

  return (
    <section className="py-32 px-8" id="skills">
      <div className="max-w-7xl mx-auto">
        <div id="skills-header" className="text-center mb-24">
          <span className="text-xs font-mono uppercase tracking-widest text-surface/30 block mb-4">Capabilities</span>
          <h2 className="font-headline font-black text-6xl tracking-tighter text-surface mb-4">
            MY ARSENAL
          </h2>
          <div className="w-16 h-px bg-primary-fixed mx-auto" />
        </div>

        <div id="skills-grid" className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-10">
            {leftSkills.map((skill) => <SkillBar key={skill.label} {...skill} />)}
          </div>
          <div className="space-y-10">
            {rightSkills.map((skill) => <SkillBar key={skill.label} {...skill} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
