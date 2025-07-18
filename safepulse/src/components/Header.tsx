"use client";

import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {
  parkName?: string;
  planType?: string;
  notificationCount?: number;
  onBackClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
}

export default function Header({
  parkName = "SafePulse Park",
  planType = "Premium",
  notificationCount = 4,
  onBackClick,
  onSearchClick,
  onNotificationClick,
  onSettingsClick,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {parkName}
            </span>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              {planType}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={onNotificationClick}
            >
              <BellIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={onSettingsClick}
          >
            <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
