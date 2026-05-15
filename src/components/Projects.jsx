import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, Youtube, ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Projects() {
  const { mode, theme } = useTheme();

  const projects = [
    {
      title: "Credex",
      desc: "AI-powered SaaS spend audit platform that helps founders monitor tool usage, estimate future costs, and optimize cloud expenditures through intelligent analytics.",
      img: "/credex.png",
      github: "https://github.com/Ptmishra69/Credex_Project",
      demo: "https://ai-spend-audit-bps8m7hnn-parths-projects-c00a1171.vercel.app/",
      tags: ["Next.js", "AI Audit", "SaaS", "Financial"],
    },
    {
      title: "Singularity Protocol",
      desc: "A high-performance digital display platform featuring cinematic WebGL visuals and fluid, scroll-driven interactions for immersive brand storytelling.",
      img: "/singularity.png",
      github: "https://github.com/Ptmishra69/dotsplays",
      demo: "https://dotsplays.vercel.app/",
      tags: ["Next.js", "WebGL", "GSAP", "Cinematic"],
    },
    {
      title: "Agri-Ved (Smart Advisory System)",
      desc: "RASA powered AI chatbot for Marginal Farmers using ML models to provide actionable recommendations on fertilizer use and crop viability.",
      img: "/project1.png",
      github: "https://github.com/Ptmishra69/Agri-Ved",
      youtube: "https://youtu.be/JPKJBf0LS2Y?si=XXqFYUn9RyJWlyYB",
      tags: ["RASA", "Flask", "ML", "SQLite"],
    },
    {
      title: "DriveSphere-AI (Predictive Maintenance)",
      desc: "Agentic AI system (n8n + Express.js) for autonomous predictive scheduling and maintenance of vehicles using telematics and sensor data.",
      img: "/project2.png",
      github: "https://github.com/Ptmishra69/DriveSphere-AI",
      youtube: "https://www.youtube.com/watch?v=2djWdxwtMqY",
      tags: ["n8n", "Express.js", "AI Agents", "Node.js"],
    },
    {
      title: "Discord Clone",
      desc: "A full-stack Discord clone featuring real-time messaging, server management, and the iconic 'Imagine a Place' landing page experience.",
      img: "/project3.png",
      github: "https://github.com/Ptmishra69/Discord-Clone",
      tags: ["React", "Tailwind CSS", "Socket.io", "Full Stack"],
    },
    {
      title: "Razorpay Clone",
      desc: "A high-performance landing page clone of Razorpay, focusing on precision UI components, sleek animations, and an automated payroll dashboard.",
      img: "/project4.png",
      github: "https://github.com/Ptmishra69/Razorpay-",
      tags: ["HTML", "Tailwind CSS", "JavaScript", "UI/UX"],
    },
  ];

  /* ===== 3D Tilt Handler (desktop only) ===== */
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = (e) => {
    if (isTouchDevice) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = (e) => {
    if (isTouchDevice) return;
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  /* ===== Stagger Animation ===== */
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="projects"
      className="relative px-5 sm:px-8 md:px-20 lg:px-32 py-16 sm:py-24"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* ===== TITLE ===== */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-14"
        style={{
          color: mode === "dark" ? theme.accent1 : theme.accent,
        }}
      >
        My Projects
      </motion.h2>

      {/* ===== GRID with stagger ===== */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={item}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
            style={{
              background:
                mode === "dark"
                  ? "rgba(6,18,34,0.50)"
                  : "rgba(255,255,255,0.75)",
              border: `1px solid ${
                mode === "dark" ? theme.accent2 : theme.soft
              }`,
              backdropFilter: "blur(14px)",
              transition: "transform 0.2s ease-out, box-shadow 0.35s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* ===== IMAGE ===== */}
            <div className="overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-[200px] sm:h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                style={{
                  filter: "brightness(0.95) contrast(1.05)",
                }}
              />
            </div>

            {/* ===== BLUR OVERLAY ===== */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"
              style={{
                background:
                  mode === "dark"
                    ? "rgba(6,18,34,0.45)"
                    : "rgba(255,255,255,0.40)",
              }}
            />

            {/* ===== LUSTROUS SHINE ===== */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  mode === "dark"
                    ? "radial-gradient(circle at 30% 20%, rgba(68,119,148,0.35), transparent 70%)"
                    : "radial-gradient(circle at 30% 20%, rgba(122,74,0,0.22), transparent 70%)",
              }}
            />

            {/* ===== ICON OVERLAY ===== */}
            <div className="absolute inset-0 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-black/60 backdrop-blur-md hover:scale-110 transition"
                title="View GitHub"
              >
                <Github color="white" />
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-blue-600/80 backdrop-blur-md hover:scale-110 transition"
                  title="Live Demo"
                >
                  <ExternalLink color="white" />
                </a>
              )}

              {project.youtube && (
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-red-600/90 backdrop-blur-md hover:scale-110 transition"
                  title="Watch Video"
                >
                  <Youtube color="white" />
                </a>
              )}
            </div>

            {/* ===== TEXT + TAGS + MOBILE LINKS ===== */}
            <div className="p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
              <p
                className="mt-1.5 sm:mt-2 text-sm leading-relaxed"
                style={{ color: theme.paragraph }}
              >
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium"
                    style={{
                      background:
                        mode === "dark"
                          ? "rgba(68,119,148,0.15)"
                          : "rgba(122,74,0,0.08)",
                      color: mode === "dark" ? theme.accent1 : theme.accent,
                      border: `1px solid ${
                        mode === "dark"
                          ? "rgba(68,119,148,0.25)"
                          : "rgba(122,74,0,0.15)"
                      }`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile action buttons (visible only on small screens) */}
              <div className="flex flex-wrap gap-2 mt-4 sm:hidden">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium transition"
                  style={{
                    background: mode === "dark" ? "rgba(68,119,148,0.2)" : "rgba(122,74,0,0.1)",
                    color: theme.text,
                    border: `1px solid ${mode === "dark" ? "rgba(68,119,148,0.3)" : "rgba(122,74,0,0.2)"}`,
                  }}
                >
                  <Github size={14} /> GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium bg-blue-600/80 text-white transition shadow-lg"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                {project.youtube && (
                  <a
                    href={project.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium bg-red-600/90 text-white transition shadow-lg"
                  >
                    <Youtube size={14} /> Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
