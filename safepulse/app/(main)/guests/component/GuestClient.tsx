// safepulse/app/(main)/guests/component/GuestClient.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody, Input, Button } from "@heroui/react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { Guest } from "@/app/utils/GuestAPI/guestInterface";
import { columns } from "./commonGuestFunc";
import {
  fetchGuests,
  setSearchTerm,
  setCurrentPage,
  selectFilteredGuests,
  selectPagination,
  selectLoading,
  selectError,
  selectCurrentPage,
  selectSearchTerm,
  selectGuestStats,
} from "@/redux/slices/guestSlice";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks/reduxHook";
import { useAutoRefresh } from "@/redux/reduxHooks/useAutoRefresh";
import { RootState } from "@/redux/store/store";
import { setPageCallbackFunc } from "@/redux/slices/headerSlice";

interface GuestClientProps {
  initialGuests: Guest[];
  initialPagination: any;
}

export default function GuestsPage({
  initialGuests,
  initialPagination,
}: GuestClientProps) {
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = useState<SortingState>([]);

  // Redux selectors
  const guests = useAppSelector(selectFilteredGuests);
  const pagination = useAppSelector(selectPagination);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const currentPage = useAppSelector(selectCurrentPage);
  const searchTerm = useAppSelector(selectSearchTerm);
  const stats = useAppSelector(selectGuestStats);

  // Create a stable callback function for auto-refresh
  const fetchPageData = useMemo(() => {
    return async () => {
      console.log("Auto-refresh fetching page:", currentPage);
      await dispatch(fetchGuests(currentPage));
    };
  }, [dispatch, currentPage]);

  // Create table instance
  const table = useReactTable({
    data: guests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  // Handle search
  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchGuests(page));
  };

  // Initialize with server-side data
  useEffect(() => {
    if (initialGuests.length > 0) {
      // Dispatch an action to set initial data
      dispatch({
        type: "guest/fetchGuests/fulfilled",
        payload: {
          guests: initialGuests,
          pagination: initialPagination,
        },
      });
    }
  }, [dispatch, initialGuests, initialPagination]);

  useEffect(() => {
    dispatch(setPageCallbackFunc(fetchPageData));
  }, [dispatch, fetchPageData]);

  // Update loading state to include auto-refresh
  const isLoading = loading;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Guest Management</h1>
        <p className="text-gray-600">
          Monitor and manage guest activities and health metrics
        </p>
        {/* Show current refresh status */}
        {/* <div className="mt-2 text-sm text-gray-500">
          {isRefreshing ? (
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Auto-refresh: {refreshInterval}{" "}
              {lastRefreshed && `(Next: ${lastRefreshed})`}
            </span>
          ) : isPaused ? (
            <span className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              Auto-refresh paused
            </span>
          ) : (
            <span className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
              Manual refresh
            </span>
          )}
        </div> */}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-6">
        <Input
          type="text"
          placeholder="Search guests by name or email..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          variant="bordered"
          size="lg"
          className="w-full"
          startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
          endContent={<FunnelIcon className="w-4 h-4" />}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Guests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Healthy Guests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.healthy}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Needs Attention
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.needsAttention}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Health Score
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.avgHealthScore}%
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Guests</h3>
        </div>
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
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading guests...</span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
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
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1}{" "}
                  to{" "}
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
                          onClick={() =>
                            handlePageChange(pagination.currentPage)
                          }
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
                          onClick={() =>
                            handlePageChange(pagination.totalPages)
                          }
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
      </div>
    </div>
  );
}
