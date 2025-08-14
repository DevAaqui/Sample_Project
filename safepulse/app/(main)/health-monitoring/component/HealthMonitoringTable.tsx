"use client";

import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  getStatusColor,
  getHeartRateColor,
  getStressLevelColor,
  healthStatusOptions,
} from "./commonHealthFunc";

// Define the type for health data
interface HealthData {
  id: number;
  initials: string;
  fullName: string;
  age: number;
  heartRate: {
    value: number;
    color: string;
    unit: string;
  };
  bloodPressure: string;
  temperature: {
    value: number;
    unit: string;
    status: string;
  };
  stressLevel: {
    value: string;
    color: string;
  };
  healthStatus: {
    value: string;
    color: string;
  };
  lastCheck: string;
  rawMetrics: any;
}

// Define pagination response type
interface PaginationResponse {
  guests: HealthData[];
  summaryStats: any;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

interface HealthMonitoringTableProps {
  initialData?: PaginationResponse;
  onRowClick?: (row: HealthData) => void;
  onPageChange?: (
    page: number,
    pageSize: number
  ) => Promise<PaginationResponse>;
  onSearch?: (query: string) => Promise<PaginationResponse>;
  onStatusFilter?: (status: string) => Promise<PaginationResponse>;
  onSort?: (sorting: SortingState) => Promise<PaginationResponse>;
}

export default function HealthMonitoringTable({
  initialData,
  onRowClick,
  onPageChange,
  onSearch,
  onStatusFilter,
  onSort,
}: HealthMonitoringTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("all");

  // Server-side pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Data and loading states
  const [data, setData] = useState<HealthData[]>(initialData?.guests || []);
  const [paginationInfo, setPaginationInfo] = useState(
    initialData?.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize with initial data
  useEffect(() => {
    if (initialData) {
      setData(initialData.guests);
      setPaginationInfo(initialData.pagination);
      setPagination({
        pageIndex: initialData.pagination.currentPage - 1,
        pageSize: initialData.pagination.limit,
      });
    }
  }, [initialData]);

  // Handle pagination change
  const handlePageChange = async (newPage: number) => {
    if (!onPageChange) return;

    setIsLoading(true);
    try {
      const response = await onPageChange(newPage, pagination.pageSize);
      setData(response.guests);
      setPaginationInfo(response.pagination);
      setPagination({
        pageIndex: newPage - 1,
        pageSize: pagination.pageSize,
      });
    } catch (error) {
      console.error("Failed to fetch page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setGlobalFilter(query);

    if (!onSearch || !query.trim()) {
      // Reset to first page if no search query
      if (paginationInfo.currentPage !== 1) {
        await handlePageChange(1);
      }
      return;
    }

    setIsLoading(true);
    try {
      const response = await onSearch(query);
      setData(response.guests);
      setPaginationInfo(response.pagination);
      setPagination({
        pageIndex: 0, // Reset to first page on search
        pageSize: response.pagination.limit,
      });
    } catch (error) {
      console.error("Failed to search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle status filter
  const handleStatusFilter = async (status: string) => {
    setSelectedHealthStatus(status);

    if (!onStatusFilter || status === "all") {
      // Reset to first page if no filter
      if (paginationInfo.currentPage !== 1) {
        await handlePageChange(1);
      }
      return;
    }

    setIsLoading(true);
    try {
      const response = await onStatusFilter(status);
      setData(response.guests);
      setPaginationInfo(response.pagination);
      setPagination({
        pageIndex: 0, // Reset to first page on filter
        pageSize: response.pagination.limit,
      });
    } catch (error) {
      console.error("Failed to filter by status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sorting
  const handleSortingChange = async (newSorting: SortingState) => {
    setSorting(newSorting);

    if (!onSort) return;

    setIsLoading(true);
    try {
      const response = await onSort(newSorting);
      setData(response.guests);
      setPaginationInfo(response.pagination);
      // Keep current page when sorting
    } catch (error) {
      console.error("Failed to sort:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define columns
  const columns: ColumnDef<HealthData>[] = useMemo(
    () => [
      {
        accessorKey: "fullName",
        header: "Guest",
        cell: ({ row }) => {
          const guest = row.original;
          return (
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {guest.initials}
                </span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {guest.fullName}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue() as number}</span>
        ),
      },
      {
        accessorKey: "heartRate",
        header: "Heart Rate",
        cell: ({ row }) => {
          const heartRate = row.original.heartRate;
          return (
            <span
              className={`text-sm font-medium ${getHeartRateColor(heartRate.value)}`}
            >
              {heartRate.value} {heartRate.unit}
            </span>
          );
        },
      },
      {
        accessorKey: "bloodPressure",
        header: "Blood Pressure",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: "temperature",
        header: "Temperature",
        cell: ({ row }) => {
          const temp = row.original.temperature;
          return (
            <span className="text-sm text-gray-900">
              {temp.value} {temp.unit}
            </span>
          );
        },
      },
      {
        accessorKey: "stressLevel",
        header: "Stress Level",
        cell: ({ row }) => {
          const stress = row.original.stressLevel;
          return (
            <span
              className={`text-sm font-medium ${getStressLevelColor(stress.value)}`}
            >
              {stress.value}
            </span>
          );
        },
      },
      {
        accessorKey: "healthStatus",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.healthStatus;
          return (
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status.value)}`}
            >
              {status.value}
            </span>
          );
        },
      },
      {
        accessorKey: "lastCheck",
        header: "Last Check",
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          if (isNaN(date.getTime())) return "Invalid Date";
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          return (
            <span className="text-sm text-gray-900">
              {hours}:{minutes}
            </span>
          );
        },
      },
    ],
    []
  );

  // Initialize table (without pagination model since we handle it manually)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: handleSortingChange as OnChangeFn<SortingState>,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true, // Tell TanStack Table we're handling pagination
    manualSorting: true, // Tell TanStack Table we're handling sorting
    manualFiltering: true, // Tell TanStack Table we're handling filtering
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    pageCount: paginationInfo.totalPages,
  });

  // Handle row click
  const handleRowClick = (row: HealthData) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <Card className="w-full">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Guest Health Status
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Global Search */}
            <Input
              placeholder="Search all columns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              }
              size="sm"
              className="w-full sm:w-64"
            />

            {/* Health Status Filter */}
            <Select
              selectedKeys={[selectedHealthStatus]}
              onSelectionChange={(keys) =>
                handleStatusFilter(Array.from(keys)[0] as string)
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
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-0">
        {/* Table */}
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
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="text-gray-400">
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
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading health data...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No health data found
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={`hover:bg-gray-50 ${onRowClick ? "cursor-pointer" : ""}`}
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((column: any, cellIndex: any) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {flexRender(column.cell, {
                          getValue: () => {
                            const value = row[column.id as keyof HealthData];
                            return value;
                          },
                          row: {
                            ...row,
                            original: row,
                            index: index,
                            id: row.id || index.toString(),
                          } as any,
                          column: {
                            ...column,
                            id: column.id,
                          },
                          table: table,
                        })}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Server-side Pagination */}
        {paginationInfo && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <span>
                  Showing{" "}
                  {(paginationInfo.currentPage - 1) * paginationInfo.limit + 1}{" "}
                  to{" "}
                  {Math.min(
                    paginationInfo.currentPage * paginationInfo.limit,
                    paginationInfo.totalCount
                  )}{" "}
                  of {paginationInfo.totalCount} results
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="bordered"
                  isDisabled={!paginationInfo.hasPrevPage || isLoading}
                  onClick={() =>
                    handlePageChange(paginationInfo.currentPage - 1)
                  }
                  startContent={<ChevronLeftIcon className="w-4 h-4" />}
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from(
                    { length: Math.min(5, paginationInfo.totalPages) },
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          size="sm"
                          variant={
                            pageNum === paginationInfo.currentPage
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

                  {paginationInfo.totalPages > 5 && (
                    <>
                      {paginationInfo.currentPage > 3 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                      {paginationInfo.currentPage > 3 && (
                        <Button
                          size="sm"
                          variant="bordered"
                          onClick={() =>
                            handlePageChange(paginationInfo.currentPage)
                          }
                          className="min-w-[40px]"
                          isDisabled={isLoading}
                        >
                          {paginationInfo.currentPage}
                        </Button>
                      )}
                      {paginationInfo.currentPage <
                        paginationInfo.totalPages - 2 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                      {paginationInfo.currentPage <
                        paginationInfo.totalPages - 2 && (
                        <Button
                          key={paginationInfo.totalPages}
                          size="sm"
                          variant="bordered"
                          onClick={() =>
                            handlePageChange(paginationInfo.totalPages)
                          }
                          className="min-w-[40px]"
                          isDisabled={isLoading}
                        >
                          {paginationInfo.totalPages}
                        </Button>
                      )}
                    </>
                  )}
                </div>

                <Button
                  size="sm"
                  variant="bordered"
                  isDisabled={!paginationInfo.hasNextPage || isLoading}
                  onClick={() =>
                    handlePageChange(paginationInfo.currentPage + 1)
                  }
                  endContent={<ChevronRightIcon className="w-4 h-4" />}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
