'use client';

import { motion } from 'framer-motion';

export default function Landing({ title, subtitle, years, onEnter }) {
  return (
    <section className="landing-screen relative flex h-screen w-full flex-col items-center justify-center p-4 text-center text-[var(--text-gray)]">
      <div className="absolute inset-0 bg-[var(--primary)]/40" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        <h1 className="font-playfair text-5xl font-bold tracking-tight md:text-7xl">{title}</h1>
        <p className="font-dancing-script mt-4 mb-8 text-4xl md:text-6xl">
          {years} {subtitle}
        </p>
        <button
          type="button"
          onClick={onEnter}
          className="rounded-full bg-[var(--primary)] px-8 py-3 font-semibold text-[var(--topcoat-white)] shadow-2xl transition-all duration-300 hover:bg-[var(--primary)]/90 focus:ring-2 focus:ring-[var(--highlight)] focus:outline-none"
        >
          View Our Story
        </button>
      </motion.div>
    </section>
  );
}
