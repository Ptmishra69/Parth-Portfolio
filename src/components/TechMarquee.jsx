import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "JavaScript", icon: "🟨" },
  { name: "Python", icon: "🐍" },
  { name: "C++", icon: "⚡" },
  { name: "Node.js", icon: "🟩" },
  { name: "Express.js", icon: "🚂" },
  { name: "Flask", icon: "🧪" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Tailwind CSS", icon: "💨" },
  { name: "Redux", icon: "🔄" },
  { name: "Git", icon: "🔀" },
  { name: "n8n", icon: "🔗" },
  { name: "Postman", icon: "📮" },
  { name: "SQL", icon: "🗄️" },
  { name: "REST APIs", icon: "🌐" },
];

export default function TechMarquee() {
  const { mode, theme } = useTheme();

  return (
    <section
      className="relative overflow-hidden py-16"
      style={{ background: theme.bg }}
    >
      {/* Section Label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-sm uppercase tracking-[0.2em] font-semibold mb-8"
        style={{ color: mode === "dark" ? theme.accent1 : theme.accent }}
      >
        Tech Stack
      </motion.p>

      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${theme.bg}, transparent)`,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to left, ${theme.bg}, transparent)`,
        }}
      />

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track">
          {[...techStack, ...techStack].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 mx-3 rounded-full border whitespace-nowrap select-none transition-all duration-300 hover:scale-110"
              style={{
                background:
                  mode === "dark"
                    ? "rgba(68,119,148,0.08)"
                    : "rgba(122,74,0,0.06)",
                borderColor:
                  mode === "dark"
                    ? "rgba(68,119,148,0.2)"
                    : "rgba(122,74,0,0.15)",
                color: theme.text,
              }}
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
