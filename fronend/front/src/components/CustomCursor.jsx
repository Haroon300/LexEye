import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [elementType, setElementType] = useState("default");

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
      setHidden(false);
    };

    const leave = () => setHidden(true);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    // Enhanced hover detection with element type classification
    const checkHover = (e) => {
      const target = e.target;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      
      if (interactive) {
        setHovering(true);
        
        // Determine element type for different cursor styles
        if (target.closest("a")) {
          setElementType("link");
        } else if (target.closest("button")) {
          setElementType("button");
        } else if (target.closest("input, textarea, select")) {
          setElementType("input");
        } else {
          setElementType("interactive");
        }
      } else {
        setHovering(false);
        setElementType("default");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave, { passive: true });
    window.addEventListener("mouseenter", move, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });

    // Smooth animation loop
    const loop = () => {
      // Smooth follow for ring with different speeds based on state
      const smoothness = hovering ? 0.2 : 0.15;
      ring.current.x += (pos.current.x - ring.current.x) * smoothness;
      ring.current.y += (pos.current.y - ring.current.y) * smoothness;

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
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  if (!active) return null;

  const getCursorContent = () => {
    if (elementType === "link") return "🔗";
    if (elementType === "button") return "👆";
    if (elementType === "input") return "✏️";
    return null;
  };

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        initial={{ scale: 0 }}
        animate={{ 
          scale: hidden ? 0 : 1,
          x: pos.current.x,
          y: pos.current.y
        }}
        transition={{ 
          scale: { duration: 0.2 },
          x: { duration: 0 },
          y: { duration: 0 }
        }}
      >
        <div className={[
          "size-2 rounded-full bg-white",
          "transition-all duration-150 ease-out",
          hovering ? "scale-150 bg-cyan-400" : "bg-white",
          pressed ? "scale-75 bg-cyan-300" : "",
        ].join(" ")} />
      </motion.div>

      {/* Outer Ring */}
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        initial={{ scale: 0 }}
        animate={{ 
          scale: hidden ? 0 : 1,
          x: ring.current.x,
          y: ring.current.y
        }}
        transition={{ 
          scale: { duration: 0.3 },
          x: { duration: 0 },
          y: { duration: 0 }
        }}
      >
        <div className={[
          "size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
          "backdrop-blur-sm transition-all duration-300 ease-out",
          "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
          hovering 
            ? "scale-150 border-cyan-400/80 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.5)]" 
            : "scale-100 border-cyan-200/60",
          pressed 
            ? "scale-90 border-cyan-300 bg-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.6)]" 
            : "",
          elementType === "link" ? "border-blue-400/80 bg-blue-400/10" : "",
          elementType === "button" ? "border-green-400/80 bg-green-400/10" : "",
          elementType === "input" ? "border-purple-400/80 bg-purple-400/10" : "",
        ].join(" ")} />
      </motion.div>

      {/* Interactive Element Indicator */}
      <AnimatePresence>
        {hovering && !hidden && (
          <motion.div
            className="pointer-events-none fixed z-[9997] hidden md:block"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: ring.current.x,
              y: ring.current.y
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 25,
              x: { duration: 0 },
              y: { duration: 0 }
            }}
          >
            <div className={[
              "size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border",
              "flex items-center justify-center text-lg",
              "backdrop-blur-md transition-all duration-300",
              "shadow-[0_0_40px_rgba(34,211,238,0.4)]",
              elementType === "link" 
                ? "border-blue-400/30 bg-blue-500/20 text-blue-300" 
                : elementType === "button" 
                ? "border-green-400/30 bg-green-500/20 text-green-300"
                : elementType === "input"
                ? "border-purple-400/30 bg-purple-500/20 text-purple-300"
                : "border-cyan-400/30 bg-cyan-500/20 text-cyan-300",
              pressed ? "scale-90" : "",
            ].join(" ")}>
              {getCursorContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Ripple Effect */}
      <AnimatePresence>
        {pressed && (
          <motion.div
            className="pointer-events-none fixed z-[9996] hidden md:block"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ 
              scale: 2, 
              opacity: 0,
              x: pos.current.x,
              y: pos.current.y
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className={[
              "size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
              elementType === "link" ? "border-blue-400" 
                : elementType === "button" ? "border-green-400"
                : elementType === "input" ? "border-purple-400"
                : "border-cyan-400",
            ].join(" ")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trail Effect (Optional - can be disabled for performance)} */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed left-0 top-0 z-[9995] hidden md:block"
          animate={{
            x: pos.current.x - (index + 1) * 2,
            y: pos.current.y - (index + 1) * 2,
            opacity: 1 - (index + 1) * 0.3
          }}
          transition={{
            x: { duration: 0.1, delay: index * 0.05 },
            y: { duration: 0.1, delay: index * 0.05 },
            opacity: { duration: 0.1, delay: index * 0.05 }
          }}
        >
          <div className="size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/30" />
        </motion.div>
      ))}
    </>
  );
}