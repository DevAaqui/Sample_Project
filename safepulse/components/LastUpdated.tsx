// app/components/AutoRefresh.tsx
import React from 'react';
import {
  Card,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
  Button,
} from '@heroui/react';
import { RefreshCcw, Pause, Play } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks/reduxHook';
import { RootState } from '@/redux/store/store';
import { setRefreshInterval } from '@/redux/slices/headerSlice';

interface AutoRefreshBarProps {
  isRefreshing: boolean;
  lastRefreshed?: Date;
  refresh: () => void;
  intervalSec?: number;
  isPaused: boolean;
  togglePause: () => void;
}

const intervalOptions = [
  // { label: '30 sec', value: 30 * 1000 },
  { label: '1 min', value: 60 * 1000 },
  { label: '5 min', value: 300 * 1000 },
  { label: '10 min', value: 600 * 1000 },
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
    <div className="w-[400px] gap-2 rounded-md mt-2 flex justify-end items-center">
      <div className="text-sm text-default-600">
        {lastRefreshed && (
          <span className="ml-2 whitespace-nowrap flex items-center">
            {/* Animated dot: green if !isPaused, orange if isPaused */}
            <span className="relative flex h-2 w-2 mr-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  isPaused ? 'bg-orange-400' : 'bg-green-400 animate-ping '
                } opacity-75`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isPaused ? 'bg-orange-500' : 'bg-green-500'
                }`}
              ></span>
            </span>
            Last refreshed: {lastRefreshed.toLocaleTimeString()}
          </span>
        )}
      </div>
      <Tooltip
        content={isPaused ? 'Start Auto Refresh' : 'Pause Auto Refresh'}
        disableAnimation={true}
      >
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onClick={togglePause}
          className="min-w-0"
        >
          {isPaused ? (
            <Play className="w-4 h-4" />
          ) : (
            <Pause className="w-4 h-4" />
          )}
        </Button>
      </Tooltip>
      <span className={isRefreshing ? 'animate-spin' : ''}>
        <RefreshCcw className="w-5 h-5 cursor-pointer" onClick={refresh} />
      </span>
      <Select
        size="sm"
        className="w-28"
        selectedKeys={[refreshInterval?.toString() || '60000']}
        onChange={(e) => onIntervalChange(Number(e.target.value))}
        aria-label="Select refresh interval"
        placeholder="Interval"
        isDisabled={isPaused}
      >
        {intervalOptions.map((opt) => (
          <SelectItem key={opt.value} textValue={opt.label}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default AutoRefreshBar;
