"use client";

import { useAdmin } from "@/app/(admin)/admin/AdminContext";
import { GraduationCap, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { user } = useAdmin();
  console.log(user);
  return (
    <header className="bg-linear-to-r from-orange-600 to-orange-500 shadow-lg sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="bg-white p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">
                Shaheed Bhagat Singh State University
              </h1>
              <p className="text-xs text-orange-100">
                Ferozepur, Punjab, India
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-2 rounded-full">
                <User className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{user?.username}</p>
                <p className="text-xs text-orange-100">{user?.rights}</p>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "/admin/login")}
              className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
