# Ameli Nimbus Portfolio — Agentic Interface v2

A 2026-level **AI-orchestrated portfolio** built with **Next.js 14**, **Tailwind CSS**, **GSAP Flip**, **React Three Fiber**, and the **Google Gemini API**.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS — dark void palette + glassmorphism |
| AI | Google Gemini 1.5 Flash — streaming intent engine |
| Animation | GSAP 3 + ScrollTrigger + Flip |
| 3D | React Three Fiber + Drei + MeshDistortMaterial |
| Voice | Web Speech API (SpeechRecognition) |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Gemini API key
cp .env.local.example .env.local
# Edit .env.local and set GEMINI_API_KEY

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Agentic Features

### CommandCenter (⌘K)
- Glass UI panel with animated gradient border
- Real-time Gemini streaming response
- Voice input (Web Speech API)
- Context-aware greeting based on referral source

### Intent Engine (`/api/agent`)
Interprets natural language into structured actions:
- `navigate_projects` → scroll to projects
- `navigate_awards` → scroll to awards
- `highlight_featured` → GSAP Flip reorders grid
- `activate_recruiter_mode` → restructures layout for recruiters
- `activate_creative_mode` → expressive tone
- `show_experience` → scroll to experience

### Context Detection
Automatically detects:
- `?ref=linkedin` → activates Recruiter Mode
- Time of day → adjusts greeting
- Session depth → tracks interaction history

### GSAP Flip Grid
Projects grid reorganizes itself based on AI intent using `Flip.from()` — GPU-accelerated, no layout thrashing.

### R3F Hero Blob
- Reacts to mouse velocity
- Reacts to scroll speed
- `MeshDistortMaterial` with dynamic distortion

### Voice Commands
Say any of these:
- *"show awards"*
- *"activate recruiter mode"*
- *"highlight UX work"*
- *"show projects"*
- *"show experience"*

---

## File Structure

```
src/
├── app/
│   ├── api/agent/route.ts      ← Gemini streaming edge route
│   ├── layout.tsx              ← AgentProvider + overlays
│   ├── page.tsx                ← Page with recruiter-mode detection
│   └── globals.css             ← Dark void theme + grain + glass
├── context/
│   └── AgentContext.tsx        ← State machine (intent, tone, session, recruiter)
├── lib/
│   ├── geminiClient.ts         ← Gemini SDK singleton
│   ├── intentParser.ts         ← Intent types + prompt builder
│   └── contextDetector.ts      ← Referral / visitor / time detection
├── hooks/
│   ├── useGSAPAnimation.ts     ← Generic GSAP + ScrollTrigger hook
│   └── useStreamingResponse.ts ← Abort-safe streaming fetch
├── components/
│   ├── agent/
│   │   ├── CommandCenter.tsx   ← Main glass AI panel
│   │   ├── CommandTrigger.tsx  ← Floating orb trigger
│   │   └── useVoiceAgent.ts    ← Web Speech hook
│   ├── 3d/
│   │   └── HeroBlob.tsx        ← R3F blob scene
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── AgentGrid.tsx       ← GSAP Flip grid
│       ├── ServiceCard.tsx
│       ├── SkillBar.tsx
│       └── ProjectCard.tsx
└── lib/
    └── data.ts
```

---

## Recruiter Mode

Visit `/?ref=linkedin` to auto-activate Recruiter Mode:
- Green scan-line appears at top of page
- Layout reorders to surface most relevant work
- Tone shifts to structured/professional
- Featured projects get priority badge

---

## Environment Variables

```env
GEMINI_API_KEY=your_key_here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com/app/apikey)
