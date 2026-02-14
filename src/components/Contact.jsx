import { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function Contact() {
  const { mode, theme } = useTheme();

  /* ===== FORM STATE ===== */
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  /* ===== SUBMIT ===== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please fill out the message first.");
      return;
    }

    const mailto = `mailto:blindshortgamer@gmail.com?subject=${encodeURIComponent(
      subject || "Portfolio Contact"
    )}&body=${encodeURIComponent(
      `From: ${email}\n\n${message}`
    )}`;

    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      className="relative px-8 md:px-20 lg:px-32 py-24 overflow-hidden"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* ===== Cinematic Glow ===== */}
      {mode === "dark" && (
        <div
          className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(68,119,148,0.25), transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* ===== LEFT ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: mode === "dark" ? theme.accent1 : theme.accent,
            }}
          >
            Let&apos;s Connect
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed max-w-[480px]"
            style={{ color: theme.paragraph }}
          >
            I&apos;m currently looking for new opportunities. My inbox is
            always open — whether you have a question or just want to say hi,
            I&apos;ll try my best to get back to you!
          </p>

          {/* SOCIALS */}
          <div className="flex gap-5 mt-6">
            <a href="https://github.com/Ptmishra69" target="_blank" rel="noreferrer">
              <Github size={28} color={theme.text} className="hover:scale-110 transition" />
            </a>

            <a href="https://www.linkedin.com/in/parth-mishra-57334a286" target="_blank" rel="noreferrer">
              <Linkedin size={28} color={theme.text} className="hover:scale-110 transition" />
            </a>

            <a href="https://leetcode.com/u/parth_mishra_0/" target="_blank" rel="noreferrer">
              <SiLeetcode size={28} color={theme.text} className="hover:scale-110 transition" />
            </a>
          </div>
        </motion.div>

        {/* ===== RIGHT FORM ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* EMAIL (BIGGER FIELD) */}
            <div>
              <label className="font-medium">Your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="
                  w-full mt-2 rounded-lg px-4 py-4
                  text-base border outline-none
                "
                style={{
                  background:
                    mode === "dark"
                      ? "rgba(6,18,34,0.45)"
                      : "rgba(255,255,255,0.7)",
                  borderColor:
                    mode === "dark" ? theme.accent2 : theme.soft,
                  color: theme.text,
                }}
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label className="font-medium">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Just saying hi"
                className="w-full mt-2 rounded-lg px-4 py-3 border outline-none"
                style={{
                  background:
                    mode === "dark"
                      ? "rgba(6,18,34,0.45)"
                      : "rgba(255,255,255,0.7)",
                  borderColor:
                    mode === "dark" ? theme.accent2 : theme.soft,
                  color: theme.text,
                }}
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="font-medium">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let's talk about..."
                className="w-full mt-2 rounded-lg px-4 py-3 border outline-none resize-none"
                style={{
                  background:
                    mode === "dark"
                      ? "rgba(6,18,34,0.45)"
                      : "rgba(255,255,255,0.7)",
                  borderColor:
                    mode === "dark" ? theme.accent2 : theme.soft,
                  color: theme.text,
                }}
              />
            </div>

            {/* SEND BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold transition hover:scale-[1.02]"
              style={{
                background:
                  mode === "dark"
                    ? `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`
                    : theme.accent,
              }}
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer
        className="mt-16 border-t pt-6 text-center text-sm"
        style={{
          borderColor: mode === "dark" ? theme.accent2 : theme.soft,
          color: theme.paragraph,
        }}
      >
        All rights reserved © Parth Mishra
      </footer>
    </section>
  );
}
