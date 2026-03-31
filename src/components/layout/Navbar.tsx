"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useAgent } from "@/context/AgentContext";

export default function Navbar() {
  const { state, dispatch } = useAgent();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-void/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full px-8 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-black tracking-tighter text-surface font-headline uppercase hover:text-primary-fixed transition-colors"
        >
          DESIGNER.UX
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-10 font-headline font-bold tracking-tighter uppercase text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.active
                  ? "text-primary-fixed border-b-2 border-primary-fixed pb-1"
                  : "text-surface/60 hover:text-surface transition-colors duration-300"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Agent trigger pill */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_COMMAND_CENTER" })}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-surface/60 hover:text-agent-green hover:border-agent-green/30 transition-all text-xs font-mono uppercase tracking-widest"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${state.isStreaming ? "bg-agent-green animate-ping" : "bg-agent-green/40"}`} />
            ⌘K
          </button>

          <button className="bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-md font-bold uppercase tracking-tight hover:opacity-80 transition-opacity active:scale-95 text-sm">
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-surface"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-void/98 backdrop-blur-xl border-t border-white/5 px-8 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block font-headline font-bold uppercase tracking-tighter text-lg ${
                link.active ? "text-primary-fixed" : "text-surface/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => { setMenuOpen(false); dispatch({ type: "TOGGLE_COMMAND_CENTER" }); }}
              className="flex items-center justify-center gap-2 py-3 rounded-lg glass text-surface/60 font-mono text-sm uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              Ask AI
            </button>
            <button className="bg-primary-fixed text-on-primary-fixed py-3 rounded-md font-bold uppercase tracking-tight">
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
