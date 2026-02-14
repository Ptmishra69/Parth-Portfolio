import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import useMagnetic from "@/hooks/useMagnetic";

export default function About() {
  const [tab, setTab] = useState("skills");
  const { mode, theme } = useTheme();
  const { magneticMove, resetMagnetic } = useMagnetic();

  const tabs = ["skills", "education", "certifications"];

  return (
    <section
      id="about"
      className="relative min-h-screen px-8 md:px-20 lg:px-32 py-24 overflow-hidden"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* ===== Cinematic BG ===== */}
      {mode === "dark" && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 25% 30%, rgba(68,119,148,0.20), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 80% 70%, rgba(45,91,117,0.20), transparent 60%)",
            }}
          />
        </>
      )}

      {/* ===== Reveal Animation ===== */}
      <motion.div
        className="relative z-10 grid md:grid-cols-2 gap-16 items-start"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
      >
        {/* ================= IMAGE ================= */}
        <motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="hidden md:flex justify-center"
>

          <motion.img
            src="/image.png"
            alt="about"
            onMouseMove={magneticMove}
            onMouseLeave={resetMagnetic}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 180, damping: 14 },
            }}
            className="rounded-[28px] w-[360px] md:w-[430px] cursor-pointer"
            style={{
              border:
                mode === "dark"
                  ? `3px solid ${theme.accent2}`
                  : `4px solid ${theme.soft}`,
              boxShadow:
                mode === "dark"
                  ? "0 0 35px rgba(68,119,148,0.45)"
                  : "0 0 30px rgba(122,74,0,0.35)",
            }}
          />
        </motion.div>

        {/* ================= CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: mode === "dark" ? theme.accent1 : theme.accent,
            }}
          >
            About Me
          </h2>

          <div className="max-w-[58ch] mx-auto md:mx-0 space-y-4">
            <p
              className="text-base md:text-[17px] leading-[1.55]"
              style={{ color: theme.paragraph }}
            >
              I’m <b>Parth Mishra</b>, a Computer Engineering student at
              <b> Greater Noida Institute of Technology (GNIOT)</b>. I enjoy
              building scalable applications and solving real-world problems.
            </p>

            <p
              className="text-base md:text-[17px] leading-[1.55]"
              style={{ color: theme.paragraph }}
            >
              I have solved <b>125+ problems on LeetCode</b> and
              <b> 200+ problems on CodeChef</b>, strengthening my analytical
              thinking and problem-solving skills.
            </p>
          </div>

          {/* ===== Tabs ===== */}
          <div className="flex justify-center md:justify-start gap-10 mt-10">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className="relative capitalize font-semibold text-sm md:text-base"
                style={{
                  color:
                    tab === item
                      ? mode === "dark"
                        ? theme.accent1
                        : theme.accent
                      : theme.paragraph,
                }}
              >
                {item}
                {tab === item && (
                  <span
                    className="absolute left-0 -bottom-1 w-full h-[2px]"
                    style={{
                      background:
                        mode === "dark"
                          ? `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`
                          : theme.accent,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ===== Tab Content ===== */}
          <div className="mt-8 min-h-[280px] flex justify-center md:justify-start">
            <AnimatePresence mode="wait">

              {/* SKILLS */}
              {tab === "skills" && (
                <motion.ul
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 text-base leading-[1.55]"
                >
                  <li>• Languages: C, C++, JavaScript, Python</li>
                  <li>• Frontend: React, HTML, CSS, Tailwind</li>
                  <li>• Backend: Flask, REST APIs, SQL</li>
                  <li>• Tools: Git, GitHub, Linux, VS Code</li>
                  <li>• Core Concepts: DSA, OOP</li>
                </motion.ul>
              )}

              {/* EDUCATION */}
              {tab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative pl-10"
                >
                  <div
                    className="absolute left-3 top-0 bottom-0 w-[2px]"
                    style={{
                      background:
                        mode === "dark"
                          ? `linear-gradient(${theme.accent1}, ${theme.accent2})`
                          : theme.accent,
                    }}
                  />

                  <div className="space-y-14">
                    {[
                      {
                        title: "B.Tech — Computer Engineering",
                        desc: "GNIOT, Greater Noida (2023 — Present)",
                      },
                      {
                        title: "Senior Secondary (XII)",
                        desc: "International Hindu School (2021–22)",
                      },
                      {
                        title: "Secondary (X)",
                        desc: "International Hindu School (2019–20)",
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <div
                          className="absolute -left-[19px] top-2 w-4 h-4 rounded-full"
                          style={{
                            background:
                              mode === "dark"
                                ? theme.accent1
                                : theme.accent,
                          }}
                        />
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <p style={{ color: theme.paragraph }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CERTIFICATIONS */}
              {tab === "certifications" && (
                <motion.ul
                  key="certifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 text-base leading-[1.55]"
                >
                  <li>• Introduction to Python — CS50</li>
                  <li>• C/C++ Training — IIT Kanpur</li>
                  <li>• HTML, CSS, JS — Ongoing</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
