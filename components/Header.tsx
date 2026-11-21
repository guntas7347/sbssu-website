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
import { navItems } from "@/constants/nav-items";
import FontSizeChanger from "./FontSizeChanger";

export function Header() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="static md:sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
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

            <FontSizeChanger />

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
          {/* Left logo */}
          <img
            src="/sbssu-logo.png"
            alt="SBSSU Logo"
            className="w-11 h-11 object-contain shrink-0"
          />

          {/* University name */}
          <div className="text-center">
            <h1 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-tight tracking-tight">
              Shaheed Bhagat Singh State University
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Ferozepur, Punjab (Est. 1995)
            </p>
          </div>

          {/* Right logo */}
          <img
            src="/punjab-logo.webp"
            alt="SBSSU Logo"
            className="w-11 h-11 object-contain shrink-0"
          />
        </Link>

        {/* External Links & Utility Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <a
            href="https://sbsexam.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition-colors font-medium flex items-center gap-1.5"
          >
            <Laptop className="w-3.5 h-3.5 text-secondary-light" />
            <span>SBS EXAM</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      <Tier2Navigation navItems={navItems} />
    </header>
  );
}
