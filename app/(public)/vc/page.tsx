import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Award,
  Target,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function ViceChancellorPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: VC Profile Card & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden sticky top-24">
              {/* Profile Image Banner Background */}
              <div className="h-32 bg-gradient-to-r from-primary to-secondary-light relative">
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Profile Avatar / Placeholder */}
              <div className="px-6 pb-6 text-center relative">
                <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 mx-auto -mt-16 shadow-lg overflow-hidden flex items-center justify-center text-slate-400">
                  <img
                    src="https://sbssu.ac.in/BusinessImage/0ecd9ea3-8b99-4889-ac12-4be307aee55a.png"
                    alt=""
                  />
                </div>

                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mt-4">
                  Prof. Suresh Kumar Sharma
                </h1>
                <p className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark mt-1">
                  Vice-Chancellor
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Shaheed Bhagat Singh State University
                </p>
                <p className="text-[11px] text-slate-400">
                  Ferozepur, Punjab, India
                </p>

                {/* Quick Contact Details Box */}
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-left space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>vc@sbssu.ac.in</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>+91 (1632) 244033 (Office)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>VC Secretariat, SBSSU Campus, Ferozepur</span>
                  </div>
                </div>

                {/* Quick Link Button */}
                <div className="mt-6 pt-2">
                  <a
                    href="https://sbssu.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary-dark text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
                  >
                    Official University Profile{" "}
                    <ExternalLink className="w-3.5 h-3.5 inline ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Message from VC & Leadership Objectives */}
          <div className="lg:col-span-8 space-y-8">
            {/* Message Box */}
            <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark mb-3">
                <Award className="w-4 h-4" /> Message from the Vice-Chancellor
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
                Shaping Future Leaders and Innovators
              </h2>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  It is my proud privilege to lead Shaheed Bhagat Singh State
                  University (SBSSU), Ferozepur, an institution inspired by the
                  ideals of courage, excellence, and service to society. SBSSU
                  is committed to becoming a preferred destination for
                  professional and multidisciplinary education that is
                  responsive to national priorities, global challenges, and
                  societal needs.
                </p>
                <p>
                  We are dedicated to provide world-class infrastructure, an
                  intellectually vibrant campus, and mentorship from renowned
                  academicians to foster teaching, research, innovation,
                  consultancy, and entrepreneurship. Our curricula are designed
                  in consonance with NEP 2020 and international standards,
                  aligned with industry and civil society, and focused on
                  creative thinking, critical analysis, and strong human and
                  ethical values. In an era marked by rapid technological
                  advancement, automation, and digital transformation, SBSSU
                  places special emphasis on contemporary technical education.
                  We focus on building strong foundations in engineering,
                  science, AI/ML, Data Science, and emerging technologies,
                  complemented by hands-on training, interdisciplinary learning,
                  and problem-solving skills.
                </p>
                <p>
                  Holistic student development lies at the heart of our
                  approach. Through blended learning, corporate mentoring,
                  professional grooming, flexible academic pathways, and a wide
                  range of co-curricular and extra-curricular opportunities, we
                  ensure that our students grow both academically and
                  personally. A transparent, objective, and scientific
                  evaluation system further strengthens the credibility and
                  value of our certifications.
                </p>
                <p>
                  Through strategic collaborations with leading national and
                  international universities and corporates, we promote academic
                  exchange, research excellence, and global exposure. We are
                  dedicated to Institutional Social Responsibility by
                  contributing to rural development, women empowerment,
                  community service, health and environmental sustainability.
                </p>
                <p>
                  Our mission is to nurture not only job-ready graduates but
                  also entrepreneurs, innovators, and responsible leaders who
                  serve the nation and the world with integrity.
                </p>
                <p className="font-semibold text-slate-900 dark:text-white pt-2">
                  I warmly invite students with ambition, vision, and a passion
                  for excellence to join SBSSU and shape a meaningful future.
                </p>
              </div>

              {/* Signature block */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-base">
                    Prof. Suresh Kumar Sharma
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Vice-Chancellor, SBSSU Ferozepur
                  </p>
                </div>
                <div className="text-xs font-serif italic text-slate-400 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                  [ Signed Digitally ]
                </div>
              </div>
            </div>

            {/* Strategic Pillars / Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary dark:text-primary-dark flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Academic Excellence
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Upgrading curricula to incorporate cutting-edge domains like
                  Artificial Intelligence, Machine Learning, Robotics, and
                  sustainable green engineering.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-secondary-light/10 text-secondary-light dark:text-secondary-dark flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Holistic Development
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Encouraging active participation in cultural societies,
                  technical symposiums, NSS community initiatives, and national
                  hackathons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
