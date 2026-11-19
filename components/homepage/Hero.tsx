import React from "react";
import { GalleryCarousel } from "./GalleryCarousel";
import { ArrowRight, Award, BookOpenCheck, Users2 } from "lucide-react";

export function Hero() {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-light/10 text-secondary-light dark:text-secondary-dark text-xs font-bold tracking-wide uppercase border border-secondary-light/20">
              <Award className="w-4 h-4" /> State Government University
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Empowering Minds,{" "}
              <span className="text-primary dark:text-primary-dark">
                Engineering Futures
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Shaheed Bhagat Singh State University (SBSSU) Ferozepur stands as
              a premier beacon of technical education, research excellence, and
              holistic professional development in Punjab.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#admissions"
                className="px-6 py-3 rounded-xl bg-primary dark:bg-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center gap-2"
              >
                Explore Programs <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#notices"
                className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Check Notices
              </a>
            </div>

            {/* Quick Stat Counter Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  100%
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Placement Support
                </p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  50+
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Advanced Labs
                </p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  A+
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Academic Standards
                </p>
              </div>
            </div>
          </div>

          {/* Right Gallery Carousel Column */}
          <div className="lg:col-span-6">
            <GalleryCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
