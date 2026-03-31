"use client";

import { useEffect } from "react";
import { CONTACT_INFO } from "@/lib/data";

export default function ContactSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ scrollTrigger: { trigger: "#contact", start: "top 70%" } });
      tl.from("#contact-left > *", { opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: "power3.out" })
        .from("#contact-form > *", { opacity: 0, x: 40, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.4");
    };
    init();
  }, []);

  return (
    <section className="py-32 px-8" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        {/* Left */}
        <div id="contact-left">
          <span className="font-label font-bold uppercase tracking-widest text-primary-fixed mb-6 block text-sm">
            Get In Touch
          </span>
          <h2 className="font-headline font-black text-5xl md:text-6xl tracking-tighter mb-8 text-surface">
            LET&apos;S BUILD <br />
            <span className="text-stroke-gold">SOMETHING.</span>
          </h2>
          <p className="font-body text-lg text-surface/40 mb-12 leading-relaxed">
            Have a project in mind? I&apos;m always open to discussing product design work or partnership opportunities.
          </p>

          <div className="space-y-6">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary-fixed text-lg">{item.icon}</span>
                </div>
                <div>
                  <p className="font-label font-bold uppercase tracking-widest text-xs text-surface/30 mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-body font-semibold text-surface/80">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div id="contact-form" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {["Name", "Email"].map((f) => (
              <div key={f}>
                <label className="font-label font-bold uppercase tracking-widest text-xs text-surface/30 mb-2 block">{f}</label>
                <input
                  type={f === "Email" ? "email" : "text"}
                  placeholder={f === "Email" ? "your@email.com" : "Your name"}
                  className="w-full glass rounded-xl px-4 py-3 font-body text-surface placeholder:text-surface/20 outline-none focus:border-primary-fixed/50 text-sm transition-colors"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="font-label font-bold uppercase tracking-widest text-xs text-surface/30 mb-2 block">Subject</label>
            <input
              type="text"
              placeholder="Project type / budget"
              className="w-full glass rounded-xl px-4 py-3 font-body text-surface placeholder:text-surface/20 outline-none focus:border-primary-fixed/50 text-sm transition-colors"
            />
          </div>
          <div>
            <label className="font-label font-bold uppercase tracking-widest text-xs text-surface/30 mb-2 block">Message</label>
            <textarea
              rows={6}
              placeholder="Tell me about your project..."
              className="w-full glass rounded-xl px-4 py-3 font-body text-surface placeholder:text-surface/20 outline-none focus:border-primary-fixed/50 text-sm resize-none transition-colors"
            />
          </div>
          <button className="w-full bg-primary-fixed text-on-primary-fixed py-4 rounded-xl font-headline font-bold uppercase tracking-tighter text-base hover:opacity-80 transition-opacity active:scale-[0.99] shadow-gold">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}
