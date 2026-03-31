"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { AgentIntent, AgentResponse, AgentTone } from "@/lib/intentParser";
import type { VisitorType, ReferralSource, TimeOfDay } from "@/lib/contextDetector";
import {
  detectReferralFromDocument,
  detectVisitorType,
  detectTimeOfDay,
  getGreeting,
} from "@/lib/contextDetector";

export interface SessionEntry {
  message: string;
  intent: AgentIntent;
  timestamp: number;
}

export interface AgentState {
  referralSource: ReferralSource;
  visitorType: VisitorType;
  timeOfDay: TimeOfDay;
  recruiterMode: boolean;
  interactionDepth: number;
  sessionHistory: SessionEntry[];
  currentIntent: AgentIntent | null;
  currentTone: AgentTone;
  isStreaming: boolean;
  streamedText: string;
  lastResponse: AgentResponse | null;
  greeting: string;
  commandCenterOpen: boolean;
  activeSection: string;
}

type AgentAction =
  | { type: "INIT_CONTEXT"; referralSource: ReferralSource; visitorType: VisitorType; timeOfDay: TimeOfDay; recruiterMode: boolean; greeting: string }
  | { type: "SET_STREAMING"; value: boolean }
  | { type: "APPEND_STREAM"; chunk: string }
  | { type: "CLEAR_STREAM" }
  | { type: "SET_RESPONSE"; response: AgentResponse }
  | { type: "SET_RECRUITER_MODE"; value: boolean }
  | { type: "PUSH_HISTORY"; entry: SessionEntry }
  | { type: "TOGGLE_COMMAND_CENTER" }
  | { type: "CLOSE_COMMAND_CENTER" }
  | { type: "SET_ACTIVE_SECTION"; section: string };

function reducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "INIT_CONTEXT":
      return { ...state, referralSource: action.referralSource, visitorType: action.visitorType, timeOfDay: action.timeOfDay, recruiterMode: action.recruiterMode, greeting: action.greeting, currentTone: action.recruiterMode ? "structured" : "neutral" };
    case "SET_STREAMING":
      return { ...state, isStreaming: action.value };
    case "APPEND_STREAM":
      return { ...state, streamedText: state.streamedText + action.chunk };
    case "CLEAR_STREAM":
      return { ...state, streamedText: "" };
    case "SET_RESPONSE":
      return { ...state, lastResponse: action.response, currentIntent: action.response.intent, currentTone: action.response.tone, isStreaming: false };
    case "SET_RECRUITER_MODE":
      return { ...state, recruiterMode: action.value, currentTone: action.value ? "structured" : state.currentTone };
    case "PUSH_HISTORY":
      return { ...state, sessionHistory: [...state.sessionHistory, action.entry], interactionDepth: state.interactionDepth + 1 };
    case "TOGGLE_COMMAND_CENTER":
      return { ...state, commandCenterOpen: !state.commandCenterOpen };
    case "CLOSE_COMMAND_CENTER":
      return { ...state, commandCenterOpen: false };
    case "SET_ACTIVE_SECTION":
      return { ...state, activeSection: action.section };
    default:
      return state;
  }
}

const initialState: AgentState = {
  referralSource: "direct", visitorType: "unknown", timeOfDay: "morning",
  recruiterMode: false, interactionDepth: 0, sessionHistory: [],
  currentIntent: null, currentTone: "neutral", isStreaming: false,
  streamedText: "", lastResponse: null, greeting: "What can I help you find?",
  commandCenterOpen: false, activeSection: "home",
};

interface AgentContextValue {
  state: AgentState;
  dispatch: React.Dispatch<AgentAction>;
  sendMessage: (msg: string) => Promise<void>;
  activateRecruiterMode: () => void;
}

const AgentContext = createContext<AgentContextValue | null>(null);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const referralSource = detectReferralFromDocument();
    const visitorType = detectVisitorType(referralSource);
    const timeOfDay = detectTimeOfDay();
    const recruiterMode = referralSource === "linkedin";
    const greeting = getGreeting({ referralSource, visitorType, timeOfDay, recruiterMode });
    dispatch({ type: "INIT_CONTEXT", referralSource, visitorType, timeOfDay, recruiterMode, greeting });
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    dispatch({ type: "SET_STREAMING", value: true });
    dispatch({ type: "CLEAR_STREAM" });
    const context = `Source:${state.referralSource},Type:${state.visitorType},Time:${state.timeOfDay},Recruiter:${state.recruiterMode}`;
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context }),
      });
      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        dispatch({ type: "APPEND_STREAM", chunk });
      }
      try {
        const parsed = JSON.parse(fullText);
        dispatch({ type: "SET_RESPONSE", response: parsed });
        if (parsed.intent === "activate_recruiter_mode") dispatch({ type: "SET_RECRUITER_MODE", value: true });
        dispatch({ type: "PUSH_HISTORY", entry: { message, intent: parsed.intent, timestamp: Date.now() } });
        if (parsed.target) {
          const el = document.getElementById(parsed.target);
          if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
        }
      } catch { dispatch({ type: "SET_STREAMING", value: false }); }
    } catch (err) {
      console.error("[AgentContext]", err);
      dispatch({ type: "SET_STREAMING", value: false });
    }
  }, [state.referralSource, state.visitorType, state.timeOfDay, state.recruiterMode]);

  const activateRecruiterMode = useCallback(() => dispatch({ type: "SET_RECRUITER_MODE", value: true }), []);

  return (
    <AgentContext.Provider value={{ state, dispatch, sendMessage, activateRecruiterMode }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be inside AgentProvider");
  return ctx;
}
