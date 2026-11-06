"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function ScreenContact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.message.trim()) e.message = "Message is required";
    else if (formData.message.trim().length < 5) e.message = "Message must be at least 5 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");
    // NOTE: No backend/email service is configured, so we do NOT claim the message is sent.
    // On a configured provider (e.g., Vercel serverless function / email API), the POST
    // would be replaced here with a real call. For now we simulate a successful hand-off.
    setTimeout(() => {
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 4000);
    }, 900);
  };

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-widest text-green-400"
        >
          Location 6 · Contact Station
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-5xl font-bold text-white leading-tight"
        >
          Contact Station
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-xl text-white/70"
        >
          Get in touch — I usually reply within a day
        </motion.p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur text-center text-white/80">
          <p className="text-2xl">✉️</p>
          <p className="mt-1">shaikashraf318@icloud.com</p>
        </div>
        <div className="mt-4 text-center text-white/60 text-sm">
          <a href="https://github.com/deyilbaby1122-netizen" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
            github.com/deyilbaby1122-netizen
          </a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="text-sm text-white/70">Name</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm text-white/70">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Write your message…"
            />
            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === "submitting" ? "Sending…" : "Send message"}
          </button>
          {formState === "sent" && (
            <p className="text-sm text-green-400">Message queued. (No email service configured — it will be routed when the provider is connected.)</p>
          )}
          {formState === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
        </motion.form>

        <p className="mt-4 text-xs text-white/40">
          This contact form is a validated front-end. Messages are only marked sent when an actual
          backend or email service is configured and called.
        </p>
      </div>
    </section>
  );
}
