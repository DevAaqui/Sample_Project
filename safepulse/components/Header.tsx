"use client";

import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import LastUpdated from "./LastUpdated";
import { useAutoRefresh } from "@/redux/reduxHooks/useAutoRefresh";
import { useAppSelector } from "@/redux/reduxHooks/reduxHook";
import { RootState } from "@/redux/store/store";

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
  const { user, logout } = useAuth();
  const refreshInterval = useAppSelector(
    (state: RootState) => state.header?.refreshInterval
  );
  const pageCallbackFunc = useAppSelector(
    (state: RootState) => state.header?.pageCallbackFunc
  );

  const handleLogout = () => {
    // Reset header state on logout
    logout();
  };

  const { isRefreshing, refresh, lastRefreshed, isPaused, togglePauseFunc } =
    useAutoRefresh(
      pageCallbackFunc,
      refreshInterval || 60 * 1000 // 60 seconds
    );

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

        <div className="flex items-center space-x-6">
          {/* Last Updated Section */}
          <LastUpdated
            isRefreshing={isRefreshing}
            refresh={refresh}
            isPaused={isPaused}
            togglePause={togglePauseFunc}
          />

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onNotificationClick}
              >
                <BellIcon className="w-5 h-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={onSettingsClick}
            >
              <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-700">
                <span className="font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-gray-500 ml-2">({user?.role})</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-red-600"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
