'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Target, GraduationCap, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CourseOutcomesPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);

  useEffect(() => {
    fetch('/data/departments.json')
      .then(res => res.json())
      .then(data => {
        const dept = data.find((d: any) => d.slug === slug);
        setDepartment(dept);
      })
      .catch(err => console.error('Error loading department:', err));
  }, [slug]);

  const pos = [
    { code: 'PO1', title: 'Engineering Knowledge', description: 'Apply knowledge of mathematics, science, and engineering fundamentals to solve complex engineering problems' },
    { code: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, research and analyze complex engineering problems using first principles' },
    { code: 'PO3', title: 'Design/Development', description: 'Design solutions for complex problems and design systems that meet specified needs' },
    { code: 'PO4', title: 'Investigation', description: 'Conduct investigations of complex problems using research-based knowledge and methods' },
    { code: 'PO5', title: 'Modern Tools', description: 'Create, select and apply appropriate techniques and modern engineering tools' },
    { code: 'PO6', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities' }
  ];

  const psos = [
    { code: 'PSO1', description: 'Ability to apply domain knowledge to develop software solutions for real-world problems' },
    { code: 'PSO2', description: 'Ability to work with modern tools and technologies in the field of specialization' },
    { code: 'PSO3', description: 'Ability to pursue higher studies and research in the domain' }
  ];

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
          <Target className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name}</h1>
          <p className="text-lg md:text-xl">Course Outcomes</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our program aims to prepare graduates who will be successful in their professional careers and contribute to society. The program educational objectives are:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                <h3 className="font-bold text-gray-800 mb-2">PEO 1</h3>
                <p className="text-sm text-gray-700">Excel in professional careers through technical expertise and innovation</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-gray-800 mb-2">PEO 2</h3>
                <p className="text-sm text-gray-700">Pursue higher studies and research in their field of interest</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                <h3 className="font-bold text-gray-800 mb-2">PEO 3</h3>
                <p className="text-sm text-gray-700">Work ethically and contribute to society and nation building</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Program Outcomes (POs)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pos.map((po) => (
                <div key={po.code} className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-600 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-orange-600">{po.code}</span>
                    </div>
                    <h3 className="font-bold text-gray-800">{po.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{po.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Program Specific Outcomes (PSOs)</h2>
            <div className="space-y-4">
              {psos.map((pso) => (
                <div key={pso.code} className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">{pso.code}</h3>
                    <p className="text-gray-700">{pso.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
