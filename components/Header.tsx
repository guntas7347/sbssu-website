"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Menu,
  X,
  Sun,
  Moon,
  Phone,
  Mail,
  ChevronDown,
  GraduationCap,
  ExternalLink,
  BookOpen,
  ShieldAlert,
  Laptop,
} from "lucide-react";
import { Tier2Navigation } from "./Dropdown";

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Home",
    children: [
      { label: "About", path: "/about" },
      { label: "Mission & Vision", path: "/mission" },
      { label: "Legacy Website", path: "/legacy-website" },
    ],
  },
  {
    label: "Administration",
    children: [
      { label: "Vice-Chancellor's Desk", path: "/vc" },
      { label: "Board of Governors", path: "/legacy-website?Id=12" },
      { label: "Authorities", path: "/administration/authorities" },
      {
        label: "Governance",
        children: [
          {
            label: "Board of Governors Meetings",
            path: "/legacy-website?Id=12",
          },
          {
            label: "Finance Committee Meetings",
            path: "/legacy-website?Id=1123&mode=category",
          },
          {
            label: "Building Works Meetings",
            path: "/legacy-website?Id=1134&mode=category",
          },
          {
            label: "Internal Quality Assurance Committee Meetings",
            path: "/legacy-website?Id=1135&mode=category",
          },
          {
            label: "Academic Council Meetings",
            path: "/legacy-website?Id=1112&mode=category",
          },
        ],
      },
      {
        label: "Academic Council Committee",
        path: "/legacy-website?Id=1150&mode=category",
      },
      { label: "Committees", path: "/legacy-website?Id=213" },
    ],
  },
  {
    label: "Academics",
    children: [
      {
        label: "Office Bearers",
        path: "/legacy-website?Id=31&mode=category",
      },
      {
        label: "Academic Regulations",
        path: "/legacy-website?Id=1200&mode=category",
      },
      {
        label: "Academic Link",
        path: "/legacy-website?Id=35003&mode=category",
      },
      {
        label: "Courses",
        path: "/legacy-website?Id=1145&mode=category",
      },
      {
        label: "Eligibility",
        path: "/legacy-website?Id=1147&mode=category",
      },
      {
        label: "Syllabus",
        // path: "/legacy-website?Id=0&mode=category",
      },
      {
        label: "Fee Detail",
        path: "/legacy-website?Id=1146&mode=category",
      },
      {
        label: "Notices",
        path: "/legacy-website?Id=35004&mode=category",
      },
      {
        label: "Notifications",
        path: "/legacy-website?Id=35005&mode=category",
      },
      {
        label: "Extension of Approvals (AICTE)",
        path: "/legacy-website?Id=1948&mode=category",
      },
      {
        label: "Academic Calendar",
        path: "/legacy-website?Id=1125&mode=category",
      },
      {
        label: "Gradation Certificate",
        path: "/legacy-website?Id=1148&mode=category",
      },
    ],
  },
  {
    label: "Departments",
    children: [
      {
        label: "Chemical Engineering",
        path: "/departments/legacy/chemical",
      },
      {
        label: "Civil Engineering",
        path: "/departments/legacy/civil",
      },
      {
        label: "Computer Science & Engineering",
        path: "/departments/legacy/cse",
      },
      {
        label: "Electronics & Communication Engineering",
        path: "/departments/legacy/ece",
      },
      {
        label: "Electrical Engineering",
        path: "/departments/legacy/electrical",
      },
      {
        label: "Mechanical Engineering",
        path: "/departments/legacy/mechanical",
      },
      {
        label: "School of Architecture",
        path: "/departments/legacy/arch",
      },
      {
        label: "Applied Sciences & Humanities",
        path: "/departments/legacy/applied",
      },
      {
        label: "Computer Applications",
        path: "/departments/legacy/ca",
      },
      {
        label: "University Business School",
        path: "/departments/legacy/ubs",
      },
      {
        label: "PolyWing",
        path: "/departments/legacy/polywing",
      },
      {
        label: "Agriculture Department",
        path: "/departments/legacy/agriculture",
      },
    ],
  },
  {
    label: "Central",
    children: [
      {
        label: "Computer Centre",
        path: "/legacy-website?Id=225",
      },
      {
        label: "Library",
        path: "/legacy-website?Id=226",
      },
      {
        label: "Workshop",
        path: "/legacy-website?Id=227",
      },
      {
        label: "Sports",
        path: "/legacy-website?Id=228",
      },
      {
        label: "Health Centre",
        path: "/legacy-website?Id=229",
      },
      {
        label: "Google Development Group",
        path: "https://gdg.community.dev/gdg-on-campus-shaheed-bhagat-singh-state-university-firozpur-india/",
      },
    ],
  },
  {
    label: "Campus",
    children: [
      {
        label: "Virtual Tool",
        path: "https://drive.google.com/file/d/1KLEibLUQeXW5It-m7IpTnCv3su0p2lE6/view?t=4.393",
      },
      {
        label: "Academic Area",
        path: "/legacy-website?Id=230",
      },
      {
        label: "Student Hostels",
        path: "/legacy-website?Id=231",
      },
      {
        label: "Market Complex",
        path: "/legacy-website?Id=232",
      },
      {
        label: "Sports Complex",
        path: "/legacy-website?Id=233",
      },
      {
        label: "Symposium for Extra-Curricular Activities (SECA)",
        path: "/legacy-website?Id=35006",
      },
      {
        label: "Indian Society for Technical Education (ISTE)",
        path: "/legacy-website?Id=35007",
      },
      {
        label: "National Service Scheme (NSS)",
        path: "/legacy-website?Id=35008",
      },
      {
        label: "National Cadet Corps (NCC)",
        path: "/legacy-website?Id=35009",
      },
      {
        label: "Association of Revolutionary Bees (AREV)",
        path: "/legacy-website?Id=35010",
      },
    ],
  },
  {
    label: "Examination",
    children: [
      {
        label: "Office Bearers",
        path: "/legacy-website?Id=31&mode=category",
      },

      {
        label: "Date Sheet",
        path: "/legacy-website?Id=21&mode=category",
      },
      {
        label: "NAD",
        path: "/legacy-website?Id=34&mode=category",
      },
      {
        label: "Notices",
        path: "/legacy-website?Id=34&mode=category",
        children: [
          {
            label: "Important Notices",
            path: "/legacy-website?Id=1139&mode=category",
          },
          {
            label: "Notices",
            path: "/legacy-website?Id=23&mode=category",
          },
        ],
      },
      {
        label: "Download Form",
        path: "/legacy-website?Id=34&mode=category",
      },
      {
        label: "Question Paper Template",
        path: "/legacy-website?Id=34&mode=category",
      },
    ],
  },
  {
    label: "Placement",
    children: [
      { label: "Training & Placement Cell", path: "/placement" },
      { label: "Recruiters & Partners", path: "/placement/recruiters" },
      { label: "Placement Records", path: "/placement/records" },
      {
        label: "Memorandum of Understanding",
        path: "/legacy-website?Id=1143&mode=category",
      },
    ],
  },
  {
    label: "R&D",
    children: [
      {
        label: "Research Projects",
        path: "/legacy-website?Id=2006",
      },
      {
        label: "PhD Admissions Guidelines",
        path: "/legacy-website?Id=2001",
      },
      {
        label: "PhD Regulations",
        path: "/legacy-website?Id=2002",
      },
      {
        label: "PhD Registered Candidates",
        path: "/legacy-website?Id=2003",
      },
      {
        label: "PhD Vacant Slots",
        path: "/legacy-website?Id=2004",
      },
      {
        label: "Notices",
        path: "/legacy-website?Id=2005",
      },
    ],
  },
  { label: "Grievances", path: "https://grievances.sbssu.ac.in" },
  { label: "Download", path: "/downloads" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSub, setMobileOpenSub] = useState<string | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary dark:text-primary-dark" />
              <span>+91 (1632) 244033</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary dark:text-primary-dark" />
              <span>contact@sbssu.ac.in</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://grievances.sbssu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1"
            >
              Grievance Portal <ExternalLink className="w-3 h-3" />
            </a>
            <span>|</span>
            <Link href="/support" className="hover:text-white">
              Help & Support
            </Link>
            <span>|</span>
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 1: Logo & External Portals / Quick Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60">
        {/* University Branding & Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary-light flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            <img src="/sbssu-logo.png" alt="logo" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-tight tracking-tight">
              Shaheed Bhagat Singh State University
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Ferozepur, Punjab (Est. 2021)
            </p>
          </div>
        </Link>

        {/* External Links & Utility Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition-colors font-medium flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-primary dark:text-primary-dark group-hover:text-white" />
            <span>Admin Portal</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://sbssu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition-colors font-medium flex items-center gap-1.5"
          >
            <Laptop className="w-3.5 h-3.5 text-secondary-light" />
            <span>Student ERP</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <Link
            href="/support"
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            Help Desk
          </Link>
        </div>
      </div>

      <Tier2Navigation navItems={navItems} />
    </header>
  );
}
