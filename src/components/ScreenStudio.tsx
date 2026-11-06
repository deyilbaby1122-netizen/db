"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ScreenStudio() {
  const interests = [
    { icon: "🎨", title: "Graphic Design", desc: "Designing visual identities, brand assets, and print-ready graphics." },
    { icon: "🖥️", title: "Web / UI Design", desc: "Crafting responsive, accessible, pixel-perfect user interfaces and web layouts." },
    { icon: "🧭", title: "UI/UX Design", desc: "Thinking in user flows, interaction patterns, and human-centred design systems." },
  ];

  return (
    <section id="studio" className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-widest text-amber-400"
        >
          Location 4 · Design Studio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-5xl font-bold text-white leading-tight"
        >
          Design Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-xl text-white/70"
        >
          A creative environment for graphic design, web design, and UI/UX interests
        </motion.p>

        <div className="mt-8 space-y-4">
          {interests.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/60">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href={`/portfolio/studio`}
            className="rounded-xl border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            View studio work
          </Link>
        </div>
        <p className="mt-4 text-sm text-white/50">
          Work samples shown in the studio section (rendered when the page loads its content).
        </p>
      </div>
    </section>
  );
}
