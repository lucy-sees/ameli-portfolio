"use client";

import { useEffect } from "react";
import { STATS } from "@/lib/data";

export default function StatsSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".stat-item", {
        opacity: 0, y: 50, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "#stats-section", start: "top 75%" },
      });
    };
    init();
  }, []);

  return (
    <section id="stats-section" className="py-24 px-8 relative overflow-hidden">
      {/* Background stripe */}
      <div className="absolute inset-0 bg-primary-fixed/5 border-y border-primary-fixed/10" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item text-center md:text-left">
            <span className="font-headline font-black text-6xl md:text-8xl block text-primary-fixed mb-2">
              {stat.value}
            </span>
            <span className="font-label text-xs uppercase tracking-[0.3em] text-surface/30">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
