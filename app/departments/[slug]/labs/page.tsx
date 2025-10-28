'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FlaskConical, GraduationCap, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LabsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);
  const [labs, setLabs] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/data/departments.json').then(res => res.json()),
      fetch('/data/labs.json').then(res => res.json())
    ])
      .then(([depts, labsData]) => {
        const dept = depts.find((d: any) => d.slug === slug);
        setDepartment(dept);
        if (dept) {
          const deptLabs = labsData.filter((l: any) => l.department_id === dept.id);
          setLabs(deptLabs);
        }
      })
      .catch(err => console.error('Error loading data:', err));
  }, [slug]);

  if (!department) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <FlaskConical className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name}</h1>
          <p className="text-lg md:text-xl">Laboratories</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Laboratories</h2>
            <p className="text-gray-600 leading-relaxed">
              The department is equipped with state-of-the-art laboratories providing hands-on learning experience to students. Our labs are regularly updated with the latest equipment and software to ensure students get exposure to current industry standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {labs.map((lab) => (
              <div key={lab.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                    <FlaskConical className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{lab.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {lab.location}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{lab.description}</p>

                {lab.equipment && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Equipment:</h4>
                    <div className="flex flex-wrap gap-2">
                      {lab.equipment.split(',').slice(0, 4).map((equip: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                          {equip.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Capacity: {lab.capacity} students</span>
                  <span className="text-sm font-semibold text-green-600">{lab.lab_incharge}</span>
                </div>
              </div>
            ))}
          </div>

          {labs.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              Laboratory information will be updated soon.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
