"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface HealthMonitoringTableProps {
  table: Table<any>;
  isLoading: boolean;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export default function HealthMonitoringTable({
  table,
  isLoading,
  pagination,
  onPageChange,
}: HealthMonitoringTableProps) {
  return (
    <Card className="w-full h-[50vh]">
      <CardBody className="p-0 h-[50vh]">
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
                    colSpan={table.getAllColumns().length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading health data...</span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No health data found
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
                  onClick={() => onPageChange(pagination.currentPage - 1)}
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
                          onClick={() => onPageChange(pageNum)}
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
                          onClick={() => onPageChange(pagination.currentPage)}
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
                          key={pagination.totalPages}
                          size="sm"
                          variant="bordered"
                          onClick={() => onPageChange(pagination.totalPages)}
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
                  onClick={() => onPageChange(pagination.currentPage + 1)}
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
