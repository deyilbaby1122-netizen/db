"use client";

import { motion } from "framer-motion";

export function ScreenServices() {
  const services = [
    { title: "Frontend Web Development", desc: "Responsive, interactive React/Next.js applications built to performance and accessibility standards." },
    { title: "Responsive Website Development", desc: "Cross-device, cross-browser websites that look and work beautifully on every screen." },
    { title: "Landing Page Development", desc: "High-converting, conversion-optimised landing pages with clear CTAs and fast load performance." },
    { title: "Website UI/UX Design", desc: "User-centred interfaces with thoughtful layouts, interactions, and design systems." },
    { title: "Graphic Design", desc: "Brand assets, social media graphics, and print-ready visual materials." },
    { title: "Social Media Graphics", desc: "Eye-catching social assets and campaign visuals designed for reach and engagement." },
  ];

  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-widest text-cyan-400"
        >
          Location 5 · Services Building
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-5xl font-bold text-white leading-tight"
        >
          Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-xl text-white/70"
        >
          What I offer — real, no-fluff services
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-white/60 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
