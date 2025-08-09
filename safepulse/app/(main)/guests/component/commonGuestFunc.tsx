import { Guest } from "@/app/utils/GuestAPI/guestInterface";
import { createColumnHelper } from "@tanstack/react-table";

// Column helper
export const columnHelper = createColumnHelper<Guest>();

// Define columns with correct field names
export const columns = [
  columnHelper.accessor("fullName", {
    header: "Guest",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {row.original.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            {row.original.fullName}
          </div>
          <div className="text-xs text-gray-500">{row.original.email}</div>
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
        <div className="flex items-center">
          <span className={`text-sm font-medium ${color}`}>{score}%</span>
          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${score >= 90 ? "bg-green-500" : score >= 80 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-900">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("lastRide", {
    header: "Last Ride",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-900">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("totalTimeSpent", {
    header: "Total Time Spent",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-900">{getValue()}</span>
    ),
  }),
];
