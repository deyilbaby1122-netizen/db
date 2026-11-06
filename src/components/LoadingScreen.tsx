"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export function LoadingScreen() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate an asset/load progression
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 6;
      if (p > 90) p = 90;
      setProgress(p);
    }, 200);
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const t = setTimeout(() => setReady(true), 400);
      return () => clearTimeout(t);
    }, 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const progressVal = useMotionValue(progress);
  const scaleX = useSpring(progressVal, { stiffness: 100, damping: 20 });

  return (
    <div className="absolute inset-0 z-[300] flex flex-col items-center justify-center bg-[#0a0e1a] text-white">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      {/* Progress bar */}
      <div className="w-2/3 max-w-md">
        <motion.div
          className="h-1.5 rounded-full bg-white/20 overflow-hidden"
          style={{ transform: scaleX }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ scaleX: scaleX }}
          />
        </motion.div>
      </div>

      <motion.h1
        className="mt-6 text-2xl font-semibold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Loading world…
      </motion.h1>
      <motion.p
        className="text-sm text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {Math.round(progress)}%
      </motion.p>
    </div>
  );
}
