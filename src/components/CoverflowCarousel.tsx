'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
    alt: 'Snowboarder',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    alt: 'Woman',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
    alt: 'Silhouette',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    alt: 'Man',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    alt: 'Portrait',
  },
];

const CARD_WIDTH = 320;
const CARD_HEIGHT = 420;
const SPACING = 280;
const SIDE_SCALE = 0.85;
const SIDE_ROTATE_Y = 20;
const VISIBLE_RANGE = 2;

function getCardProps(offset: number) {
  const isCenter = offset === 0;
  const absOffset = Math.abs(offset);
  const isVisible = absOffset <= VISIBLE_RANGE;

  const x = offset * SPACING;
  const scale = isCenter ? 1 : SIDE_SCALE;
  const rotateY = offset < 0 ? SIDE_ROTATE_Y : offset > 0 ? -SIDE_ROTATE_Y : 0;
  const zIndex = isCenter ? 100 : isVisible ? 50 - absOffset * 10 : 0;
  const opacity = isCenter ? 1 : isVisible ? Math.max(0.5, 0.8 - absOffset * 0.15) : 0;
  const shadow = isCenter
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
    : isVisible
      ? '0 12px 28px -6px rgba(0, 0, 0, 0.2)'
      : 'none';

  return { x, scale, rotateY, zIndex, opacity, shadow, isVisible, isCenter };
}

export default function CoverflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-gradient-to-b from-[#e4e4e4] to-[#c9cbcf] overflow-hidden select-none">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-6 sm:left-10 z-50 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 active:scale-95 active:bg-gray-100 transition-all cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 sm:right-10 z-50 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 active:scale-95 active:bg-gray-100 transition-all cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Carousel Track */}
      <div
        className="relative flex items-center justify-center"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
        }}
      >
        {images.map((image, index) => {
          const offset = index - currentIndex;
          const { x, scale, rotateY, zIndex, opacity, shadow, isVisible, isCenter } =
            getCardProps(offset);

          return (
            <motion.div
              key={image.id}
              className="absolute rounded-xl overflow-hidden"
              animate={{
                x,
                scale,
                rotateY,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              onClick={() => {
                if (!isCenter) setCurrentIndex(index);
              }}
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                zIndex,
                boxShadow: shadow,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                cursor: isCenter ? 'default' : 'pointer',
                filter: isCenter
                  ? 'brightness(1) blur(0px)'
                  : isVisible
                    ? 'brightness(0.8) blur(0px)'
                    : 'brightness(0.6) blur(2px)',
                transition: 'filter 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 flex items-center gap-2.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? 'w-8 h-2.5 bg-gray-700'
                : 'w-2.5 h-2.5 bg-gray-400/60 hover:bg-gray-500/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
