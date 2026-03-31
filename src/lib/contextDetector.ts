export type VisitorType = "recruiter" | "creative" | "founder" | "unknown";
export type ReferralSource = "linkedin" | "twitter" | "direct" | "portfolio" | "unknown";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface VisitorContext {
  referralSource: ReferralSource;
  visitorType: VisitorType;
  timeOfDay: TimeOfDay;
  recruiterMode: boolean;
}

export function detectReferralSource(searchParams?: URLSearchParams): ReferralSource {
  if (!searchParams) return "direct";
  const ref = searchParams.get("ref")?.toLowerCase() ?? "";
  const utm = searchParams.get("utm_source")?.toLowerCase() ?? "";
  const source = ref || utm;
  if (source.includes("linkedin")) return "linkedin";
  if (source.includes("twitter") || source.includes("x.com")) return "twitter";
  if (source.includes("portfolio")) return "portfolio";
  if (source) return "unknown";
  return "direct";
}

export function detectReferralFromDocument(): ReferralSource {
  if (typeof window === "undefined") return "direct";
  const url = new URL(window.location.href);
  const ref = detectReferralSource(url.searchParams);
  if (ref !== "direct") return ref;
  const referrer = document.referrer;
  if (referrer.includes("linkedin.com")) return "linkedin";
  if (referrer.includes("twitter.com") || referrer.includes("x.com")) return "twitter";
  return "direct";
}

export function detectVisitorType(source: ReferralSource): VisitorType {
  if (source === "linkedin") return "recruiter";
  if (source === "twitter" || source === "portfolio") return "creative";
  return "unknown";
}

export function detectTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function buildContext(ctx: VisitorContext): string {
  return `Source: ${ctx.referralSource}, Type: ${ctx.visitorType}, Time: ${ctx.timeOfDay}, RecruiterMode: ${ctx.recruiterMode}`;
}

export function getGreeting(ctx: VisitorContext): string {
  if (ctx.visitorType === "recruiter" || ctx.recruiterMode) {
    return "Welcome — I've prepared the most relevant work for your evaluation.";
  }
  if (ctx.visitorType === "creative") {
    return "Hey — want to explore some experimental builds?";
  }
  const greetings: Record<TimeOfDay, string> = {
    morning: "Good morning — what can I help you find?",
    afternoon: "Good afternoon — exploring the portfolio?",
    evening: "Good evening — let me guide you through the work.",
    night: "Burning the midnight oil? Let's make it worth it.",
  };
  return greetings[ctx.timeOfDay];
}
