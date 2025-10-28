'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bell, Briefcase, Calendar, Award, Users, BookOpen, Phone, MapPin, ExternalLink, ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notices, setNotices] = useState<any[]>([]);

  const heroImages = [
    'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  useEffect(() => {
    fetch('/data/notices.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        const activeNotices = data.filter((n: any) => n.is_active).slice(0, 6);
        setNotices(activeNotices);
      })
      .catch(err => console.error('Error loading notices:', err));

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Campus ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Welcome to SBSSU
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Shaheed Bhagat Singh State University, Ferozepur - Empowering minds, Building futures
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
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-orange-600' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to SBSSU</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-green-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Shaheed Bhagat Singh State University, established in 1995, is a premier technical university located in Ferozepur, Punjab.
              Spread across 98 acres, we are committed to providing quality education in engineering, technology, and management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-orange-600">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">5000+</h3>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-green-600">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">8</h3>
              <p className="text-gray-600">Departments</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-orange-600">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">200+</h3>
              <p className="text-gray-600">Faculty Members</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-green-600">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">98</h3>
              <p className="text-gray-600">Acres Campus</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Mission & Vision</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-600 pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide quality technical education, foster innovation and research, and develop skilled professionals
                    who contribute to society and nation-building through their knowledge and ethical values.
                  </p>
                </div>
                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To emerge as a leading technical university recognized nationally and internationally for academic excellence,
                    cutting-edge research, and producing competent engineers and managers.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Campus"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students"
                className="rounded-lg shadow-lg h-48 w-full object-cover mt-8"
              />
              <img
                src="https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Classroom"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Technology"
                className="rounded-lg shadow-lg h-48 w-full object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Latest Notices</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-orange-600"></div>
            </div>
            <Link
              href="/notices"
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
            >
              View All
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div key={notice.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-orange-600">
                  <div className="flex items-start gap-3 mb-3">
                    <Bell className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">{notice.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{notice.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(notice.date).toLocaleDateString('en-IN')}
                        </span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  {notice.file_url && (
                    <a
                      href={notice.file_url}
                      className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 mt-3"
                    >
                      Download PDF
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                Loading notices...
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Career Opportunities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-green-600 mx-auto"></div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              We are looking for passionate educators and staff members. Explore current job openings and become part of SBSSU family.
            </p>
            <Link
              href="/career"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              View Job Openings
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Quick Links</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-green-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/about" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 transition">
                <BookOpen className="w-6 h-6 text-orange-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">About SBSSU</h3>
              <p className="text-sm text-gray-600">Learn about our history and achievements</p>
            </Link>

            <Link href="/sbs-act" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition">
                <BookOpen className="w-6 h-6 text-green-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">SBS Act 2021</h3>
              <p className="text-sm text-gray-600">University act and regulations</p>
            </Link>

            <Link href="/contact" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 transition">
                <Phone className="w-6 h-6 text-orange-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600">Get in touch with us</p>
            </Link>

            <Link href="/downloads" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition">
                <BookOpen className="w-6 h-6 text-green-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Downloads</h3>
              <p className="text-sm text-gray-600">Forms, syllabi, and documents</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
