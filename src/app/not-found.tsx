"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-black via-[#0d1f1e] to-[#103c37] text-white">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />

      {/* Subtle grid overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" aria-hidden>
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-white/80 backdrop-blur"
        >
          <Compass className="h-3.5 w-3.5" />
          You seem off-route
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-6xl font-bold leading-none sm:text-7xl"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-4 max-w-xl text-balance text-base text-white/80 sm:text-lg"
        >
          This page ghosted. The link might be old or the route changed. Let’s get you back to Talmira.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center rounded-2xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 transition"
          >
            <Home className="mr-2 h-4 w-4" />
            Go home
          </Link>

          <Link
            href="/"
            className="inline-flex items-center rounded-2xl bg-white/10 px-5 py-3 text-white hover:bg-white/20 transition"
          >
            <Compass className="mr-2 h-4 w-4" />
            Explore jobs
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center rounded-2xl px-5 py-3 text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Report an issue
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 text-xs text-white/60"
        >
          If you think this is an error, contact support with the URL.
        </motion.p>
      </section>
    </main>
  );
}
