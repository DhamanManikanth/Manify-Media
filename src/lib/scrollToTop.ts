"use client";

/**
 * Universal Smooth Scroll to Top
 * Reliably scrolls to the top of the page across all browsers,
 * routes, hash anchors, and integrates seamlessly with Lenis smooth scroll.
 */
export function scrollToTop() {
  if (typeof window === "undefined") return;

  // Check if Lenis instance is attached to window
  const w = window as unknown as { __lenis?: { scrollTo: (target: number, opts?: object) => void } };
  
  if (w.__lenis && typeof w.__lenis.scrollTo === "function") {
    w.__lenis.scrollTo(0, { immediate: false, duration: 1.2 });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}

