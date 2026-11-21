"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryCarousel } from "@/lib/actions/gallery";
import type { GalleryItem } from "@/db/schema";

interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

const FALLBACK_SLIDES: CarouselSlide[] = [
  {
    id: "fallback-1",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
    title: "World-Class Academic Blocks",
    subtitle:
      "State-of-the-art engineering laboratories and interactive lecture halls.",
  },
  {
    id: "fallback-2",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    title: "Vibrant Campus Community",
    subtitle:
      "Fostering leadership, technical innovation, and lifelong friendships.",
  },
  {
    id: "fallback-3",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
    title: "Central Library & Resource Hub",
    subtitle:
      "Housing thousands of research journals, books, and digital archives.",
  },
];

function mapItemsToSlides(items: GalleryItem[]): CarouselSlide[] {
  return items.map((item, idx) => ({
    id: item.id || `central-${item.srNo}-${idx}`,
    image: item.path,
    title: item.title || `Slide #${item.srNo}`,
    subtitle: item.desc || "",
  }));
}

export function GalleryCarousel() {
  const [slides, setSlides] = useState<CarouselSlide[]>(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCentralSlides = useCallback(async () => {
    setLoading(true);
    try {
      const items = await getGalleryCarousel("central");
      if (items.length > 0) {
        setSlides(mapItemsToSlides(items));
        setCurrent(0);
      } else {
        setSlides(FALLBACK_SLIDES);
        setCurrent(0);
      }
    } catch (err) {
      console.error("Failed to load central gallery slides:", err);
      setSlides(FALLBACK_SLIDES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCentralSlides();
  }, [loadCentralSlides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl group bg-slate-900">
      {loading && (
        <div className="absolute top-3 left-3 z-20 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-xs">
          Syncing central gallery...
        </div>
      )}

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {slide.title}
            </h3>
            {slide.subtitle && (
              <p className="text-slate-200 text-sm sm:text-base max-w-xl">
                {slide.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 right-6 z-20 flex gap-2">
            {slides.map((slide, idx) => (
              <button
                type="button"
                key={slide.id}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === current
                    ? "w-8 bg-primary dark:bg-primary-dark"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
