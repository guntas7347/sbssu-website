import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import MadeBy from "./MadeBy";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-white text-lg">
                SBSSU Ferozepur
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Shaheed Bhagat Singh State University (Established by Govt. of
              Punjab vide Act No. 10 of 2021). Committed to delivering
              exceptional engineering and management education.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" /> NH-95, Moga
                Road, Ferozepur, Punjab 152004
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" /> +91 (1632)
                244033
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />{" "}
                contact@sbssu.ac.in
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About University
                </a>
              </li>
              <li>
                <a
                  href="#notices"
                  className="hover:text-primary transition-colors"
                >
                  Circulars & Notices
                </a>
              </li>
              <li>
                <a
                  href="#academics"
                  className="hover:text-primary transition-colors"
                >
                  Academics & Courses
                </a>
              </li>
              <li>
                <a
                  href="#campus"
                  className="hover:text-primary transition-colors"
                >
                  Campus Facilities
                </a>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Portals & ERP
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://grievances.sbssu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Grievance Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sbssu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Student ERP <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sbssu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Examination Branch
                </a>
              </li>
              <li>
                <a
                  href="https://sbssu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Placements Cell
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / AICTE */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Accreditation
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Approved by UGC, AICTE, and Ministry of Education, Government of
              Punjab.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800">
                UGC 2(f) Recognized
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © 2026 Shaheed Bhagat Singh State University, Ferozepur. All rights
            reserved.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Link href="/support" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/support" className="hover:text-slate-300">
              Terms of Use
            </Link>
            <MadeBy />
          </div>
        </div>
      </div>
    </footer>
  );
}
