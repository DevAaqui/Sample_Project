"use client";

import { useState, useMemo } from "react";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody, Input } from "@heroui/react";
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


export default function GuestsPage({ guestsData }: { guestsData: Guest[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // Use the actual data from props instead of hardcoded data
  const guests: Guest[] = guestsData || [];

  // Filter data with correct field name
  const filteredData = useMemo(() => {
    return guests.filter(
      (guest) =>
        guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [guests, searchTerm]);

  // Create table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  // Calculate stats from real data
  const stats = useMemo(() => {
    const totalGuests = guests.length;
    const healthyGuests = guests.filter((g) => g.healthScore >= 80).length;
    const needsAttention = guests.filter(
      (g) => g.healthScore < 80 && g.healthScore >= 60
    ).length;
    const avgHealthScore =
      guests.length > 0
        ? Math.round(
            guests.reduce((sum, g) => sum + g.healthScore, 0) / guests.length
          )
        : 0;

    return {
      total: totalGuests,
      healthy: healthyGuests,
      needsAttention: needsAttention,
      avgHealthScore: avgHealthScore,
    };
  }, [guests]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Guest Management</h1>
        <p className="text-gray-600">
          Monitor and manage guest activities and health metrics
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-6">
        <Input
          type="text"
          placeholder="Search guests by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
