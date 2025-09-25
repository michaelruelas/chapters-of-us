'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const PhotoDeck = ({ visible = false, images, caption, className = '' }) => {
  const cardCount = images.length;

  // Define positions, scales, rotations based on count
  const getLayoutProps = (index) => {
    const baseWidth = 350;
    const baseHeight = 450;
    let x, y, scale, rotate, zIndex, transform;

    y = '0%'; // No top offset

    if (cardCount === 2) {
      scale = 0.9;
      if (index === 0) {
        x = '20%';
        rotate = -3;
        zIndex = 1;
        transform = 'translateX(15%) translateY(50%)';
      } else {
        x = '80%';
        rotate = 3;
        zIndex = 2;
        transform = 'translateX(-15%) translateY(50%)';
      }
    } else if (cardCount === 3) {
      if (index === 0) { // Left
        x = '15%';
        scale = 0.8;
        rotate = -3;
        zIndex = 1;
        transform = 'translateX(25%) translateY(40%)';
      } else if (index === 1) { // Center
        x = '50%';
        scale = 1.0;
        rotate = 0;
        zIndex = 3;
        transform = 'translateX(0%) translateY(50%)';
      } else { // Right
        x = '85%';
        scale = 0.8;
        rotate = 3;
        zIndex = 2;
        transform = 'translateX(-25%) translateY(40%)';
      }
    } else {
      // Fallback for 1 or >3: centered
      x = '50%';
      scale = 0.9;
      rotate = 0;
      zIndex = cardCount - index;
      transform = 'translateX(0%) translateY(50%)';
    }

    return {
      x,
      y,
      width: `${baseWidth * scale}px`,
      height: `${baseHeight * scale}px`,
      scale,
      rotate,
      zIndex,
      transform,
    };
  };

  const containerVariants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const cardVariants = {
    initial: {
      y: -150,
      opacity: 0,
      scale: 1.4,
      rotate: 0,
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: getLayoutProps(i).rotate,
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
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
      variants={containerVariants}
      initial="initial"
      animate={visible ? "visible" : "initial"}
      transition={{ duration: 0.3 }}
    >
      {images.map((src, i) => {
        const { x, y, width, height, scale, rotate, zIndex, transform } = getLayoutProps(i);

        return (
          <motion.div
            key={i}
            className="absolute polaroid"
            style={{
              left: x,
              top: y,
              width,
              height,
              zIndex,
              transformOrigin: 'center center',
              transform,
            }}
            variants={cardVariants}
            custom={i}
            initial="initial"
            animate={visible ? "visible" : "initial"}
          >
            <div className="relative w-full h-full border-8 border-white border-b-16 rounded shadow-2xl bg-white">
              <Image
                src={src}
                alt={`${caption} - ${i + 1}`}
                fill
                className="object-cover rounded"
                priority={i === 0}
              />
            </div>
            <p className="caption mt-2 text-center font-dancing-script text-xl">{caption}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PhotoDeck;