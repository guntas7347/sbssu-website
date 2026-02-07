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

type Role = "SUPER_ADMIN" | "CENTRAL_EDITOR" | "HOD" | "DEPT_EDITOR";

interface NavItem {
  name: string;
  icon: any;
  roles: Role[];
  href: string;
}

export default function Sidebar({ roles = [] }: { roles: Role[] }) {
  const pathname = usePathname();

  const allNavItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      roles: [],
      href: "/admin/dashboard",
    },
    {
      name: "Departments",
      icon: Building2,
      roles: ["SUPER_ADMIN"],
      href: "/admin/manage-departments",
    },
    {
      name: "Users",
      icon: Users,
      roles: ["SUPER_ADMIN"],
      href: "/admin/manage-users",
    },
    {
      name: "Notices",
      icon: Bell,
      roles: ["SUPER_ADMIN", "CENTRAL_EDITOR", "HOD", "DEPT_EDITOR"],
      href: "/admin/notices",
    },
    {
      name: "Content",
      icon: Shield,
      roles: ["SUPER_ADMIN", "CENTRAL_EDITOR", "HOD"],
      href: "/admin/content",
    },
    {
      name: "Academics",
      icon: BookOpen,
      roles: ["HOD", "DEPT_EDITOR"],
      href: "/admin/academics",
    },
    {
      name: "HOD Message",
      icon: User,
      roles: ["HOD"],
      href: "/admin/hod-message",
    },
    {
      name: "Department About",
      icon: School,
      roles: ["HOD", "DEPT_EDITOR"],
      href: "/admin/department-about",
    },
    {
      name: "Faculty",
      icon: GraduationCap,
      roles: ["HOD", "DEPT_EDITOR"],
      href: "/admin/faculty",
    },
    {
      name: "Labs",
      icon: FlaskConical,
      roles: ["HOD", "DEPT_EDITOR"],
      href: "/admin/labs",
    },
    {
      name: "Timetable",
      icon: Calendar,
      roles: ["HOD", "DEPT_EDITOR"],
      href: "/admin/timetable",
    },
    {
      name: "Placement Records",
      icon: Briefcase,
      roles: ["CENTRAL_EDITOR"],
      href: "/admin/placement-records",
    },
  ];

  const filtered = allNavItems.filter(
    (item) =>
      item.roles.length === 0 || item.roles.some((r) => roles.includes(r)),
  );

  return (
    <aside className="bg-white border-r border-gray-200 min-w-72 flex flex-col">
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
