"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  DocumentIcon,
  HeartIcon,
  FireIcon,
  ExclamationTriangleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

interface NavigationItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
  hasSubmenu?: boolean;
}

interface NavigationSection {
  category: string;
  items: NavigationItem[];
}

interface SidebarProps {
  activeSection?: string;
}

export default function Sidebar({ activeSection = "analytics" }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems: NavigationSection[] = [
    {
      category: "OVERVIEW",
      items: [
        { name: "Dashboard", icon: ChartBarIcon, href: "/dashboard" },
        { name: "Guests", icon: UserGroupIcon, href: "/guests" },
        // { name: "Analytics", icon: ChartBarIcon, href: "/analytics" },
        // { name: "Rides", icon: ShoppingBagIcon, href: "/rides" },
        // { name: "Safety", icon: ExclamationTriangleIcon, href: "/safety" },
        { name: "Reports", icon: DocumentIcon, href: "/reports" },
        { name: "Settings", icon: Cog6ToothIcon, href: "/settings" },
      ],
    },
    {
      category: "MANAGEMENT",
      items: [
        {
          name: "User Management",
          icon: UserGroupIcon,
          href: "/user-management",
          hasSubmenu: true,
        },
        // {
        //   name: "Ride Management",
        //   icon: ShoppingBagIcon,
        //   href: "#",
        //   hasSubmenu: true,
        // },
        // {
        //   name: "Safety Protocols",
        //   icon: ExclamationTriangleIcon,
        //   href: "#",
        //   hasSubmenu: true,
        // },
        {
          name: "Health Monitoring",
          icon: HeartIcon,
          href: "/health-monitoring",
          hasSubmenu: true,
        },
        {
          name: "Activity Tracking",
          icon: FireIcon,
          href: "/activity-tracking",
          hasSubmenu: true,
        },
        {
          name: "Alerts & Notifications",
          icon: BellIcon,
          href: "/alerts-notifications",
          hasSubmenu: true,
        },
        {
          name: "System Health",
          icon: Cog6ToothIcon,
          href: "/system-health",
          hasSubmenu: true,
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-md">S</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-800">
            SafePulse
          </span>
        </div>
      </div>

      <nav className="mt-6">
        {navigationItems.map((section) => (
          <div key={section.category} className="mb-0">
            {/* <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.category}
            </h3> */}
            <div className="mt-0">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-6 py-3 text-md font-medium transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700 border-r-2 border-green-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                    {/* {"hasSubmenu" in item && item.hasSubmenu && (
                      <svg
                        className="w-4 h-4 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )} */}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
