import { motion } from "framer-motion";
import { Github, Youtube } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Projects() {
  const { mode, theme } = useTheme();

  const projects = [
    {
      title: "Agri-Ved",
      desc: "RASA powered AI chatbot Service for Marginal Farmers with Weather Reports and Market Pricing",
      img: "/project1.png",
      github: "https://github.com/Ptmishra69/Agri-Ved",
      youtube: "https://youtu.be/JPKJBf0LS2Y?si=XXqFYUn9RyJWlyYB",
      row: 1,
    },
    {
      title: "DriveSphere-AI",
      desc: "Autonomous Predictive Scheduling and Proactive Maintenance for Automobiles using Agents (n8n+langchain).",
      img: "/project2.png",
      github: "https://github.com/Ptmishra69/DriveSphere-AI",
      youtube: "https://www.youtube.com/watch?v=2djWdxwtMqY",
      row: 1,
    },
    {
      title: "Discord Clone",
      desc: "Built a Discord Clone using js",
      img: "/project3.png",
      github: "https://github.com/Ptmishra69/Discord-Clone",
      row: 2,
    },
    {
      title: "RazorPay Clone",
      desc: "Built a RazorPay clone using Html, Css, Tailwind and Js",
      img: "/project4.png",
      github: "https://github.com/Ptmishra69/Razorpay-",
      row: 2,
    },
  ];

  const glow =
    mode === "dark"
      ? "0 0 40px rgba(68,119,148,0.35)"
      : "0 0 35px rgba(122,74,0,0.25)";

  return (
    <section
      id="projects"
      className="relative px-8 md:px-20 lg:px-32 py-24"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* ===== TITLE ===== */}
      <h2
        className="text-4xl md:text-5xl font-bold text-center mb-14"
        style={{
          color: mode === "dark" ? theme.accent1 : theme.accent,
        }}
      >
        My Projects
      </h2>

      {/* ===== GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.03,
              y: -4,
              boxShadow: glow,
              transition: { duration: 0.35 },
            }}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
            style={{
              background:
                mode === "dark"
                  ? "rgba(6,18,34,0.50)"
                  : "rgba(255,255,255,0.75)",
              border: `1px solid ${
                mode === "dark" ? theme.accent2 : theme.soft
              }`,
              backdropFilter: "blur(10px)",
            }}
          >
            {/* ===== IMAGE ===== */}
            <motion.img
              src={project.img}
              alt={project.title}
              className="w-full h-[250px] object-cover"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.45 }}
              style={{
                filter: "brightness(0.95) contrast(1.05)",
              }}
            />

            {/* ===== BLUR OVERLAY (NOW FOR ALL ROWS) ===== */}
            <div
              className="
                absolute inset-0
                opacity-0 group-hover:opacity-100
                transition-all duration-500
                backdrop-blur-sm
              "
              style={{
                background:
                  mode === "dark"
                    ? "rgba(6,18,34,0.45)"
                    : "rgba(255,255,255,0.40)",
              }}
            />

            {/* ===== LUSTROUS SHINE ===== */}
            <div
              className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition-opacity duration-700
                pointer-events-none
              "
              style={{
                background:
                  mode === "dark"
                    ? "radial-gradient(circle at 30% 20%, rgba(68,119,148,0.35), transparent 70%)"
                    : "radial-gradient(circle at 30% 20%, rgba(122,74,0,0.22), transparent 70%)",
              }}
            />

            {/* ===== ICON OVERLAY ===== */}
            <div
              className="
                absolute inset-0 flex items-center justify-center gap-5
                opacity-0 group-hover:opacity-100
                transition-all duration-500
              "
            >
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="
                  p-3 rounded-full
                  bg-black/60 backdrop-blur-md
                  hover:scale-110 transition
                "
              >
                <Github color="white" />
              </a>

              {/* ONLY FIRST ROW SHOWS YOUTUBE */}
              {project.row === 1 && (
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    p-3 rounded-full
                    bg-red-600/90 backdrop-blur-md
                    hover:scale-110 transition
                  "
                >
                  <Youtube color="white" />
                </a>
              )}
            </div>

            {/* ===== TEXT ===== */}
            <div className="p-5">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p
                className="mt-2 text-sm md:text-base leading-relaxed"
                style={{ color: theme.paragraph }}
              >
                {project.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
