"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "200px 0px",
  threshold = 0,
  once = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
