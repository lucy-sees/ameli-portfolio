"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type GSAPCallback = (
  gsap: typeof import("gsap").gsap,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger
) => gsap.core.Timeline | void;

export function useGSAPAnimation(
  callback: GSAPCallback,
  deps: unknown[] = []
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: import("gsap").Context | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        callback(gsap, ScrollTrigger);
      }, ref.current ?? undefined);
    };

    init();

    return () => {
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref as RefObject<HTMLElement | null>;
}
