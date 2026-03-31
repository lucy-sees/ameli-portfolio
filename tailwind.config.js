/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Agent / Dark palette ─────────────────────────────────────────
        void:            "#050505",
        "agent-green":   "#00FF41",
        "agent-purple":  "#9333ea",
        "agent-green-dim": "rgba(0,255,65,0.15)",
        "agent-purple-dim": "rgba(147,51,234,0.15)",

        // ── Brand gold ──────────────────────────────────────────────────
        "primary-fixed":     "#feb300",
        "primary-container": "#feb300",
        "primary":           "#7a5400",
        "on-primary":        "#fff1df",
        "on-primary-fixed":  "#372400",
        "primary-fixed-dim": "#eca600",

        // ── Surfaces (light) ────────────────────────────────────────────
        surface:                "#f0ede8",
        "surface-bright":       "#f9f6f5",
        "surface-dim":          "#d6d4d3",
        "surface-container":    "#ebe7e7",
        "surface-container-low": "#f3f0ef",
        "surface-container-high": "#e5e2e1",
        "surface-container-highest": "#dfdcdc",
        "surface-container-lowest": "#ffffff",
        "surface-variant":      "#dfdcdc",

        // ── On-surfaces ─────────────────────────────────────────────────
        "on-surface":         "#0e0e0e",
        "on-surface-variant": "#5c5b5b",
        "inverse-surface":    "#0e0e0e",
        "inverse-on-surface": "#9e9c9c",
        background:           "#050505",
        "on-background":      "#f0ede8",

        // ── Secondary ───────────────────────────────────────────────────
        secondary:              "#8a8888",
        "secondary-container":  "#1a1a1a",
        "on-secondary":         "#f5f2f1",
        "on-secondary-container": "#a0a0a0",

        // ── Outline ─────────────────────────────────────────────────────
        outline:         "#2a2a2a",
        "outline-variant": "#1f1f1f",
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body:     ["var(--font-manrope)", "Manrope", "sans-serif"],
        label:    ["var(--font-manrope)", "Manrope", "sans-serif"],
        mono:     ["JetBrains Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        gold:   "0 0 32px rgba(254,179,0,0.25)",
        green:  "0 0 24px rgba(0,255,65,0.3)",
        purple: "0 0 24px rgba(147,51,234,0.3)",
        glass:  "0 8px 32px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-lines": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-lines": "60px 60px",
      },
    },
  },
  plugins: [],
};
