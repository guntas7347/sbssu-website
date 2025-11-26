"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  BookOpen,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Shield,
  School,
  FlaskConical,
  Calendar,
  User,
  Bell,
  Settings,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  children?: NavItem[];
}

interface SidebarProps {
  portal: "admin" | "central" | "departmental" | "placement";
}

export default function Sidebar({ portal }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const adminNavItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/admin/admin/dashboard",
      icon: LayoutDashboard,
    },
    { name: "Departments", href: "/admin/admin/departments", icon: Building2 },
    { name: "Users", href: "/admin/admin/users", icon: Users },
  ];

  const centralNavItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/admin/central/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Edit",
      href: "/admin/central/edit",
      icon: Shield,
    },
    { name: "Academics", href: "/admin/central/academics", icon: BookOpen },
    { name: "Notices", href: "/admin/central/notices", icon: Bell },
  ];

  const departmentalNavItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/admin/department/dashboard",
      icon: LayoutDashboard,
    },
    { name: "Notices", href: "/admin/department/notices", icon: Bell },
    {
      name: "HOD Message",
      href: "/admin/department/hod-message",
      icon: User,
    },
    {
      name: "Department About",
      href: "/admin/department/about",
      icon: School,
    },
    {
      name: "Faculty",
      href: "/admin/department/faculty",
      icon: GraduationCap,
    },
    { name: "Labs", href: "/admin/department/labs", icon: FlaskConical },
    {
      name: "Timetable",
      href: "/admin/department/timetable",
      icon: Calendar,
    },
  ];

  const placementNavItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/admin/placement/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Placement Records",
      href: "/admin/placement/records",
      icon: Briefcase,
    },
  ];

  const getNavItems = () => {
    switch (portal) {
      case "admin":
        return adminNavItems;
      case "central":
        return centralNavItems;
      case "departmental":
        return departmentalNavItems;
      case "placement":
        return placementNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="font-bold text-gray-800 capitalize">
            {portal} Portal
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
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
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
