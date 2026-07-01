'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const BASE_WIDTH = 350;
const BASE_HEIGHT = 450;

const LAYOUTS = {
  2: [
    { x: '30%', rotate: -3, zIndex: 1, scale: 0.9, transform: 'translateX(15%) translateY(50%)' },
    { x: '50%', rotate: 3, zIndex: 2, scale: 0.9, transform: 'translateX(-15%) translateY(50%)' },
  ],
  3: [
    {
      x: '22%',
      y: '5%',
      scale: 0.8,
      rotate: -3,
      zIndex: 1,
      transform: 'translateX(25%) translateY(40%)',
    },
    { x: '40%', scale: 1.0, rotate: 0, zIndex: 3, transform: 'translateX(0%) translateY(50%)' },
    {
      x: '64%',
      y: '8%',
      scale: 0.8,
      rotate: 3,
      zIndex: 2,
      transform: 'translateX(-25%) translateY(40%)',
    },
  ],
};

function getLayoutProps(index, count) {
  const preset = LAYOUTS[count]?.[index];
  if (preset) {
    const scale = preset.scale ?? 0.9;
    return {
      x: preset.x,
      y: preset.y ?? '10%',
      scale,
      rotate: preset.rotate ?? 0,
      zIndex: preset.zIndex,
      transform: preset.transform,
      width: BASE_WIDTH * scale,
      height: BASE_HEIGHT * scale,
    };
  }
  return {
    x: '50%',
    y: '10%',
    scale: 0.9,
    rotate: 0,
    zIndex: count - index,
    transform: 'translateX(0%) translateY(50%)',
    width: BASE_WIDTH * 0.9,
    height: BASE_HEIGHT * 0.9,
  };
}

export default function PhotoDeck({ images, caption, className = '' }) {
  if (!images?.length) return null;
  const cardCount = images.length;

  const cardVariants = {
    initial: { opacity: 0, scale: 1.4 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        delay: i * 0.2,
        duration: 0.8,
      },
    }),
  };

  return (
    <motion.div
      className={`relative flex h-screen w-full items-center justify-center ${className}`}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3 }}
    >
      {images.map((src, i) => {
        const { x, y, width, height, zIndex } = getLayoutProps(i, cardCount);

        return (
          <motion.div
            key={src}
            className="polaroid absolute"
            style={{
              left: x,
              top: y,
              width,
              height,
              zIndex,
              transformOrigin: 'center center',
            }}
            variants={cardVariants}
            custom={i}
          >
            <div className="relative h-full w-full rounded border-8 border-b-16 border-white bg-white">
              <Image
                src={src}
                alt={`${caption} - ${i + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 350px"
                className="rounded object-cover"
                priority={i === 0}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
