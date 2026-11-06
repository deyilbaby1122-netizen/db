"use client";

import { motion } from "framer-motion";

export function ScreenSkills() {
  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Bootstrap",
    "React",
    "Next.js",
    "Tailwind CSS",
    "UI/UX Design",
    "Figma",
    "Graphic Design",
    "Responsive Web Design",
    "Git",
    "GitHub",
  ];

  return (
    <section id="skills" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-widest text-purple-400"
        >
          Location 2 · Skills City
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-5xl font-bold text-white leading-tight"
        >
          Skills City
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-xl text-white/70"
        >
          My technical toolkit — interactive 3D displays
        </motion.p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
            >
              <span className="text-lg font-semibold text-white">{skill}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-sm text-white/50">
          Interactive 3D skills city — click through to the portfolio sections.
        </p>
      </div>
    </section>
  );
}
