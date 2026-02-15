import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import useMagnetic from "@/hooks/useMagnetic";

const roles = [
  "Front End Developer",
  "Problem Solver",
  "LLM Enthusiast",
  "Parth Mishra",
];

export default function Hero() {
  const { mode, theme } = useTheme();
  const { magneticMove, resetMagnetic } = useMagnetic();

  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  const resumeFile = "/Parth_Mishra_Resume.pdf";

  /* ================= Typing Animation ================= */
  useEffect(() => {
    let charIndex = 0;
    const word = roles[index];

    const typing = setInterval(() => {
      setDisplayed(word.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === word.length) {
        clearInterval(typing);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % roles.length);
        }, word === "Parth Mishra" ? 2000 : 1000);
      }
    }, 80);

    return () => clearInterval(typing);
  }, [index]);

  /* ================= Scroll to Contact ================= */
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* ===== DARK ATMOSPHERE ===== */}
      {mode === "dark" && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(68,119,148,0.25), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 80% 70%, rgba(45,91,117,0.25), transparent 60%)",
            }}
          />
        </>
      )}

      {/* ===== CONTENT WRAPPER ===== */}
      <div
        className="
          relative z-10
          min-h-screen
          w-full
          grid grid-cols-1 md:grid-cols-2
          items-center
          gap-14
          px-8 md:px-20 lg:px-32
          py-16
        "
      >
        {/* ================= LEFT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Hello, I&apos;m
          </h1>

          <h2
            className="text-5xl md:text-6xl font-bold mt-3 leading-tight"
            style={
              mode === "dark"
                ? {
                    background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }
                : { color: theme.accent }
            }
          >
            {displayed}
          </h2>

          <p
            className="mt-6 text-base md:text-lg max-w-[640px] mx-auto md:mx-0 leading-relaxed"
            style={{ color: theme.paragraph }}
          >
            Full-Stack Developer and competitive programmer with strong DSA
            fundamentals, experienced in building scalable web applications
            and AI-powered products.
          </p>

          {/* ===== BUTTONS ===== */}
          <div className="flex gap-6 mt-8 justify-center md:justify-start flex-wrap">
            {/* Hire Me */}
            <button
              onClick={scrollToContact}
              onMouseMove={magneticMove}
              onMouseLeave={resetMagnetic}
              className="px-8 py-3 rounded-full text-white font-semibold transition-all"
              style={{
                background:
                  mode === "dark"
                    ? `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`
                    : theme.accent,
              }}
            >
              Hire Me
            </button>

            {/* Download Resume */}
            <a
              href={resumeFile}
              download="Parth_Mishra_Resume.pdf"
              onMouseMove={magneticMove}
              onMouseLeave={(e) => {
                resetMagnetic(e);
                e.currentTarget.style.background = "transparent";
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  mode === "dark"
                    ? `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`
                    : theme.accent;
              }}
              className="px-8 py-3 rounded-full border-2 transition-all hover:text-white inline-flex items-center justify-center"
              style={{
                borderColor: mode === "dark" ? theme.accent1 : theme.accent,
              }}
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.35 }}
          className="flex justify-center"
        >
          <img
            src="/logo2.png"
            alt="profile"
            className="rounded-[30px] w-[320px] sm:w-[360px] md:w-[420px]"
            style={{
              border:
                mode === "dark"
                  ? `3px solid ${theme.accent2}`
                  : `4px solid ${theme.soft}`,
              boxShadow:
                mode === "dark"
                  ? "0 0 35px rgba(68,119,148,0.5)"
                  : "0 0 30px rgba(122,74,0,0.4)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
