import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/webhook";

/**
 * Hook that tracks user scroll depth and section visibility.
 * Fires events when users pass scroll milestones and view specific sections.
 */
export function useScrollTracker() {
  const milestones = useRef(new Set<number>());
  const viewedSections = useRef(new Set<string>());

  useEffect(() => {
    // Track scroll depth milestones
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const pct = Math.round((window.scrollY / scrollHeight) * 100);

      for (const mark of [25, 50, 75, 90, 100]) {
        if (pct >= mark && !milestones.current.has(mark)) {
          milestones.current.add(mark);
          trackEvent({
            type: "scroll",
            target: `scroll_depth_${mark}`,
            metadata: { depth: mark },
          });
        }
      }
    }

    // Track section views via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !viewedSections.current.has(id)) {
            viewedSections.current.add(id);
            trackEvent({
              type: "section_view",
              target: id,
              metadata: { sectionId: id },
            });
          }
        }
      },
      { threshold: 0.3 },
    );

    // Observe all sections with id attributes
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);
}

/**
 * Hook that tracks click events on CTA buttons.
 */
export function useClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const btn = target.closest("a[href], button");
      if (!btn) return;

      const label =
        btn.getAttribute("aria-label") ||
        btn.textContent?.trim().slice(0, 50) ||
        "unknown";
      const href = btn.getAttribute("href") || "";

      if (
        href.startsWith("#buy") ||
        href.startsWith("#product") ||
        btn.classList.contains("btn-primary")
      ) {
        trackEvent({
          type: "cta_click",
          target: label,
          metadata: { href, tag: btn.tagName },
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
