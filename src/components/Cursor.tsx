import { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable custom cursor if fine pointer is available
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth drag action for the ring
    let animationFrameId: number;
    const updateRing = () => {
      const ease = 0.15;
      ringRef.current.x += (position.x - ringRef.current.x) * ease;
      ringRef.current.y += (position.y - ringRef.current.y) * ease;
      setRingPosition({ x: ringRef.current.x, y: ringRef.current.y });
      animationFrameId = requestAnimationFrame(updateRing);
    };
    animationFrameId = requestAnimationFrame(updateRing);

    // Setup hover listeners
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .interactive, input, textarea, select'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    // Initial setup
    addHoverListeners();

    // Re-bind when DOM mutations happen (helps dynamically loaded elements)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [position.x, position.y]);

  // If mobile or no movement yet, do not render or hide
  if (!visible) return null;

  return (
    <>
      {/* Tiny gold dot directly at pointer */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate3d(-50%, -50%, 0)`,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[9999] transition-transform duration-75 mix-blend-screen"
      />

      {/* Larger orbiting gold ring */}
      <div
        style={{
          transform: `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate3d(-50%, -50%, 0) scale(${
            hovered ? 1.8 : 1
          })`,
        }}
        className="fixed top-0 left-0 w-8 h-8 border border-gold/40 rounded-full pointer-events-none z-[9998] transition-transform duration-100 ease-out mix-blend-screen"
      />
    </>
  );
}
