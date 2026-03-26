"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f9f6f5]/90 shadow-sm backdrop-blur-lg"
          : "bg-[#f9f6f5]/80 backdrop-blur-lg"
      }`}
    >
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-black tracking-tighter text-[#0e0e0e] font-headline uppercase"
        >
          DESIGNER.UX
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-10 font-headline font-bold tracking-tighter uppercase">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.active
                  ? "text-[#feb300] border-b-2 border-[#feb300] pb-1"
                  : "text-[#0e0e0e] hover:text-[#feb300] transition-colors duration-300"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <button className="hidden md:block bg-inverse-surface text-surface px-6 py-2 rounded-md font-bold uppercase tracking-tight hover:opacity-75 transition-opacity active:scale-95">
          Hire Me
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-on-surface"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f9f6f5] border-t border-surface-container px-8 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block font-headline font-bold uppercase tracking-tighter text-lg ${
                link.active ? "text-[#feb300]" : "text-on-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button className="mt-4 bg-inverse-surface text-surface px-6 py-2 rounded-md font-bold uppercase tracking-tight w-full">
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}
