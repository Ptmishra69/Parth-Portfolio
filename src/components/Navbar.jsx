import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
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

  /* ================= SCROLL TRACKING ================= */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 20);

      // Home active when near top
      if (scrollY < 80) {
        setActive("hero");
        return;
      }

      // Section detection
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
  };

  return (
    <nav
      className="sticky top-0 z-[100] flex justify-between items-center px-8 md:px-16 transition-all duration-300"
      style={{
        color: theme.text,

        /* shrink on scroll */
        paddingTop: scrolled ? "10px" : "18px",
        paddingBottom: scrolled ? "10px" : "18px",
        transform: scrolled ? "translateY(-2px)" : "translateY(0px)",

        /* dynamic background */
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
      {/* ================= LOGO ================= */}
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

      {/* ================= NAV LINKS ================= */}
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

            {/* active underline */}
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

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full border transition-all duration-300"
          style={{ color: theme.text }}
        >
          {mode === "dark" ? "☀" : "🌙"}
        </button>

        <button className="md:hidden">
          <Menu color={theme.text} />
        </button>
      </div>
    </nav>
  );
}
