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

// Define the guest type
type Guest = {
  id: number;
  name: string;
  age: number;
  healthScore: number;
  status: string;
  lastRide: string;
  timeSpent: string;
};

export default function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const guests: Guest[] = [
    {
      id: 1,
      name: "John Smith",
      age: 28,
      healthScore: 85,
      status: "Active",
      lastRide: "Roller Coaster A",
      timeSpent: "2h 15m",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 32,
      healthScore: 92,
      status: "Active",
      lastRide: "Ferris Wheel",
      timeSpent: "1h 45m",
    },
    {
      id: 3,
      name: "Mike Davis",
      age: 25,
      healthScore: 78,
      status: "Resting",
      lastRide: "Water Slide",
      timeSpent: "3h 20m",
    },
    {
      id: 4,
      name: "Emily Wilson",
      age: 19,
      healthScore: 88,
      status: "Active",
      lastRide: "Carousel",
      timeSpent: "1h 30m",
    },
    {
      id: 5,
      name: "David Brown",
      age: 35,
      healthScore: 95,
      status: "Active",
      lastRide: "Roller Coaster B",
      timeSpent: "2h 45m",
    },
  ];

  // Column helper
  const columnHelper = createColumnHelper<Guest>();

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Guest",
        cell: ({ row }) => (
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {row.original.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {row.original.name}
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("age", {
        header: "Age",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("healthScore", {
        header: "Health Score",
        cell: ({ getValue }) => {
          const score = getValue();
          const color =
            score >= 90
              ? "text-green-600"
              : score >= 80
                ? "text-yellow-600"
                : "text-red-600";
          return (
            <span className={`text-sm font-medium ${color}`}>{score}</span>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue();
          const getStatusColor = (status: string) => {
            switch (status) {
              case "Active":
                return "bg-green-100 text-green-800";
              case "Resting":
                return "bg-yellow-100 text-yellow-800";
              case "Inactive":
                return "bg-gray-100 text-gray-800";
              default:
                return "bg-gray-100 text-gray-800";
            }
          };
          return (
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}
            >
              {status}
            </span>
          );
        },
      }),
      columnHelper.accessor("lastRide", {
        header: "Last Ride",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("timeSpent", {
        header: "Time Spent",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue()}</span>
        ),
      }),
    ],
    []
  );

  // Filter data
  const filteredData = useMemo(() => {
    return guests.filter((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
          placeholder="Search guests..."
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
                <p className="text-2xl font-bold text-gray-900">1,247</p>
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
                  Active Guests
                </p>
                <p className="text-2xl font-bold text-gray-900">892</p>
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
                <p className="text-sm font-medium text-gray-600">Resting</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
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
                <p className="text-2xl font-bold text-gray-900">87.6</p>
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
