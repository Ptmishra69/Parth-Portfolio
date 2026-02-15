import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "problem", label: "Problem Solving" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { mode, theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ================= SCROLL TRACKING ================= */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 20);

      if (scrollY < 80) {
        setActive("hero");
        return;
      }

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const top = el.offsetTop - 140;
        const bottom = top + el.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
          setActive(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= SMOOTH SCROLL ================= */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileOpen(false);
  };

  return (
    <>
      {/* ================= BACKDROP BLUR ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] md:hidden"
            onClick={() => setMobileOpen(false)}
            style={{
              backdropFilter: "blur(10px)",
              background:
                mode === "dark"
                  ? "rgba(0,0,0,0.35)"
                  : "rgba(0,0,0,0.15)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ================= NAVBAR ================= */}
      <nav
        className="sticky top-0 z-[100] transition-all duration-300"
        style={{
          color: theme.text,
          paddingTop: scrolled ? "10px" : "18px",
          paddingBottom: scrolled ? "10px" : "18px",
          transform: scrolled ? "translateY(-2px)" : "translateY(0px)",

          background:
            mode === "dark"
              ? scrolled
                ? "rgba(6,18,34,0.60)"
                : "#061222"
              : scrolled
              ? "rgba(255,248,231,0.75)"
              : "#FFF8E7",

          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "none",
        }}
      >
        {/* ===== TOP BAR ===== */}
        <div className="flex justify-between items-center px-8 md:px-16">

          {/* LOGO */}
          <div
            className="rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300"
            style={{
              width: scrolled ? "44px" : "48px",
              height: scrolled ? "44px" : "48px",
              background:
                mode === "dark"
                  ? "rgba(68,119,148,0.25)"
                  : "#7A4A00",
              color: mode === "dark" ? theme.text : "#fff",
              boxShadow:
                mode === "dark"
                  ? "0 0 18px rgba(68,119,148,0.4)"
                  : "none",
            }}
          >
            PM
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-10 ml-16">
            {sections.map((item) => (
              <span
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative cursor-pointer select-none"
                style={{
                  color:
                    active === item.id
                      ? mode === "dark"
                        ? theme.accent1
                        : theme.accent
                      : theme.text,
                }}
              >
                {item.label}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] transition-all duration-300"
                  style={{
                    width: active === item.id ? "100%" : "0%",
                    background:
                      mode === "dark"
                        ? `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`
                        : theme.accent,
                  }}
                />
              </span>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-full border transition-all duration-300"
              style={{ color: theme.text }}
            >
              {mode === "dark" ? "☀" : "🌙"}
            </button>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X color={theme.text} /> : <Menu color={theme.text} />}
            </button>
          </div>
        </div>

        {/* ===== APPLE FLOATING MENU ===== */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="
                md:hidden
                absolute left-1/2 top-full
                -translate-x-1/2 mt-3
                w-[92%] rounded-2xl
                overflow-hidden z-[120]
              "
              style={{
                background:
                  mode === "dark"
                    ? "rgba(6,18,34,0.75)"
                    : "rgba(255,248,231,0.90)",
                backdropFilter: "blur(18px)",
                boxShadow:
                  mode === "dark"
                    ? "0 18px 40px rgba(0,0,0,0.45)"
                    : "0 18px 35px rgba(0,0,0,0.12)",
                border:
                  mode === "dark"
                    ? `1px solid ${theme.accent2}`
                    : `1px solid ${theme.soft}`,
              }}
            >
              <div className="flex flex-col py-3">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="px-6 py-3 text-left text-base font-medium hover:translate-x-1 transition-all"
                    style={{
                      color:
                        active === item.id
                          ? mode === "dark"
                            ? theme.accent1
                            : theme.accent
                          : theme.text,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
