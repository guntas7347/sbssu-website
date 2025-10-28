"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Administration", href: "/administration", hasDropdown: true },
    { name: "Academics", href: "/academics", hasDropdown: true },
    { name: "Departments", href: "/departments", hasDropdown: true },
    { name: "Central", href: "/central", hasDropdown: true },
    { name: "Campus", href: "/campus", hasDropdown: true },
    { name: "Examination", href: "/examination", hasDropdown: false },
    { name: "Placement", href: "/placement", hasDropdown: false },
    { name: "R&D", href: "/research", hasDropdown: false },
    { name: "Grievances", href: "/grievances", hasDropdown: false },
    { name: "Download", href: "/downloads", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="tel:+918288012050"
              className="flex items-center gap-2 hover:text-orange-100"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+91-1632-245000</span>
            </a>
            <a
              href="mailto:info@sbssu.ac.in"
              className="flex items-center gap-2 hover:text-orange-100"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@sbssu.ac.in</span>
            </a>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://admissions.sbssu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 bg-white text-orange-600 rounded-full text-xs font-semibold hover:bg-orange-50 transition flex items-center gap-1"
            >
              Admissions <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://exam.sbssu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 bg-white text-orange-600 rounded-full text-xs font-semibold hover:bg-orange-50 transition flex items-center gap-1"
            >
              MySBSEXAM <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://placements.sbssu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 bg-white text-orange-600 rounded-full text-xs font-semibold hover:bg-orange-50 transition flex items-center gap-1"
            >
              Placements <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://library.sbssu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 bg-white text-orange-600 rounded-full text-xs font-semibold hover:bg-orange-50 transition flex items-center gap-1"
            >
              Library <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/sbssu-logo.png"
                alt="sbssu-logo"
                height={1000}
                width={1000}
                className="size-16"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  SBSSU
                </h1>
                <p className="text-xs md:text-sm text-gray-600">
                  Shaheed Bhagat Singh State University
                </p>
                <p className="text-red-500 font-extrabold">
                  THIS IS NOT OFFICIAL WEBSITE
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <nav className="hidden  items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition flex items-center gap-1"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>
                ))}
              </nav>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-orange-600"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="pb-4 border-t">
              <nav className="flex flex-col gap-1 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
