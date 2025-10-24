import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Color Constants matching your palette */
const COLORS = {
  navy: {
    1: '#0D1B2A',
    2: '#1D2D44',
    3: '#3E5C76',
    4: '#748CAB',
    5: '#F0EBD8'
  }
};

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
        } else if (target.closest("button, [role='button']")) {
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

    // Throttled event listeners for better performance
    let lastMoveTime = 0;
    const throttledMove = (e) => {
      const now = Date.now();
      if (now - lastMoveTime > 16) { // ~60fps
        move(e);
        lastMoveTime = now;
      }
    };

    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("mouseleave", leave, { passive: true });
    window.addEventListener("mouseenter", move, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });

    // Smooth animation loop with performance optimization
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
      window.removeEventListener("mousemove", throttledMove);
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

  const getRingColor = () => {
    switch (elementType) {
      case "link": return COLORS.navy[4];
      case "button": return COLORS.navy[4];
      case "input": return COLORS.navy[4];
      default: return COLORS.navy[4];
    }
  };

  const getRingBackground = () => {
    switch (elementType) {
      case "link": return `${COLORS.navy[4]}15`;
      case "button": return `${COLORS.navy[4]}15`;
      case "input": return `${COLORS.navy[4]}15`;
      default: return `${COLORS.navy[4]}10`;
    }
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
        <div 
          className={[
            "size-2 rounded-full transition-all duration-150 ease-out",
            hovering ? "scale-150" : "",
            pressed ? "scale-75" : "",
          ].join(" ")}
          style={{
            backgroundColor: hovering ? COLORS.navy[4] : COLORS.navy[5],
            boxShadow: hovering ? `0 0 10px ${COLORS.navy[4]}` : "none"
          }}
        />
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
        <div 
          className={[
            "size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 backdrop-blur-sm transition-all duration-300 ease-out",
            hovering ? "scale-150" : "scale-100",
            pressed ? "scale-90" : "",
          ].join(" ")}
          style={{
            borderColor: hovering ? `${getRingColor()}CC` : `${COLORS.navy[4]}99`,
            backgroundColor: getRingBackground(),
            boxShadow: hovering 
              ? `0 0 30px ${getRingColor()}40` 
              : `0 0 20px ${COLORS.navy[4]}20`
          }}
        />
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
            <div 
              className={[
                "size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center text-lg backdrop-blur-md transition-all duration-300",
                pressed ? "scale-90" : "",
              ].join(" ")}
              style={{
                borderColor: `${getRingColor()}30`,
                backgroundColor: `${getRingColor()}15`,
                color: getRingColor(),
                boxShadow: `0 0 40px ${getRingColor()}20`
              }}
            >
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
            <div 
              className="size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                borderColor: getRingColor()
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Trail Effect (Performance Optimized) */}
      {[...Array(2)].map((_, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed left-0 top-0 z-[9995] hidden md:block"
          animate={{
            x: pos.current.x - (index + 1) * 3,
            y: pos.current.y - (index + 1) * 3,
            opacity: 1 - (index + 1) * 0.5
          }}
          transition={{
            x: { duration: 0.2, delay: index * 0.1 },
            y: { duration: 0.2, delay: index * 0.1 },
            opacity: { duration: 0.2, delay: index * 0.1 }
          }}
        >
          <div 
            className="size-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: `${COLORS.navy[4]}30`
            }}
          />
        </motion.div>
      ))}

      {/* Performance monitor (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-[10000] bg-black/80 text-white text-xs p-2 rounded hidden">
          Cursor: {elementType} | Hover: {hovering.toString()} | Hidden: {hidden.toString()}
        </div>
      )}
    </>
  );
}