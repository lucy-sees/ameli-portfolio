"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAgent } from "@/context/AgentContext";
import { useVoiceAgent } from "./useVoiceAgent";

const SUGGESTIONS = [
  "Show award-winning UX work",
  "Activate recruiter mode",
  "Show client list",
  "Highlight featured projects",
];

export default function CommandCenter() {
  const { state, dispatch, sendMessage } = useAgent();
  const [input, setInput] = useState("");
  const [localMessage, setLocalMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Voice agent
  const { voiceState, isSupported, toggle: toggleVoice } = useVoiceAgent({
    onResult: (transcript) => {
      setInput(transcript);
      handleSubmit(transcript);
    },
  });

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_COMMAND_CENTER" });
      }
      if (e.key === "Escape") dispatch({ type: "CLOSE_COMMAND_CENTER" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  // Auto-focus input when opened
  useEffect(() => {
    if (state.commandCenterOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state.commandCenterOpen]);

  // Show last agent message in panel
  useEffect(() => {
    if (state.lastResponse?.message) {
      setLocalMessage(state.lastResponse.message);
    }
  }, [state.lastResponse]);

  const handleSubmit = useCallback(async (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;
    setInput("");
    await sendMessage(msg);
  }, [input, sendMessage]);

  if (!state.commandCenterOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={() => dispatch({ type: "CLOSE_COMMAND_CENTER" })}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
        style={{ animation: "commandSlide 0.25s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        {/* Glass card with animated gradient border */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,255,65,0.15), rgba(147,51,234,0.15), rgba(0,255,65,0.05))", padding: "1px" }}
        >
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ background: "linear-gradient(90deg, #00FF41, #9333ea, #00FF41)", backgroundSize: "200% 100%", animation: "borderSlide 3s linear infinite", opacity: 0.6 }}
          />

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "rgba(5,5,5,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            {/* Header */}
            <div className="px-6 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                {/* Status dot */}
                <div className="relative flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${state.isStreaming ? "bg-[#00FF41]" : "bg-[#9333ea]"}`} />
                  {state.isStreaming && (
                    <div className="absolute inset-0 rounded-full bg-[#00FF41] animate-ping opacity-75" />
                  )}
                </div>

                {/* Greeting / streaming message */}
                <p className="text-xs font-mono tracking-widest uppercase text-white/40">
                  {state.isStreaming
                    ? "Processing intent..."
                    : localMessage || state.greeting}
                </p>

                <div className="ml-auto flex items-center gap-2">
                  {/* Recruiter mode badge */}
                  {state.recruiterMode && (
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20">
                      Recruiter
                    </span>
                  )}
                  <span className="text-[10px] text-white/20 font-mono">ESC to close</span>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="flex items-center gap-3 px-6 py-4">
              <span className="text-[#00FF41] font-mono text-sm flex-shrink-0">›</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Ask anything about the portfolio..."
                className="flex-1 bg-transparent text-white placeholder:text-white/20 font-mono text-sm outline-none"
                autoComplete="off"
                spellCheck={false}
              />

              {/* Streaming indicator */}
              {state.isStreaming && (
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full bg-[#00FF41]"
                      style={{ animation: `bounce 0.9s ${i * 0.15}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
              )}

              {/* Voice button */}
              {isSupported && (
                <button
                  onClick={toggleVoice}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    voiceState === "listening"
                      ? "bg-[#00FF41]/20 border border-[#00FF41] text-[#00FF41]"
                      : "bg-white/5 border border-white/10 text-white/40 hover:text-white/80"
                  }`}
                  title={voiceState === "listening" ? "Stop listening" : "Start voice command"}
                >
                  <span className="material-symbols-outlined text-base">
                    {voiceState === "listening" ? "stop" : "mic"}
                  </span>
                </button>
              )}

              {/* Submit */}
              <button
                onClick={() => handleSubmit()}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/30 flex items-center justify-center text-[#00FF41] hover:bg-[#00FF41]/20 transition-all"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

            {/* Suggestions */}
            {!state.isStreaming && (
              <div className="px-6 pb-5">
                <p className="text-[10px] uppercase tracking-widest text-white/20 font-mono mb-3">Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); handleSubmit(s); }}
                      className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Streamed response display */}
            {state.streamedText && state.isStreaming && (
              <div className="px-6 pb-5 border-t border-white/5">
                <p className="text-xs font-mono text-[#9333ea]/80 mt-3 leading-relaxed break-all">
                  {state.streamedText}
                  <span className="inline-block w-1.5 h-3 bg-[#9333ea] ml-0.5 animate-pulse" />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes commandSlide {
          from { opacity: 0; transform: translate(-50%, -52%) scale(0.97); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes borderSlide {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
