"use client";

import { useState, useEffect } from "react";
import { Award, Quote, Briefcase, Building2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  photo: string;
  branch: string;
  year: string;
  company: string;
  package: string;
  role: string;
  testimonial: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error loading testimonials:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Student Testimonials
            </h1>
          </div>
          <p className="text-lg">Success stories from our placed students</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-orange-100 to-green-100 p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {testimonial.branch}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Batch of {testimonial.year}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-orange-600" />
                          <p className="text-xs text-gray-600 font-medium">
                            Company
                          </p>
                        </div>
                        <p className="font-bold text-gray-800">
                          {testimonial.company}
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 text-green-600" />
                          <p className="text-xs text-gray-600 font-medium">
                            Package
                          </p>
                        </div>
                        <p className="font-bold text-gray-800">
                          {testimonial.package}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                        {testimonial.role}
                      </span>
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-200" />
                      <p className="text-gray-700 italic leading-relaxed pl-6">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-lg">Loading testimonials...</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Share Your Success Story
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Been placed recently? Share your journey and inspire future
              students!
            </p>
            <a
              href="mailto:placements@sbssu.ac.in?subject=Testimonial Submission"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Submit Your Testimonial
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
