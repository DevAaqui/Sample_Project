"use client";

import { useEffect, useMemo, useState } from "react";

import { calculateStats, generateAlerts } from "./commonHealthFunc";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks/reduxHook";
import {
  fetchGuestsHealth,
  selectCurrentPageHealth,
  selectErrorHealth,
  selectFilteredGuestsHealth,
  selectLoadingHealth,
  selectPaginationHealth,
  selectSearchTermHealth,
  setCurrentPage,
  setSearchTerm,
} from "@/redux/slices/guestsHealthSlice";
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { columns, HealthData } from "./columns";
import HealthMonitoringCharts from "./HealthMonitorCharts";
import HealthAlertsTable from "./AlertTable";
import HealthStatsCards from "./StatsCard";
import HealthFilters from "./HealthFilter";
import HealthMonitoringTable from "./MonitorTable";

export default function HealthMonitoringClient({
  initialGuestsHealthData,
  initialPaginationHealthData,
}: {
  initialGuestsHealthData: any;
  initialPaginationHealthData: any;
}) {
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("all");
  const guestsHealth = useAppSelector(selectFilteredGuestsHealth);
  const pagination = useAppSelector(selectPaginationHealth);
  const error = useAppSelector(selectErrorHealth);
  const currentPage = useAppSelector(selectCurrentPageHealth);
  const searchTerm = useAppSelector(selectSearchTermHealth);
  const isLoading = useAppSelector(selectLoadingHealth);

  const fetchPageData = useMemo(() => {
    return async () => {
      console.log("Auto-refresh fetching page:", currentPage);
      await dispatch(fetchGuestsHealth(currentPage));
    };
  }, [dispatch, currentPage]);

  const statsData = calculateStats(guestsHealth);

  const table = useReactTable({
    data: guestsHealth as unknown as HealthData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value)); // We can use it later on
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchGuestsHealth(page));
  };

  useEffect(() => {
    if (initialGuestsHealthData.length > 0) {
      // Dispatch an action to set initial data
      dispatch({
        type: "guestHealth/fetchGuestsHealth/fulfilled",
        payload: {
          guests: initialGuestsHealthData,
          pagination: initialPaginationHealthData,
        },
      });
    }
  }, [dispatch, initialGuestsHealthData, initialPaginationHealthData]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Monitoring</h1>
        <p className="text-gray-600">
          Real-time health monitoring and alert management
        </p>
      </div>

      {/* Stats Cards */}
      <HealthStatsCards statsData={statsData} />

      {/* Filters and Controls */}
      <HealthFilters
        searchQuery={searchTerm}
        selectedTimeRange={selectedTimeRange}
        selectedHealthStatus={selectedHealthStatus}
        onSearchChange={handleSearchChange}
        onTimeRangeChange={setSelectedTimeRange}
        onHealthStatusChange={setSelectedHealthStatus}
        onFilterClick={() => {
          // Add your filter logic here
          console.log("Filter clicked");
        }}
      />

      {/* Health Monitoring Table */}
      <HealthMonitoringTable
        table={table}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />

      {/* Health Alerts */}
      <HealthAlertsTable alerts={generateAlerts(guestsHealth)} />

      {/* Health Metrics Charts */}
      <HealthMonitoringCharts
        initialGuestsHealthData={initialGuestsHealthData}
      />
    </div>
  );
}
