"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/products";
import { tk, discountPct } from "@/lib/format";
import ProductImage from "./ProductImage";

type BannerSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  accent: string;
  subtext: string;
  /** Tailwind gradient classes for this slide (emerald / slate / amber family only). */
  bg: string;
  /** Accent pill / badge classes for this slide. */
  pill: string;
  product: Product;
};

const SLIDES: BannerSlide[] = [
  {
    id: "eid-sale",
    eyebrow: "Eid Mega Sale",
    headline: "Save Big This Eid",
    accent: "up to 45% off",
    subtext: "Original gadgets at festival prices across Bangladesh — plus an extra 10% off with code GADZONE10.",
    bg: "from-emerald-700 via-emerald-800 to-slate-950",
    pill: "bg-amber-400 text-slate-950",
    product: PRODUCTS[0],
  },
  {
    id: "flash-deals",
    eyebrow: "Flash Deals · Limited Time",
    headline: "Deals That Won't Wait",
    accent: "ending tonight",
    subtext: "Fresh price drops on the week's most wanted gadgets. When the countdown ends, the prices go back up.",
    bg: "from-amber-500 via-amber-600 to-slate-950",
    pill: "bg-slate-950 text-amber-300",
    product: PRODUCTS[2],
  },
  {
    id: "audio-wearables",
    eyebrow: "Audio & Wearables",
    headline: "Hear More, Wear Smarter",
    accent: "earbuds · watches",
    subtext: "Crisp sound, long battery and comfy fits — earbuds, headphones and smartwatches picked for everyday life.",
    bg: "from-slate-900 via-emerald-900 to-slate-950",
    pill: "bg-emerald-400 text-slate-950",
    product: PRODUCTS[1],
  },
  {
    id: "smart-home-power",
    eyebrow: "Smart Home & Power",
    headline: "A Smarter Home, On Every Charge",
    accent: "smart home · power",
    subtext: "Keep the house connected and every device charged — smart gadgets and power gear that just work.",
    bg: "from-slate-950 via-slate-900 to-emerald-950",
    pill: "bg-amber-400 text-slate-950",
    product: PRODUCTS[10],
  },
];

const AUTO_ADVANCE_MS = 5000;
const DRAG_THRESHOLD = 80;

type BannerCarouselProps = {
  onQuickView?: (product: Product) => void;
};

export default function BannerCarousel({ onQuickView }: BannerCarouselProps) {
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
            className={`grid items-center gap-8 bg-gradient-to-br px-6 py-10 text-white sm:px-10 md:grid-cols-2 md:py-14 ${slide.bg}`}
          >
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide ${slide.pill}`}>
                {slide.eyebrow}
              </span>
              <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                {slide.headline}
                <span className="mt-2 block text-xl font-bold text-amber-300 sm:text-2xl">{slide.accent}</span>
              </h2>
              <p className="mt-4 max-w-md text-base text-slate-200">{slide.subtext}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
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
            <div
              className="group cursor-pointer overflow-hidden rounded-3xl bg-white text-slate-900 shadow-xl"
              onClick={() => onQuickView?.(slide.product)}
              role="button"
              tabIndex={0}
              aria-label={`View ${slide.product.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onQuickView?.(slide.product);
                }
              }}
            >
              <div className="relative">
                <ProductImage product={slide.product} big />
                <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950">
                  -{discountPct(slide.product)}%
                </span>
              </div>
              <div className="p-4">
                <p className="truncate text-base font-bold">{slide.product.name}</p>
                <p className="mt-1 text-lg font-extrabold text-emerald-600">
                  {tk(slide.product.price)}{" "}
                  <span className="text-sm font-medium text-slate-400 line-through">{tk(slide.product.oldPrice)}</span>
                </p>
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
              i === index ? "w-8 bg-emerald-500" : "w-2.5 bg-slate-600 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
