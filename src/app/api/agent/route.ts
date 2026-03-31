import { NextRequest, NextResponse } from "next/server";
import { geminiFlash } from "@/lib/geminiClient";
import { buildIntentPrompt, AgentResponse } from "@/lib/intentParser";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json() as { message: string; context: string };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const prompt = buildIntentPrompt(message, context ?? "unknown");

    // Streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await geminiFlash.generateContentStream(prompt);
          let fullText = "";

          for await (const chunk of result.stream) {
            const text = chunk.text();
            fullText += text;
            controller.enqueue(encoder.encode(text));
          }

          // Validate JSON before closing
          try {
            JSON.parse(fullText) as AgentResponse;
          } catch {
            // If not valid JSON, send fallback
            const fallback: AgentResponse = {
              intent: "unknown",
              target: "",
              tone: "neutral",
              confidence: 0.1,
              animation: "fade",
              priority: "low",
              message: "I couldn't quite catch that — try asking about projects, experience, or awards.",
            };
            controller.enqueue(encoder.encode(JSON.stringify(fallback)));
          }

          controller.close();
        } catch (err) {
          console.error("[AgentRoute] Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[AgentRoute] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
