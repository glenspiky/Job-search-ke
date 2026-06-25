import {
  LayoutDashboard,
  User,
  Briefcase,
  Search,
  FileText,
  Bookmark,
  Bell,
  Settings,
  MessageSquare,
  Building2,
  LucideIcon,
} from "lucide-react";

export interface SidebarItem {
  name: string;
  icon: LucideIcon;
  href: string;
  hasSubmenu?: boolean;
  badge?: number;
}
export const sidebarNavigation: SidebarItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "Find Jobs",
    icon: Search,
    href: "/dashboard/jobs",
  },
  {
    name: "Applied Jobs",
    icon: Briefcase,
    href: "/dashboard/applications",
    badge: 10,
  },
  {
    name: "Saved Jobs",
    icon: Bookmark,
    href: "/dashboard/saved",
  },
  {
    name: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages",
    badge: 5,
  },
  {
    name: "Companies",
    icon: Building2,
    href: "/dashboard/companies",
  },
  {
    name: "Notifications",
    icon: Bell,
    href: "/dashboard/notifications",
    badge: 15,
  },
];
export const profileNavigation: SidebarItem[] = [
  {
    name: "My Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    name: "Resume",
    icon: FileText,
    href: "/dashboard/resume",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];
