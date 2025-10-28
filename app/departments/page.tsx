'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { GraduationCap, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/departments.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setDepartments(data))
      .catch(err => console.error('Error loading departments:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Departments</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Explore our diverse range of academic departments offering quality education and research opportunities
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {departments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept) => (
                <Link
                  key={dept.id}
                  href={`/departments/${dept.slug}`}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-500">Established {dept.established_year}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{dept.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{dept.building_location}</span>
                    </div>
                    <span className="text-orange-600 font-semibold group-hover:translate-x-2 transition">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Loading departments...
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
