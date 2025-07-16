"use client";

import { useState } from "react";
import {
  ShoppingBagIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function RidesPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const rides = [
    {
      id: 1,
      name: "Roller Coaster A",
      type: "Thrill",
      status: "Operational",
      healthScore: 95,
      currentGuests: 24,
      maxCapacity: 30,
      waitTime: "15 min",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-02-15",
    },
    {
      id: 2,
      name: "Ferris Wheel",
      type: "Family",
      status: "Operational",
      healthScore: 88,
      currentGuests: 18,
      maxCapacity: 20,
      waitTime: "8 min",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-02-10",
    },
    {
      id: 3,
      name: "Water Slide",
      type: "Water",
      status: "Maintenance",
      healthScore: 72,
      currentGuests: 0,
      maxCapacity: 15,
      waitTime: "Closed",
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-01-25",
    },
    {
      id: 4,
      name: "Carousel",
      type: "Family",
      status: "Operational",
      healthScore: 92,
      currentGuests: 12,
      maxCapacity: 16,
      waitTime: "5 min",
      lastMaintenance: "2024-01-12",
      nextMaintenance: "2024-02-12",
    },
    {
      id: 5,
      name: "Roller Coaster B",
      type: "Thrill",
      status: "Operational",
      healthScore: 89,
      currentGuests: 28,
      maxCapacity: 32,
      waitTime: "22 min",
      lastMaintenance: "2024-01-18",
      nextMaintenance: "2024-02-18",
    },
  ];

  const filteredRides =
    selectedStatus === "all"
      ? rides
      : rides.filter((ride) => ride.status.toLowerCase() === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Thrill":
        return "bg-red-100 text-red-800";
      case "Family":
        return "bg-blue-100 text-blue-800";
      case "Water":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCapacityPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ride Management</h1>
        <p className="text-gray-600">
          Monitor ride status, health metrics, and guest capacity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rides</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Operational</p>
              <p className="text-2xl font-bold text-gray-900">10</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
              <p className="text-2xl font-bold text-gray-900">12m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedStatus === "all"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Rides
          </button>
          <button
            onClick={() => setSelectedStatus("operational")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedStatus === "operational"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Operational
          </button>
          <button
            onClick={() => setSelectedStatus("maintenance")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedStatus === "maintenance"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Maintenance
          </button>
          <button
            onClick={() => setSelectedStatus("closed")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedStatus === "closed"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Rides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {ride.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                      ride.type
                    )}`}
                  >
                    {ride.type}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      ride.status
                    )}`}
                  >
                    {ride.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-lg font-bold ${getHealthScoreColor(
                    ride.healthScore
                  )}`}
                >
                  {ride.healthScore}
                </span>
                <p className="text-xs text-gray-500">Health Score</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Capacity */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Capacity</span>
                  <span className="text-gray-900">
                    {ride.currentGuests}/{ride.maxCapacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCapacityColor(
                      getCapacityPercentage(
                        ride.currentGuests,
                        ride.maxCapacity
                      )
                    )}`}
                    style={{
                      width: `${getCapacityPercentage(
                        ride.currentGuests,
                        ride.maxCapacity
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Wait Time */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Wait Time</span>
                <span className="text-sm font-medium text-gray-900">
                  {ride.waitTime}
                </span>
              </div>

              {/* Maintenance */}
              <div className="text-xs text-gray-500">
                <div>Last Maintenance: {ride.lastMaintenance}</div>
                <div>Next Maintenance: {ride.nextMaintenance}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
