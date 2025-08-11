// app/components/AutoRefresh.tsx
import React from "react";
import {
  Card,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
  Button,
  CardBody,
} from "@heroui/react";
import { RefreshCcw, Pause, Play, Clock, Activity } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks/reduxHook";
import { RootState } from "@/redux/store/store";
import { setRefreshInterval } from "@/redux/slices/headerSlice";

interface AutoRefreshBarProps {
  isRefreshing: boolean;
  lastRefreshed?: Date;
  refresh: () => void;
  intervalSec?: number;
  isPaused: boolean;
  togglePause: () => void;
}

const intervalOptions = [
  { label: "10 sec", value: 10 * 1000 },
  { label: "30 sec", value: 30 * 1000 },
  { label: "1 min", value: 60 * 1000 },
  { label: "5 min", value: 300 * 1000 },
  // { label: '10 min', value: 600 * 1000 },
];

const AutoRefreshBar: React.FC<AutoRefreshBarProps> = ({
  isRefreshing,
  lastRefreshed,
  refresh,
  intervalSec = 60 * 1000,
  isPaused,
  togglePause,
}) => {
  const dispatch = useAppDispatch();
  const refreshInterval = useAppSelector(
    (state: RootState) => state.header.refreshInterval
  );

  const onIntervalChange = (value: number) => {
    dispatch(setRefreshInterval(value));
    // Trigger an immediate refresh when interval changes
    refresh();
  };

  return (
    <Card className="w-[480px] bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
      <CardBody className="p-1">
        <div className="flex items-center justify-between">
          {/* Left Section - Status and Last Updated */}
          <div className="flex items-center space-x-3">
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${
                      isPaused
                        ? "bg-orange-400 animate-pulse"
                        : "bg-emerald-400 animate-ping"
                    } opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isPaused ? "bg-orange-500" : "bg-emerald-500"
                    }`}
                  ></span>
                </span>
              </div>
              <span
                className={`text-xs font-medium ${
                  isPaused ? "text-orange-700" : "text-emerald-700"
                }`}
              >
                {isPaused ? "Paused" : "Active"}
              </span>
            </div>

            {/* Last Updated */}
            {lastRefreshed && (
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span className="whitespace-nowrap">
                  Last: {lastRefreshed.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center space-x-3">
            {/* Pause/Play Button */}
            <Tooltip
              content={isPaused ? "Resume Auto Refresh" : "Pause Auto Refresh"}
              disableAnimation={false}
              placement="top"
            >
              <Button
                isIconOnly
                variant={isPaused ? "solid" : "bordered"}
                color={isPaused ? "success" : "primary"}
                size="sm"
                onClick={togglePause}
                className={`min-w-0 transition-all duration-200 ${
                  isPaused
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "border-blue-300 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {isPaused ? (
                  <Play className="w-3 h-3" />
                ) : (
                  <Pause className="w-3 h-3" />
                )}
              </Button>
            </Tooltip>

            {/* Manual Refresh Button */}
            <Tooltip
              content="Manual Refresh"
              disableAnimation={true}
              placement="top"
            >
              <Button
                isIconOnly
                variant="bordered"
                color="secondary"
                size="sm"
                onClick={refresh}
                className={`min-w-0 border-purple-300 text-purple-600 hover:bg-purple-50 transition-all duration-200 ${
                  isRefreshing ? "animate-pulse" : ""
                }`}
                isDisabled={isRefreshing}
              >
                <RefreshCcw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </Tooltip>

            {/* Interval Selector */}
            <div className="flex items-center space-x-2">
              <Activity className="w-3 h-3 text-gray-500" />
              <Select
                size="sm"
                className="w-24"
                selectedKeys={[refreshInterval?.toString() || "60000"]}
                onChange={(e) => onIntervalChange(Number(e.target.value))}
                aria-label="Select refresh interval"
                placeholder="Interval"
                isDisabled={!isPaused}
                variant="bordered"
                classNames={{
                  trigger: "bg-white border-gray-200 hover:border-gray-300",
                  value: "text-xs font-medium text-gray-700",
                }}
              >
                {intervalOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    textValue={opt.label}
                    className="text-xs"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Bottom Section - Visual Status Bar
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-orange-400' : 'bg-emerald-400'
                }`}></div>
              <span>Auto-refresh {isPaused ? 'paused' : 'running'}</span>
            </span>

            {!isPaused && (
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Next refresh in progress...</span>
              </span>
            )}
          </div>
        </div> */}
      </CardBody>
    </Card>
  );
};

export default AutoRefreshBar;
