import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function GlobalCursorGlow() {
  const { mode } = useTheme();

  const glowRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      if (glowRef.current && mode === "dark") {
        glowRef.current.style.background = `
          radial-gradient(
            circle 320px at ${current.current.x}px ${current.current.y}px,
            rgba(68,119,148,0.28),
            transparent 70%
          )
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, [mode]);

  if (mode !== "dark") return null;

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
