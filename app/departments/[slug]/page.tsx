'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GraduationCap, Users, FileText, Target, FlaskConical, TrendingUp, UsersRound, ClipboardList, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DepartmentDetailPage() {
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

  const sections = [
    { title: 'Department & Head', icon: GraduationCap, href: `/departments/${slug}/head`, color: 'orange' },
    { title: 'Faculty Profiles', icon: Users, href: `/departments/${slug}/faculty`, color: 'green' },
    { title: 'Board of Studies', icon: FileText, href: `/departments/${slug}/bos`, color: 'orange' },
    { title: 'Course Outcomes', icon: Target, href: `/departments/${slug}/outcomes`, color: 'green' },
    { title: 'Laboratories', icon: FlaskConical, href: `/departments/${slug}/labs`, color: 'orange' },
    { title: 'Funded Research', icon: TrendingUp, href: `/departments/${slug}/research`, color: 'green' },
    { title: 'Student Society', icon: UsersRound, href: `/departments/${slug}/society`, color: 'orange' },
    { title: 'Student Survey Form', icon: ClipboardList, href: `/departments/${slug}/survey`, color: 'green' },
    { title: 'Time Table', icon: Calendar, href: `/departments/${slug}/timetable`, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name}</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Established in {department.established_year} | {department.building_location}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Department</h2>
            <p className="text-gray-600 leading-relaxed">{department.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-orange-600 transition group"
                >
                  <div className={`w-16 h-16 bg-${section.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${section.color}-600 transition`}>
                    <Icon className={`w-8 h-8 text-${section.color}-600 group-hover:text-white transition`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{section.title}</h3>
                  <div className="text-orange-600 font-semibold group-hover:translate-x-2 transition inline-block">
                    View Details →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
