"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  Shield,
  School,
  FlaskConical,
  Calendar,
  User,
  Bell,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: any;
  right: string[];
  href: string;
}

export default function Sidebar({ rights = [""] }) {
  const pathname = usePathname();

  const allNavItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      right: [],
      href: "/admin/dashboard",
    },
    {
      name: "Departments",
      icon: Building2,
      right: ["manage_departments"],
      href: "/admin/manage-departments",
    },
    {
      name: "Users",
      icon: Users,
      right: ["manage_users"],
      href: "/admin/manage-users",
    },
    {
      name: "Notices",
      icon: Bell,
      right: ["manage_notices"],
      href: "/admin/notices",
    },
    {
      name: "Content",
      icon: Shield,
      right: ["edit_central", "hod"],
      href: "/admin/content",
    },
    {
      name: "Academics",
      icon: BookOpen,
      right: ["academics"],
      href: "/admin/academics",
    },
    {
      name: "HOD Message",
      icon: User,
      right: ["hod-message"],
      href: "/admin/hod-message",
    },
    {
      name: "Department About",
      icon: School,
      right: ["department-about"],
      href: "/admin/department-about",
    },
    {
      name: "Faculty",
      icon: GraduationCap,
      right: ["faculty"],
      href: "/admin/faculty",
    },
    {
      name: "Labs",
      icon: FlaskConical,
      right: ["labs"],
      href: "/admin/labs",
    },
    {
      name: "Timetable",
      icon: Calendar,
      right: ["timetable"],
      href: "/admin/timetable",
    },
    {
      name: "Placement Records",
      icon: Briefcase,
      right: ["placement-records"],
      href: "/admin/placement-records",
    },
  ];

  // rights is your list of granted permissions: string[]

  const filtered = allNavItems.filter(
    (item) =>
      item.right.length === 0 || item.right.some((r) => rights.includes(r)),
  );

  return (
    <aside className="bg-white border-r border-gray-200 w-64 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-gray-800 capitalize">
          SBSSU Website Portal
        </h2>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {filtered.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
