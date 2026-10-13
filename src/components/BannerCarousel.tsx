"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

type BannerSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  accent: string;
  subtext: string;
  /** Local demo banner photo in public/banners/. */
  image: string;
  alt: string;
};

const SLIDES: BannerSlide[] = [
  {
    id: "eid-sale",
    eyebrow: "Eid Mega Sale",
    headline: "Save Big This Eid",
    accent: "up to 45% off",
    subtext: "Original gadgets at festival prices across Bangladesh — plus an extra 10% off with code GADZONE10.",
    image: "/banners/banner-1.jpg",
    alt: "Over-ear headphones on a dark background",
  },
  {
    id: "flash-deals",
    eyebrow: "Flash Deals · Limited Time",
    headline: "Deals That Won't Wait",
    accent: "ending tonight",
    subtext: "Fresh price drops on the week's most wanted gadgets. When the countdown ends, the prices go back up.",
    image: "/banners/banner-2.jpg",
    alt: "Portable power bank",
  },
  {
    id: "audio-wearables",
    eyebrow: "Audio & Wearables",
    headline: "Hear More, Wear Smarter",
    accent: "earbuds · watches",
    subtext: "Crisp sound, long battery and comfy fits — earbuds, headphones and smartwatches picked for everyday life.",
    image: "/banners/banner-3.jpg",
    alt: "Wireless earbuds in their charging case",
  },
  {
    id: "smart-home-power",
    eyebrow: "Smart Home & Power",
    headline: "A Smarter Home, On Every Charge",
    accent: "smart home · power",
    subtext: "Keep the house connected and every device charged — smart gadgets and power gear that just work.",
    image: "/banners/banner-4.jpg",
    alt: "Smart speaker at home",
  },
];

const AUTO_ADVANCE_MS = 5000;
const DRAG_THRESHOLD = 80;

export default function BannerCarousel() {
  const reduce = useReducedMotion();
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number, dir: number) => {
    setIndex(([current]) => {
      const total = SLIDES.length;
      const target = ((next % total) + total) % total;
      return target === current ? [current, 0] : [target, dir];
    });
  }, []);

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // Auto-advance every 5s, unless paused (hover/focus) or reduced motion is preferred.
  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(() => {
      setIndex(([current]) => [(current + 1) % SLIDES.length, 1]);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [index, paused, reduce]);

  const slide = SLIDES[index];

  const variants: Variants = {
    enter: (dir: number) =>
      reduce ? { opacity: 0, x: 0 } : { opacity: 0, x: dir >= 0 ? 80 : -80 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      reduce ? { opacity: 0, x: 0 } : { opacity: 0, x: dir >= 0 ? -80 : 80 },
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <div
      className="relative mx-auto max-w-7xl px-4 pt-6 md:pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured offers"
    >
      <div className="relative overflow-hidden rounded-3xl shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.15 : 0.45, ease: "easeOut" }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -DRAG_THRESHOLD) next();
              else if (info.offset.x > DRAG_THRESHOLD) prev();
            }}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current == null) return;
              const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
              const dx = endX - touchStartX.current;
              if (dx < -DRAG_THRESHOLD) next();
              else if (dx > DRAG_THRESHOLD) prev();
              touchStartX.current = null;
            }}
            className="relative h-[320px] w-full md:h-[440px]"
          >
            {/* Full-bleed banner image */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            {/* Dark gradient overlay for readable text */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-950/10"
            />
            {/* Slide copy */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 text-white sm:px-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold tracking-wide text-slate-950">
                {slide.eyebrow}
              </span>
              <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                {slide.headline}
                <span className="mt-2 block text-xl font-bold text-amber-300 sm:text-2xl">{slide.accent}</span>
              </h2>
              <p className="mt-4 max-w-md text-base text-slate-200">{slide.subtext}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-full bg-violet-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700"
                >
                  Shop Now →
                </a>
                <a
                  href="#flash"
                  className="rounded-full border border-white/40 px-7 py-3.5 font-bold transition hover:bg-white/10"
                >
                  ⚡ Flash Deals
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / next arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous banner"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/60 p-2.5 text-white backdrop-blur transition hover:bg-slate-950/80"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next banner"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/60 p-2.5 text-white backdrop-blur transition hover:bg-slate-950/80"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Banner slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-violet-500" : "w-2.5 bg-slate-600 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
