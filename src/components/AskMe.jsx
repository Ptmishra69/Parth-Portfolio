import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, ArrowLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const CONTEXT = `
Parth Mishra is a B.Tech Computer Engineering student at GNIOT (2023-Present) with a GPA of 7.3.
He is currently the Team Lead at Fluxypy (since March 2026), leading the development of EduFlux ERP.

Key Projects:
- Credex: AI-powered SaaS spend audit platform that helps founders monitor tool usage, estimate future costs, and optimize cloud expenditures. Built with Next.js. Live at credex on Vercel.
- Singularity Protocol (Dotsplays): A high-performance digital display platform featuring cinematic WebGL visuals, scroll-driven interactions, and immersive brand storytelling. Built with Next.js, WebGL, and GSAP. Live at dotsplays.vercel.app.
- Agri-Ved (Smart Advisory System for Farmers): Built with RASA, ML models, Flask, and SQLite for SIH 2025.
- DriveSphere-AI (Autonomous Predictive Maintenance): Built with n8n, Express.js, and telematics data for EY Techathon 6.0 (Semi-Finalist).
- Discord Clone: A full-stack Discord clone featuring real-time messaging, server management, and the iconic landing page. Built with React, Tailwind CSS, and Socket.io.
- Razorpay Clone: A pixel-perfect landing page clone of Razorpay with precision UI components, sleek animations, and an automated payroll dashboard. Built with HTML, Tailwind CSS, and JavaScript.

Skills:
- Languages: Python3, C, C++17, JavaScript.
- Frontend: HTML, CSS, Tailwind CSS, React, Next.js, Redux.
- Backend: Node.js, Express.js, Flask, REST APIs, JWT, Axios.
- Databases: MongoDB, Mongoose, MongoDB Atlas, SQLite, SQL.
- Tools: Git, GitHub, VS Code, Postman, n8n.
- Competitive Programming: 150+ LeetCode (1500 rating), 200+ CodeChef.

Contact: parth55mishr@gmail.com | LinkedIn: Parth Mishra | GitHub: Ptmishra69
`;

export default function AskMe() {
  const { mode, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm Parth's AI assistant. Ask me anything about his projects, skills, or experience!" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const userQuery = input;
    setInput("");
    setIsTyping(true);

    const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

    // Try these models in order — first one that responds wins
    const MODELS = [
      "mistralai/Mistral-7B-Instruct-v0.2",
      "microsoft/Phi-3.5-mini-instruct",
      "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
      "gpt2",
    ];

    for (const model of MODELS) {
      try {
        console.log("Trying model:", model);
        const res = await fetch(`/api-hf/${model}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `You are Parth Mishra's AI portfolio assistant. Use this context:\n${CONTEXT}\n\nQuestion: ${userQuery}\nAnswer concisely:`,
            parameters: { max_new_tokens: 200, return_full_text: false },
            options: { wait_for_model: true },
          }),
        });

        if (!res.ok) {
          console.warn(`Model ${model} returned ${res.status}, trying next...`);
          continue; // try next model
        }

        const data = await res.json();
        console.log("Success with model:", model, data);

        let text = "";
        if (Array.isArray(data) && data[0]?.generated_text) {
          text = data[0].generated_text.trim();
        } else if (data?.generated_text) {
          text = data.generated_text.trim();
        }

        if (text) {
          setMessages((prev) => [...prev, { role: "bot", content: text }]);
          setIsTyping(false);
          return; // done!
        }
      } catch (err) {
        console.warn(`Model ${model} failed:`, err.message);
        continue; // try next model
      }
    }

    // If ALL models failed, use local keyword fallback
    console.log("All HF models failed, using local fallback");
    const fallback = getLocalResponse(userQuery);
    setMessages((prev) => [...prev, { role: "bot", content: fallback }]);
    setIsTyping(false);
  };

  /* ===== Local keyword fallback ===== */
  const getLocalResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("project") || q.includes("build") || q.includes("made"))
      return "Parth has built Credex (AI spend audit SaaS), Singularity Protocol (cinematic WebGL platform), Agri-Ved (AI for farmers using RASA), DriveSphere-AI (predictive vehicle maintenance with n8n), a Discord Clone (full-stack real-time messaging), and a Razorpay Clone (pixel-perfect UI).";
    if (q.includes("credex") || q.includes("spend") || q.includes("audit"))
      return "Credex is an AI-powered SaaS spend audit platform that helps founders monitor tool usage, estimate future costs, and optimize cloud expenditures through intelligent analytics. Built with Next.js.";
    if (q.includes("singularity") || q.includes("dotsplays") || q.includes("webgl"))
      return "Singularity Protocol (Dotsplays) is a high-performance digital display platform featuring cinematic WebGL visuals and fluid, scroll-driven interactions for immersive brand storytelling. Built with Next.js, WebGL, and GSAP.";
    if (q.includes("discord"))
      return "Parth built a full-stack Discord Clone featuring real-time messaging, server management, and the iconic 'Imagine a Place' landing page. Built with React, Tailwind CSS, and Socket.io.";
    if (q.includes("razorpay"))
      return "Parth built a pixel-perfect Razorpay Clone focusing on precision UI components, sleek animations, and an automated payroll dashboard. Built with HTML, Tailwind CSS, and JavaScript.";
    if (q.includes("skill") || q.includes("stack") || q.includes("tech"))
      return "Parth's stack: React, Next.js, Tailwind (Frontend) | Node.js, Express, Flask (Backend) | MongoDB, SQL (DB) | Python, C++, JS (Languages) | n8n, Git, Postman (Tools).";
    if (q.includes("experience") || q.includes("work") || q.includes("job"))
      return "Parth is currently Team Lead at Fluxypy (Mar 2026–Present), driving the development of EduFlux ERP — a comprehensive education management platform.";
    if (q.includes("education") || q.includes("college") || q.includes("degree"))
      return "B.Tech in Computer Engineering at GNIOT (2023–Present) with a 7.3 GPA. Semi-finalist at EY Techathon 6.0 and cleared SIH internal rounds.";
    if (q.includes("leetcode") || q.includes("codechef") || q.includes("competitive") || q.includes("cp"))
      return "150+ problems on LeetCode (1500 contest rating) and 200+ problems on CodeChef. Strong in DSA and OOP.";
    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire"))
      return "Reach Parth at parth55mishr@gmail.com. Find him on LinkedIn and GitHub (@Ptmishra69).";
    if (q.includes("hello") || q.includes("hi") || q.includes("hey"))
      return "Hey there! 👋 I'm Parth's AI assistant. Ask me about his projects, skills, experience, or anything else!";
    return "I can tell you about Parth's projects, tech stack, experience, education, or competitive programming stats. What would you like to know?";
  };

  return (
    <>
      {/* Floating Toggle Button — smaller on mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 rounded-full shadow-2xl flex items-center justify-center"
        style={{
          background: mode === "dark" ? `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` : theme.accent,
          color: "white",
          display: isOpen ? "none" : "flex",
        }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-50 overflow-hidden flex flex-col
              top-[68px] left-0 right-0 bottom-0
              sm:inset-auto
              sm:bottom-8 sm:right-8
              sm:w-[400px] sm:h-[520px]
              sm:rounded-2xl
              shadow-2xl
            "
            style={{
              background: theme.bg,
              border: `1px solid ${mode === "dark" ? theme.accent2 : theme.soft}`,
              color: theme.text,
              boxShadow: mode === "dark" ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 50px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="p-3 sm:p-4 flex items-center justify-between shrink-0"
              style={{
                background: mode === "dark" ? "rgba(6,18,34,0.9)" : "rgba(255,255,255,0.9)",
                borderBottom: `1px solid ${mode === "dark" ? theme.accent2 : theme.soft}`,
              }}
            >
              <div className="flex items-center gap-3">
                {/* Back arrow on mobile, hidden on desktop */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden p-1.5 rounded-full hover:opacity-70 transition"
                  style={{
                    background: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  }}
                >
                  <ArrowLeft size={20} />
                </button>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="rounded-lg object-contain"
                  style={{
                    width: "32px",
                    height: "32px",
                    flexShrink: 0
                  }}
                />
                <div>
                  <div className="font-bold text-sm">Ask Parth's AI</div>
                  <div className="text-[10px] opacity-60">Online • Resume Powered</div>
                </div>
              </div>
              {/* X button only on desktop */}
              <button onClick={() => setIsOpen(false)} className="hidden sm:block hover:opacity-70 transition p-1">
                <X size={22} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed ${
                      msg.role === "user" ? "rounded-tr-none" : "rounded-tl-none"
                    }`}
                    style={{
                      background: msg.role === "user"
                        ? (mode === "dark" ? theme.accent1 : theme.accent)
                        : mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      color: msg.role === "user" ? "white" : theme.text,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="p-3 rounded-2xl rounded-tl-none animate-pulse flex gap-1 items-center"
                    style={{ background: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                  >
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input — safe area padding on mobile */}
            <div
              className="p-3 sm:p-4 border-t shrink-0"
              style={{
                borderColor: mode === "dark" ? theme.accent2 : theme.soft,
                paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 rounded-full px-4 py-2.5"
                style={{
                  background: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-sm min-w-0"
                  autoComplete="off"
                />
                <button type="submit" className="hover:scale-110 transition text-blue-500 shrink-0">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
