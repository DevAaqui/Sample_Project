"use client";

import { useEffect, useMemo, useState } from "react";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import {
  timeRangeOptions,
  healthStatusOptions,
  getColorClasses,
  getHeartRateColor,
  getStressLevelColor,
  getStatusColor,
  getAlertSeverityColor,
  calculateStats,
  generateAlerts,
} from "./commonHealthFunc";
import HealthMonitoringTable from "./HealthMonitoringTable";
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
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { fetchGuests } from "@/redux/slices/guestSlice";

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
  const [searchQuery, setSearchQuery] = useState("");
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

  const statsData = calculateStats(initialGuestsHealthData);

  const stats = [
    {
      title: "Total Monitored",
      value: statsData.totalMonitored.toString(),
      change: "+8%",
      changeType: "positive",
      icon: UserGroupIcon,
      color: "blue",
    },
    {
      title: "Normal Status",
      value: statsData.normalStatus.toString(),
      change: "+5%",
      changeType: "positive",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      title: "Active Alerts",
      value: statsData.activeAlerts.toString(),
      change: "-25%",
      changeType: "positive",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
    {
      title: "Health Score",
      value: `${statsData.avgHealthScore}%`,
      change: "+2%",
      changeType: "positive",
      icon: HeartIcon,
      color: "purple",
    },
  ];

  const alerts = generateAlerts(initialGuestsHealthData);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const colorClasses = getColorClasses(stat.color);
          return (
            <Card key={stat.title}>
              <CardBody>
                <div className="flex items-center">
                  <div className={`p-2 ${colorClasses.bg} rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${colorClasses.text}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} from yesterday
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              aria-label="Search guests"
              type="text"
              placeholder="Search guests..."
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="w-full"
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            aria-label="Select time range"
            selectedKeys={[selectedTimeRange]}
            onSelectionChange={(keys) =>
              setSelectedTimeRange(Array.from(keys)[0] as string)
            }
            size="sm"
            className="min-w-[140px]"
          >
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            aria-label="Select health status"
            selectedKeys={[selectedHealthStatus]}
            onSelectionChange={(keys) =>
              setSelectedHealthStatus(Array.from(keys)[0] as string)
            }
            size="sm"
            className="min-w-[140px]"
          >
            {healthStatusOptions.map((option) => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            size="sm"
            variant="bordered"
            startContent={<FunnelIcon className="h-5 w-5" />}
            className="px-4"
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Health Monitoring Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="ml-1">
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? " ↕️"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2">Loading guests...</span>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No guests found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              <span>
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.totalCount
                )}{" "}
                of {pagination.totalCount} results
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="bordered"
                isDisabled={!pagination.hasPrevPage || isLoading}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                startContent={<ChevronLeftIcon className="w-4 h-4" />}
              >
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        size="sm"
                        variant={
                          pageNum === pagination.currentPage
                            ? "solid"
                            : "bordered"
                        }
                        onClick={() => handlePageChange(pageNum)}
                        className="min-w-[40px]"
                        isDisabled={isLoading}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}

                {pagination.totalPages > 5 && (
                  <>
                    {pagination.currentPage > 3 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    {pagination.currentPage > 3 && (
                      <Button
                        size="sm"
                        variant="bordered"
                        onClick={() => handlePageChange(pagination.currentPage)}
                        className="min-w-[40px]"
                        isDisabled={isLoading}
                      >
                        {pagination.currentPage}
                      </Button>
                    )}
                    {pagination.currentPage < pagination.totalPages - 2 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    {pagination.currentPage < pagination.totalPages - 2 && (
                      <Button
                        size="sm"
                        variant="bordered"
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className="min-w-[40px]"
                        isDisabled={isLoading}
                      >
                        {pagination.totalPages}
                      </Button>
                    )}
                  </>
                )}
              </div>

              <Button
                size="sm"
                variant="bordered"
                isDisabled={!pagination.hasNextPage || isLoading}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                endContent={<ChevronRightIcon className="w-4 h-4" />}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Health Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Health Alerts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {alert.guestName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAlertSeverityColor(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      const date = new Date(alert.timestamp);
                      if (isNaN(date.getTime())) return "Invalid Date";
                      const hours = date.getHours().toString().padStart(2, "0");
                      const minutes = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      return `${hours}:${minutes}`;
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        alert.status === "Active"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Health Metrics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Score Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Health Status Distribution
          </h3>
          <div className="space-y-4">
            {(() => {
              if (!initialGuestsHealthData) return null;

              const statusCounts = initialGuestsHealthData.reduce(
                (acc: any, guest: any) => {
                  const status = guest.healthStatus.value;
                  acc[status] = (acc[status] || 0) + 1;
                  return acc;
                },
                {}
              );

              const total = initialGuestsHealthData.length;

              return Object.entries(statusCounts).map(
                ([status, count]: [string, any]) => {
                  const percentage = Math.round((count / total) * 100);
                  const color =
                    status === "Excellent"
                      ? "bg-green-600"
                      : status === "Good"
                        ? "bg-blue-600"
                        : status === "Fair"
                          ? "bg-yellow-600"
                          : status === "Poor"
                            ? "bg-orange-600"
                            : "bg-red-600";

                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">{status}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`${color} h-2 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                }
              );
            })()}
          </div>
        </div>

        {/* Alert Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alert Trends (Last 7 Days)
          </h3>
          <div className="space-y-3">
            {[
              { day: "Monday", alerts: 5, resolved: 4 },
              { day: "Tuesday", alerts: 3, resolved: 3 },
              { day: "Wednesday", alerts: 7, resolved: 6 },
              { day: "Thursday", alerts: 4, resolved: 3 },
              { day: "Friday", alerts: 6, resolved: 5 },
              { day: "Saturday", alerts: 8, resolved: 7 },
              { day: "Sunday", alerts: 3, resolved: 2 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.day}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${(item.alerts / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.alerts}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(item.resolved / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.resolved}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
