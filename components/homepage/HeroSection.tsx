"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HeroSection = ({ gallery }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {gallery.images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            height={1000}
            width={1000}
            src={image.photo.url}
            alt={`Campus ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40"></div>
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to SBSSU
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Shaheed Bhagat Singh State University, Ferozepur - Empowering minds,
            Building futures
          </p>
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg"
          >
            <Bell className="w-5 h-5" />
            View All Notices
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {gallery.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? "bg-orange-600" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
