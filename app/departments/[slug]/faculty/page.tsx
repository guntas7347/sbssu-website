'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Users, Mail, GraduationCap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function FacultyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);
  const [faculty, setFaculty] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/data/departments.json').then(res => res.json()),
      fetch('/data/faculty.json').then(res => res.json())
    ])
      .then(([depts, fac]) => {
        const dept = depts.find((d: any) => d.slug === slug);
        setDepartment(dept);
        if (dept) {
          const deptFaculty = fac.filter((f: any) => f.department_id === dept.id);
          setFaculty(deptFaculty);
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
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name}</h1>
          <p className="text-lg md:text-xl">Faculty Profiles</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member) => (
              <div key={member.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-600"
                />
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-2">{member.designation}</p>
                  <a href={`mailto:${member.email}`} className="text-sm text-gray-600 hover:text-orange-600 flex items-center gap-1 justify-center">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  {member.qualifications && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Qualifications:</h4>
                      <p className="text-sm text-gray-600 mb-3">{member.qualifications}</p>
                    </>
                  )}

                  {member.specialization && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Research Interests:</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specialization.split(',').slice(0, 3).map((spec: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {spec.trim()}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {faculty.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              Faculty information will be updated soon.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
