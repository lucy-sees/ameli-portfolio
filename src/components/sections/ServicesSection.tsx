"use client";

import { useEffect } from "react";
import { SERVICES } from "@/lib/data";

export default function ServicesSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#services-header > *", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#services", start: "top 80%" },
      });

      gsap.from(".service-card", {
        opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: "#services-grid", start: "top 75%" },
      });
    };
    init();
  }, []);

  return (
    <section className="py-32 px-8 relative" id="services">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-grid-lines bg-grid-lines opacity-100 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div id="services-header" className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="font-headline font-black text-6xl tracking-tighter text-surface">
            MY EXPERTISE
          </h2>
          <p className="font-body text-lg text-surface/40 max-w-md">
            I merge aesthetics with functionality to create seamless digital journeys across multiple disciplines.
          </p>
        </div>

        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="service-card glass p-10 rounded-2xl group hover:border-primary-fixed/40 hover:shadow-gold transition-all duration-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center mb-8 group-hover:bg-primary-fixed/20 transition-colors">
                <span className="material-symbols-outlined text-primary-fixed text-2xl">
                  {service.icon}
                </span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-surface/30 mb-3 block">
                0{i + 1}
              </span>
              <h3 className="font-headline font-bold text-2xl mb-4 text-surface group-hover:text-primary-fixed transition-colors">
                {service.title}
              </h3>
              <p className="font-body text-surface/50 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
