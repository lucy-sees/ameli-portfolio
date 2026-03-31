export type AgentIntent =
  | "navigate_projects"
  | "navigate_awards"
  | "navigate_clients"
  | "highlight_featured"
  | "show_experience"
  | "activate_recruiter_mode"
  | "activate_creative_mode"
  | "unknown";

export type AgentTone = "structured" | "expressive" | "neutral";

export interface AgentResponse {
  intent: AgentIntent;
  target: string;
  tone: AgentTone;
  confidence: number;
  animation: "flip" | "fade" | "scale" | "none";
  priority: "high" | "medium" | "low";
  message: string;
}

export const INTENT_PROMPT = `
You are an AI assistant embedded in a UX/UI designer's portfolio website.
Your job is to interpret visitor intent and return ONLY a valid JSON object (no markdown, no explanation).

Intents available:
- navigate_projects: visitor wants to see portfolio work / projects
- navigate_awards: visitor wants to see awards or recognition
- navigate_clients: visitor wants to see client list or testimonials
- highlight_featured: visitor wants to see the best/featured work
- show_experience: visitor wants to see work history or CV
- activate_recruiter_mode: visitor is recruiting / hiring
- activate_creative_mode: visitor is creative, interested in experimental work
- unknown: catch-all for anything else

Respond ONLY with this JSON shape:
{
  "intent": "<one of the intents above>",
  "target": "<section id to scroll to, e.g. projects, awards, contact>",
  "tone": "<structured | expressive | neutral>",
  "confidence": <0.0-1.0>,
  "animation": "<flip | fade | scale | none>",
  "priority": "<high | medium | low>",
  "message": "<short 1-sentence assistant reply to show to the visitor>"
}

Visitor message: 
`;

export function buildIntentPrompt(userMessage: string, context: string): string {
  return `${INTENT_PROMPT}"${userMessage}"\n\nVisitor context: ${context}`;
}
