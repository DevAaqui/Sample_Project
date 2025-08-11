// hooks/RefreshHook.ts
import { RootState } from '@/redux/store/store';
import { useAppSelector } from './reduxHook';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { togglePause } from '@/redux/slices/headerSlice';
export const useAutoRefresh = (callback: () => void, interval: number) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const isPaused = useAppSelector(
    (state: RootState) => state.header.isPaused
  );
  const intervalRef = useRef<NodeJS.Timeout>();

  // Function to perform the refresh
  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await callback();
      setLastRefreshed(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  // Function to toggle pause state
  const togglePauseFunc = () => {
    dispatch(togglePause());
  };

  // Effect to handle interval changes
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only set up interval if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(refresh, interval);
      // Initial refresh
      // refresh();
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, callback, isPaused]); // Add isPaused to dependency array

  return {
    isRefreshing,
    refresh,
    lastRefreshed,
    isPaused,
    togglePauseFunc,
  };
};
