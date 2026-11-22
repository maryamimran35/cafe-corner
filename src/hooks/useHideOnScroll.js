import { useEffect, useState } from "react";

// Returns true while the page is being scrolled DOWN (the bar should hide).
// Scrolling UP, or being near the top of the page, returns false (the bar should show).
// Tiny movements are ignored so the bar does not flicker.
export function useHideOnScroll(topOffset = 80, threshold = 8) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    function update() {
      const y = window.scrollY;
      const change = y - lastY;
      if (y < topOffset) {
        setHidden(false);
        lastY = y;
      } else if (change > threshold) {
        setHidden(true);
        lastY = y;
      } else if (change < -threshold) {
        setHidden(false);
        lastY = y;
      }
      frame = 0;
    }

    // Work once per animation frame, not on every scroll event
    function onScroll() {
      if (frame === 0) frame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Cleanup: stop listening when the navbar is removed
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [topOffset, threshold]);

  return hidden;
}
