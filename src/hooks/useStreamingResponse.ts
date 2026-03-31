"use client";

import { useCallback, useRef } from "react";

interface StreamingOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (full: string) => void;
  onError?: (err: Error) => void;
}

export function useStreamingResponse() {
  const abortRef = useRef<AbortController | null>(null);

  const stream = useCallback(async (
    message: string,
    context: string,
    options: StreamingOptions = {}
  ) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error("No stream body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        options.onChunk?.(chunk);
      }

      options.onComplete?.(fullText);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        options.onError?.(err as Error);
      }
    }
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { stream, abort };
}
