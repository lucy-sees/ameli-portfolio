"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function AboutSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#about-image", {
        opacity: 0, x: -60, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: "#about", start: "top 65%" },
      });
      gsap.from("#about-content > *", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "#about", start: "top 65%" },
      });
    };
    init();
  }, []);

  return (
    <section className="py-32 px-8 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative" id="about-image">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-full h-full border border-primary-fixed/20 rounded-2xl -z-10" />
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAv7BX2hlGQYZV9Kx6mI3FQL6bkgpXKlYxPCDmBufxMDHdjGO0AWTAEbt_A2jplgydDz1Tr4Yowf1gySXk1yhrSYA7nnVtIiaM148b7QupU-C3bmXgKJWWXRL4B4P45r40iSWCTRSXpUCMwO311G8G74H8Yofm07nNRjDiQvbu2IkqrOnL2C2NhQkh3pLjHJSXs4FcVPFFyn9qPFcdnwJum36RaeLaB0tjM5hpi3eCiQAjJdBQYESPvHePS-Eu_sFP_BW1sOegTv2X"
            alt="Ameli Nimbus Creative"
            width={700}
            height={700}
            className="w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <div id="about-content">
          <span className="font-label font-bold uppercase tracking-widest text-primary-fixed mb-6 block text-sm">
            About Me
          </span>
          <h2 className="font-headline font-black text-5xl md:text-6xl tracking-tighter mb-8 text-surface">
            CREATIVE SOUL. <br />
            <span className="text-stroke-gold">DIGITAL MIND.</span>
          </h2>
          <p className="font-body text-lg text-surface/50 leading-relaxed mb-8">
            Based in Nairobi and working globally, I believe that great design is a dialogue between human needs and technological possibilities. My approach is rooted in the &ldquo;Editorial Minimalist&rdquo; philosophy — removing the noise to amplify the essence.
          </p>
          <p className="font-body text-base text-surface/40 mb-12">
            With over 8 years in the industry, I&apos;ve helped brands transform their digital presence from &ldquo;just functional&rdquo; to &ldquo;emotionally resonant.&rdquo;
          </p>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 shadow-gold">
              <span className="material-symbols-outlined filled text-on-primary-fixed text-2xl">play_arrow</span>
            </div>
            <span className="font-headline font-bold text-lg uppercase tracking-tighter cursor-pointer hover:text-primary-fixed transition-colors text-surface/70">
              Watch Design Philosophy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
