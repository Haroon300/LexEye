import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });          // actual mouse
  const ring = useRef({ x: 0, y: 0 });         // smoothed ring
  const [active, setActive] = useState(true);  // disabled on touch / reduced motion
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReduced) {
      setActive(false);
      return;
    }

    const move = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    // Enlarge ring when hovering interactive elements
    const checkHover = (e) => {
      const target = e.target;
      const interactive =
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });

    // animation loop
    const loop = () => {
      // smooth follow for ring
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      {/* inner dot */}
      <div
        ref={dotRef}
        className={[
          "pointer-events-none fixed left-0 top-0 z-[100] hidden md:block",
          "size-2 rounded-full bg-white mix-blend-difference",
          "transition-transform duration-75",
        ].join(" ")}
        style={{ transform: "translate(-100px,-100px)" }}
      />

      {/* outer ring */}
      <div
        ref={ringRef}
        className={[
          "pointer-events-none fixed left-0 top-0 z-[100] hidden md:block",
          "size-10 -translate-x-1/2 -translate-y-1/2 rounded-full",
          "border border-[#becac8]/70 shadow-[0_0_40px_4px_rgba(233,155,99,0.25)]",
          "backdrop-blur-[2px] transition-all duration-150",
          hovering ? "scale-125 border-[#becac8]" : "scale-100",
          pressed ? "scale-90 opacity-80" : "opacity-100",
        ].join(" ")}
        style={{ transform: "translate(-100px,-100px)" }}
      />
    </>
  );
}
