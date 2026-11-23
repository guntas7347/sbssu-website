import {
  Building2,
  FileText,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  Users,
  ListSortAscending,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRights?: string[];
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    category: "Overview",
    icon: LayoutDashboard,
    requiredRights: ["allow_login"],
  },
  {
    name: "Manage Departments",
    href: "/admin/admin/manage-departments",
    category: "Administration",
    icon: Building2,
    requiredRights: ["admin"],
  },
  {
    name: "Manage Users",
    href: "/admin/admin/users",
    category: "Administration",
    icon: Users,
    requiredRights: ["admin"],
  },
  {
    name: "Legacy Manager",
    href: "/admin/admin/legacy-manager",
    category: "Administration",
    icon: History,
    requiredRights: ["admin"],
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    category: "Content & Media",
    icon: ImageIcon,
    requiredRights: ["admin", "hod"],
  },
  {
    name: "Notices",
    href: "/admin/notices",
    category: "Content & Media",
    icon: Megaphone,
    requiredRights: ["admin", "hod"],
  },
  {
    name: "Page Categories",
    href: "/admin/page-categories",
    category: "Content & Media",
    icon: ListSortAscending,
    requiredRights: ["admin", "hod"],
  },
  {
    name: "Page Entries",
    href: "/admin/page-entries",
    category: "Content & Media",
    icon: FileText,
    requiredRights: ["admin", "hod"],
  },
];
