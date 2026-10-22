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
      className="relative mx-auto max-w-7xl px-4 pt-5 sm:px-6 sm:pt-6 md:pt-8"
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
      <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-brand-400/30 shadow-[0_24px_70px_-18px_rgba(194, 82, 31, 0.45)] ring-1 ring-brand-400/20">
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
            {/* Paper-wash overlay so the ink copy reads over any banner art */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-[#fae8d6]/92 via-[#fae8d6]/55 to-[#fae8d6]/20"
            />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_82%_18%,rgba(194, 82, 31, 0.25),transparent)]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#fae8d6]/70 via-transparent to-transparent" />
            {/* Slide copy */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 text-[#2e2117] sm:px-10 lg:px-14">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_0_22px_rgba(194, 82, 31, 0.6)] ring-2 ring-[#e3d2b8]/20">
                {slide.eyebrow}
              </span>
              <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.05] tracking-tight drop-shadow-sm sm:text-5xl">
                {slide.headline}
                <span className="mt-2.5 block text-xl font-bold tracking-tight text-brand-700 drop-shadow-sm sm:text-2xl">{slide.accent}</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#2e2117]/80 drop-shadow-sm">{slide.subtext}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-full bg-gradient-to-r from-brand-600 to-brand-400 px-7 py-3.5 font-black text-[#fff7ed] shadow-[0_12px_28px_-8px_rgba(194, 82, 31, 0.65)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:shadow-none"
                >
                  Shop Now →
                </a>
                <a
                  href="#flash"
                  className="rounded-full border-2 border-[#e3d2b8] bg-[#fdf8f0] px-7 py-3.5 font-bold text-[#a3421a] backdrop-blur-sm transition hover:bg-[#fae8d6] active:scale-[0.98]"
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
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-black text-[#fff7ed] shadow-[0_8px_20px_-6px_rgba(194, 82, 31, 0.6)] transition hover:-translate-y-[calc(50%+2px)] hover:brightness-110 active:translate-y-[-50%] active:shadow-none sm:left-4"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next banner"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-black text-[#fff7ed] shadow-[0_8px_20px_-6px_rgba(194, 82, 31, 0.6)] transition hover:-translate-y-[calc(50%+2px)] hover:brightness-110 active:translate-y-[-50%] active:shadow-none sm:right-4"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Banner slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-10 border border-[#e3d2b8]/30 bg-gradient-to-r from-brand-500 to-[#a3421a]" : "w-2.5 bg-[#3a2417]/20 hover:bg-[#3a2417]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
