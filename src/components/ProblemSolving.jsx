import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function ProblemSolving() {
  const { mode, theme } = useTheme();

  /* ===== IMAGE PLACEHOLDERS ===== */
  const yearlyImg =
    mode === "dark" ? "/yearly-dark.png" : "/yearly-light.png";

  const contestImg =
    mode === "dark" ? "/contest-dark.png" : "/contest-light.png";

  const solvedImg =
    mode === "dark" ? "/solved-dark.png" : "/solved-light.png";

  /* ===== CARD CONFIG ===== */
  const cards = [
    {
      id: "yearly",
      title: "LeetCode Submission for Year",
      link: "https://leetcode.com/u/parth_mishra_0/",
      image: yearlyImg,
      initial: { x: -120, rotate: -8 },
      hover: { x: -220, scale: 1.5, rotate: -4 },
    },
    {
      id: "contest",
      title: "CodeChef Contest",
      link: "https://www.codechef.com/users/parth_mi",
      image: contestImg,
      initial: { x: 0, rotate: 0 },
      hover: { y: 120, scale: 1.5 },
    },
    {
      id: "solved",
      title: "125 Problems Solved — LeetCode",
      link: "https://leetcode.com/u/parth_mishra_0/",
      image: solvedImg,
      initial: { x: 120, rotate: 8 },
      hover: { x: 220, scale: 1.5, rotate: 4 },
    },
  ];

  const shine =
    mode === "dark"
      ? "rgba(68,119,148,0.55)"
      : "rgba(122,74,0,0.45)";

  return (
    <section
      id="problem"
      className="relative overflow-visible px-8 md:px-20 lg:px-32 py-24"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* ===== BACKGROUND ===== */}
      {mode === "dark" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(68,119,148,0.15), transparent 60%)",
          }}
        />
      )}

      <div className="relative z-10 w-full">

        {/* ===== LEFT ALIGNED TEXT BLOCK ===== */}
        <div className="max-w-[760px] text-left">
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{
              color: mode === "dark" ? theme.accent1 : theme.accent,
            }}
          >
            Problem Solving
          </h2>

          <p
            className="
              text-base md:text-[18px]
              leading-[1.65]
              tracking-[0.01em]
              max-w-[62ch]
            "
            style={{ color: theme.paragraph }}
          >
            I actively practice competitive programming with a strong focus on
            data structures, algorithms, and consistency. Through disciplined
            learning and regular practice, I continuously improve my analytical
            thinking, coding efficiency, and problem-solving approach across
            different platforms.
          </p>
        </div>

        {/* ===== DESKTOP CARD STACK ===== */}
        <div
          className="
            relative mt-16
            hidden md:flex
            justify-center
            items-center
            h-[420px]
          "
        >
          {cards.map((card, i) => (
            <motion.a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={card.initial}
              whileHover={{
                ...card.hover,
                zIndex: 99,
                boxShadow: `0 0 60px ${shine}`,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 16,
                },
              }}
              className="absolute group cursor-pointer"
              style={{ zIndex: 10 + i }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-[320px] rounded-2xl shadow-xl"
              />

              <p
                className="
                  mt-3 text-sm text-center font-medium
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
                style={{ color: theme.paragraph }}
              >
                {card.title}
              </p>

              <div
                className="
                  absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  pointer-events-none
                "
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${shine}, transparent 75%)`,
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* ===== MOBILE STACK ===== */}
        <div className="md:hidden flex flex-col gap-6 mt-10">
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={card.image}
                alt={card.title}
                className="rounded-2xl w-full"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
