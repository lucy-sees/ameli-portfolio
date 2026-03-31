"use client";

import { useAgent } from "@/context/AgentContext";

export default function CommandTrigger() {
  const { dispatch, state } = useAgent();

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_COMMAND_CENTER" })}
      className="fixed bottom-8 right-8 z-30 group flex items-center gap-3"
      aria-label="Open Command Center"
    >
      {/* Pill hint */}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-mono text-white/40 uppercase tracking-widest">
        ⌘K
      </span>

      {/* Orb */}
      <div className="relative w-14 h-14">
        {/* Outer ring pulse */}
        <div className={`absolute inset-0 rounded-full ${state.isStreaming ? "bg-[#00FF41]/20 animate-ping" : "bg-[#9333ea]/10"}`} />
        {/* Inner button */}
        <div
          className="absolute inset-1 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: "linear-gradient(135deg, #00FF41, #9333ea)", boxShadow: "0 0 24px rgba(0,255,65,0.3)" }}
        >
          <span className="material-symbols-outlined text-black text-xl">
            {state.isStreaming ? "autorenew" : "auto_awesome"}
          </span>
        </div>
      </div>
    </button>
  );
}
