"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceState = "idle" | "listening" | "processing" | "error";

interface UseVoiceAgentOptions {
  onResult: (transcript: string) => void;
  onStateChange?: (state: VoiceState) => void;
}

const COMMAND_MAP: Record<string, string> = {
  "next project": "show me the next project",
  "show awards": "show awards and recognition",
  "show clients": "show client list",
  "activate recruiter mode": "activate recruiter mode",
  "highlight ux work": "highlight UX design work",
  "show experience": "show work experience and history",
  "show projects": "navigate to projects",
  "go home": "go back to home",
};

function normalizeTranscript(raw: string): string {
  const lower = raw.toLowerCase().trim();
  for (const [phrase, mapped] of Object.entries(COMMAND_MAP)) {
    if (lower.includes(phrase)) return mapped;
  }
  return raw;
}

export function useVoiceAgent({ onResult, onStateChange }: UseVoiceAgentOptions) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const setState = useCallback((s: VoiceState) => {
    setVoiceState(s);
    onStateChange?.(s);
  }, [onStateChange]);

  useEffect(() => {
    const SR = (typeof window !== "undefined")
      ? (window.SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition)
      : null;

    if (!SR) return;
    setIsSupported(true);
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const raw = event.results[0][0].transcript;
      onResult(normalizeTranscript(raw));
      setState("processing");
    };

    recognition.onerror = () => setState("error");
    recognition.onend = () => setState("idle");

    recognitionRef.current = recognition;
    return () => recognitionRef.current?.abort();
  }, [onResult, setState]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try { recognitionRef.current.start(); setState("listening"); }
    catch { setState("error"); }
  }, [setState]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setState("idle");
  }, [setState]);

  const toggle = useCallback(() => {
    voiceState === "listening" ? stopListening() : startListening();
  }, [voiceState, startListening, stopListening]);

  return { voiceState, isSupported, toggle };
}
