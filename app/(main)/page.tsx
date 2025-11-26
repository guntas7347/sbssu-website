import Link from "next/link";
import {
  Briefcase,
  Award,
  Users,
  BookOpen,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";

import HeroSection from "@/components/homepage/HeroSection";
import NoticesSection from "@/components/homepage/NoticesSection";
import { initAdmin } from "@/lib/dev";
import { getPage } from "@/lib/getPage";

export default async function Home() {
  const { page: gallery } = await getPage("hero-gallery");

  return (
    <div className="min-h-screen bg-white">
      <HeroSection gallery={gallery} />

      <section className="py-16 px-4 bg-linear-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Welcome to SBSSU
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-orange-600 to-green-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Shaheed Bhagat Singh State University, established in 1995, is a
              premier technical university located in Ferozepur, Punjab. Spread
              across 98 acres, we are committed to providing quality education
              in engineering, technology, and management.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Mission & Vision
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-600 pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide quality technical education, foster innovation
                    and research, and develop skilled professionals who
                    contribute to society and nation-building through their
                    knowledge and ethical values.
                  </p>
                </div>
                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To emerge as a leading technical university recognized
                    nationally and internationally for academic excellence,
                    cutting-edge research, and producing competent engineers and
                    managers.
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

      <NoticesSection />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Career Opportunities
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-orange-600 to-green-600 mx-auto"></div>
          </div>

          <div className="bg-linear-to-r from-orange-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Team
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              We are looking for passionate educators and staff members. Explore
              current job openings and become part of SBSSU family.
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

      <section className="py-16 px-4 bg-linear-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Quick Links
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-orange-600 to-green-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/about"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 transition">
                <BookOpen className="w-6 h-6 text-orange-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">About SBSSU</h3>
              <p className="text-sm text-gray-600">
                Learn about our history and achievements
              </p>
            </Link>

            <Link
              href="/sbs-act"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition">
                <BookOpen className="w-6 h-6 text-green-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">SBS Act 2021</h3>
              <p className="text-sm text-gray-600">
                University act and regulations
              </p>
            </Link>

            <Link
              href="/contact"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 transition">
                <Phone className="w-6 h-6 text-orange-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600">Get in touch with us</p>
            </Link>

            <Link
              href="/downloads"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition">
                <BookOpen className="w-6 h-6 text-green-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Downloads</h3>
              <p className="text-sm text-gray-600">
                Forms, syllabi, and documents
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
