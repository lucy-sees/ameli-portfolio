"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import { useAgent } from "@/context/AgentContext";

export default function Home() {
  const { state } = useAgent();

  // Apply recruiter-mode class to body for the CSS scan-line effect
  useEffect(() => {
    if (state.recruiterMode) {
      document.body.classList.add("recruiter-active");
    } else {
      document.body.classList.remove("recruiter-active");
    }
  }, [state.recruiterMode]);

  return (
    <div className="grain">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
