"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ScreenAbout() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-widest text-blue-400"
        >
          Location 1 · About Me
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-5xl font-bold text-white leading-tight"
        >
          Ashraf
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-xl text-white/70 leading-relaxed"
        >
          Front-End Developer | Web Designer | Graphic Designer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-white/60"
        >
          <span>📍 Hyderabad, Sindh, Pakistan</span>
          <span>✉️ shaikashraf318@icloud.com</span>
          <span>🐙 github.com/deyilbaby1122-netizen</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <h2 className="text-lg font-semibold text-white">About Me</h2>
          <p className="mt-2 text-white/70 leading-relaxed">
            I am a creative and enthusiastic frontend developer, web designer, and graphic
            designer who enjoys building modern, interactive, responsive websites and digital
            experiences.
          </p>
          <p className="mt-2 text-white/70 leading-relaxed">
            I work with frontend technologies, modern web frameworks, UI design, and graphic
            design. I continuously improve my skills by creating real projects and exploring new
            technologies.
          </p>
          <p className="mt-2 text-white/70 leading-relaxed">
            My goal is to transform creative ideas into beautiful, functional, and engaging
            digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="#"
            className="rounded-xl border border-blue-500 px-5 py-2.5 text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition"
          >
            View portfolio
          </Link>
          <a
            href="mailto:shaikashraf318@icloud.com"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 transition"
          >
            Email me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
