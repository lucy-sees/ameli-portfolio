"use client";

import { Suspense, lazy, useEffect, useRef } from "react";
import Image from "next/image";
import { useAgent } from "@/context/AgentContext";

// Lazy-load the R3F blob (heavy, SSR-unsafe)
const HeroBlob = lazy(() => import("@/components/3d/HeroBlob"));

function BlobFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-primary-fixed/20 blur-3xl animate-pulse" />
    </div>
  );
}

export default function HeroSection() {
  const { dispatch } = useAgent();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      gsap.set([".gsap-hero-badge", ".gsap-hero-heading", ".gsap-hero-body", ".gsap-hero-cta"], {
        opacity: 0, y: 40,
      });
      gsap.set(".gsap-hero-image", { opacity: 0, x: 60 });
      gsap.set(".gsap-hero-tag", { opacity: 0, x: -40 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".gsap-hero-badge",   { opacity: 1, y: 0, duration: 0.6 })
        .to(".gsap-hero-heading", { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
        .to(".gsap-hero-body",    { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(".gsap-hero-cta",     { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(".gsap-hero-image",   { opacity: 1, x: 0, duration: 0.9 }, "-=0.7")
        .to(".gsap-hero-tag",     { opacity: 1, x: 0, duration: 0.6 }, "-=0.4");
    };
    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-8 pt-20"
    >
      {/* R3F Blob Background */}
      <div className="absolute -z-10 w-[520px] h-[520px] -top-20 -right-20 pointer-events-none">
        <Suspense fallback={<BlobFallback />}>
          <HeroBlob />
        </Suspense>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left */}
        <div className="md:col-span-7 z-10">
          <span className="gsap-hero-badge font-label font-bold uppercase tracking-[0.2em] text-primary-fixed mb-6 block">
            Available for Freelance
          </span>
          <h1 className="gsap-hero-heading font-headline font-black text-7xl md:text-9xl tracking-tighter leading-[0.85] text-inverse-surface mb-8">
            AMELI <br /> NIMBUS
          </h1>
          <p className="gsap-hero-body font-body text-xl md:text-2xl text-secondary max-w-xl mb-10 leading-relaxed">
            A Senior UI/UX Designer &amp; Photographer crafting high-impact digital experiences through a lens of bold editorial minimalism.
          </p>
          <div className="gsap-hero-cta flex gap-4 flex-wrap">
            <button className="bg-primary-fixed text-on-primary-fixed px-10 py-5 rounded-md font-extrabold text-lg uppercase tracking-tight shadow-xl hover:opacity-90 transition-opacity active:scale-95">
              Start a Project
            </button>
            {/* Open agent */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_COMMAND_CENTER" })}
              className="flex items-center gap-2 border border-outline px-8 py-5 rounded-md font-extrabold text-lg uppercase tracking-tight hover:border-primary-fixed hover:text-primary-fixed transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
              Ask AI
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="md:col-span-5 relative group">
          <div className="absolute -inset-4 bg-primary-fixed rounded-xl -rotate-3 transition-transform duration-500 group-hover:rotate-0" />
          <div className="gsap-hero-image relative z-10">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZfYOyQ2T3xmjg2bB3JOwUN4QlKY462YZQyhNZKwG_Q1Q7LDVUqn3PCd3xI9QercgV7OouqxFmbssNFaHpWOzz4C_z7KWjtnQ2TMRcfyxFrSMEA6s7_IXD_A1KLTE14LRn8mmquh7ie0OS5w9R9Ibz5krky3Lv4RxxY48sP_WVHuKpVZDPNFGkbBoEGZtx8AG_6ICmwrgJGCaU-QmOuJcjYSt6xCZSCybWmBdEsLCU9gfZFbNJORz0F_w-G77dkb-n3roBOZUICDS2"
              alt="Ameli Nimbus"
              width={600}
              height={750}
              priority
              className="w-full aspect-[4/5] object-cover rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="gsap-hero-tag absolute bottom-8 -left-12 z-20 bg-inverse-surface text-surface p-6 rounded-lg font-headline font-bold text-2xl rotate-2">
            UI/UX Designer
          </div>
        </div>
      </div>
    </section>
  );
}
