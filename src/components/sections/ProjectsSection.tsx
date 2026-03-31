"use client";

import Link from "next/link";
import { useEffect } from "react";
import AgentGrid from "@/components/ui/AgentGrid";

export default function ProjectsSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#projects-header > *", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#projects", start: "top 80%" },
      });
      gsap.from(".gsap-project-card", {
        opacity: 0, y: 60, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#agent-grid", start: "top 75%" },
      });
    };
    init();
  }, []);

  return (
    <section className="py-32 px-8" id="projects">
      <div className="max-w-7xl mx-auto">
        <div id="projects-header" className="mb-20 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-surface/30 block mb-3">
              Selected Works
            </span>
            <h2 className="font-headline font-black text-6xl tracking-tighter text-surface">
              PORTFOLIO
            </h2>
          </div>
          <Link
            href="#"
            className="font-label font-bold uppercase tracking-widest text-surface/40 hover:text-primary-fixed transition-colors text-sm"
          >
            All Case Studies →
          </Link>
        </div>

        {/* AI-powered Flip grid */}
        <AgentGrid />
      </div>
    </section>
  );
}
