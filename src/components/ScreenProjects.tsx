"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  tag: string;
  description: string;
  url: string;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    id: "coffee-shop",
    name: "Coffee Shop",
    tag: "Web App",
    description: "An artisinal coffee house experience — menu, ordering, and a warm, responsive brand site.",
    url: "https://coffeeshop-six-xi.vercel.app/",
    color: "#f59e0b",
  },
  {
    id: "gaming-website",
    name: "Gaming Website",
    tag: "Web App",
    description: "A gaming-focused website with a immersive, high-energy digital presence.",
    url: "https://gamingweb-azure.vercel.app/",
    color: "#ef4444",
  },
  {
    id: "nextnova",
    name: "NextNova",
    tag: "Marketing Site",
    description: "A futuristic brand experiences with a clean, modern layout and modern web stack.",
    url: "https://nextnova-blush.vercel.app/",
    color: "#8b5cf6",
  },
];

export function ScreenProjects() {
  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-widest text-green-400"
        >
          Location 3 · Project Exhibition
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-5xl font-bold text-white leading-tight"
        >
          Project Exhibition
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-xl text-white/70"
        >
          Three real projects, each with a unique 3D display
        </motion.p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden"
            >
              {/* Color band */}
              <div
                className="h-1.5"
                style={{ background: p.color }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/50">{p.tag}</span>
                  <span className="text-xs text-white/40 border border-white/10 rounded-full px-2 py-0.5">
                    {p.id === "coffee-shop" ? "☕" : p.id === "gaming-website" ? "🎮" : "🚀"}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-white">{p.name}</h2>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.description}</p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl border border-white/30 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
                  >
                    View project
                  </a>
                  <Link
                    href="#"
                    className="rounded-xl border border-blue-500 px-3 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition"
                  >
                    Exhibition
                  </Link>
                </div>
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-white/0 transition group-hover:bg-white/5" />
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm text-white/50">
          Each project is shown with a unique 3D display and a working link to the live site.
        </p>
      </div>
    </section>
  );
}
