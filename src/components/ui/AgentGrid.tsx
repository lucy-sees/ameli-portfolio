"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAgent } from "@/context/AgentContext";
import { PROJECTS } from "@/lib/data";

// Extend ProjectCard data with priority metadata
interface GridCard {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  featured: boolean;
  colSpan: string;
  tags: string[];
}

const GRID_CARDS: GridCard[] = PROJECTS.map((p, i) => ({
  id: `card-${i}`,
  title: p.title,
  category: p.category,
  src: p.src,
  alt: p.alt,
  featured: i === 0,
  colSpan: p.colSpan,
  tags: [p.category],
}));

export default function AgentGrid() {
  const { state } = useAgent();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (!state.lastResponse || !state.lastResponse.animation || state.lastResponse.animation === "none") return;
    if (state.lastResponse.animation !== "flip") return;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { Flip } = await import("gsap/Flip");
      gsap.registerPlugin(Flip);

      const els = Array.from(cardsRef.current.values());
      if (!els.length) return;

      const flipState = Flip.getState(els);

      // Re-order / highlight based on intent
      const intent = state.lastResponse!.intent;
      els.forEach((el) => {
        el.style.order = "0";
        el.style.opacity = "0.5";
        el.style.transform = "scale(0.97)";
      });

      if (intent === "highlight_featured" || intent === "activate_recruiter_mode") {
        const featured = els.find((el) => el.dataset.featured === "true");
        if (featured) {
          featured.style.order = "-1";
          featured.style.opacity = "1";
          featured.style.transform = "scale(1.02)";
        }
      } else {
        els.forEach((el) => { el.style.opacity = "1"; el.style.transform = "scale(1)"; });
      }

      Flip.from(flipState, {
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        absolute: true,
        onEnter: (el: Element[]) => gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }),
        onLeave: (el: Element[]) => gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.3 }),
      });
    };

    run();
  }, [state.lastResponse]);

  const registerCard = (id: string, el: HTMLElement | null) => {
    if (el) cardsRef.current.set(id, el);
    else cardsRef.current.delete(id);
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
      id="agent-grid"
    >
      {GRID_CARDS.map((card) => (
        <div
          key={card.id}
          ref={(el) => registerCard(card.id, el)}
          data-featured={card.featured}
          data-tags={card.tags.join(",")}
          className={`${card.colSpan} relative group overflow-hidden rounded-xl bg-surface-container-low min-h-[320px] transition-all duration-500`}
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={card.src}
            alt={card.alt}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
            <span className="text-[#feb300] font-label font-bold uppercase tracking-widest text-sm mb-2">
              {card.category}
            </span>
            <h3 className="text-white font-headline font-bold text-3xl md:text-4xl mb-4">
              {card.title}
            </h3>
            {card.featured && (
              <button className="w-fit text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors text-sm">
                View Case Study
              </button>
            )}
          </div>

          {/* Agent priority indicator */}
          {card.featured && state.recruiterMode && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/30 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00FF41]">Featured</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
