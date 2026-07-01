'use client';

import { motion } from 'framer-motion';
import PhotoDeck from './PhotoDeck';

const BG_PCT_START = 95;
const BG_PCT_STEP = 5;

export default function TimelineEvent({ event, index, registerRef, onEnter }) {
  const bgPct = `${Math.max(BG_PCT_START - (index % 6) * BG_PCT_STEP, 70)}%`;
  const visible = { opacity: 1, y: 0 };
  const hidden = { opacity: 0, y: 40 };

  return (
    <motion.section
      id={event.id}
      ref={registerRef}
      className="timeline-event flex min-h-screen snap-start flex-col items-center justify-center py-12"
      style={{ '--event-bg-pct': bgPct }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => onEnter?.(index)}
      viewport={{ amount: 0.3, once: false }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-8 flex-shrink-0 text-center"
        initial={hidden}
        whileInView={visible}
        viewport={{ amount: 0.3, once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="font-playfair text-4xl font-bold text-[var(--primary)]">{event.title}</h2>
        <h3 className="mt-2 text-xl text-[var(--text-gray)]/70">{event.subtitle}</h3>
        <p className="text-md mt-1 text-[var(--text-gray)]/50">{event.location}</p>
      </motion.div>

      <PhotoDeck images={event.media} caption={event.title} />

      {event.description && (
        <motion.p
          className="mx-auto mt-8 max-w-xl flex-shrink-0 px-4 text-center text-lg leading-relaxed"
          initial={hidden}
          whileInView={visible}
          viewport={{ amount: 0.3, once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {event.description}
        </motion.p>
      )}
    </motion.section>
  );
}
