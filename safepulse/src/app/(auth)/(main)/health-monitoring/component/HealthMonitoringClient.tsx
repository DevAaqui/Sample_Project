"use client";

import { useState } from "react";
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

export default function HealthMonitoringClient() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("all");

  const healthData = [
    {
      id: 1,
      guestName: "John Smith",
      age: 28,
      heartRate: 145,
      bloodPressure: "120/80",
      temperature: 98.6,
      stressLevel: "Medium",
      lastCheck: "2024-01-15 14:30",
      status: "Normal",
      alerts: [],
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      age: 32,
      heartRate: 72,
      bloodPressure: "110/70",
      temperature: 97.8,
      stressLevel: "Low",
      lastCheck: "2024-01-15 14:15",
      status: "Excellent",
      alerts: [],
    },
    {
      id: 3,
      guestName: "Mike Davis",
      age: 25,
      heartRate: 125,
      bloodPressure: "118/78",
      temperature: 99.2,
      stressLevel: "Medium",
      lastCheck: "2024-01-15 14:00",
      status: "Normal",
      alerts: [],
    },
    {
      id: 4,
      guestName: "Emily Wilson",
      age: 19,
      heartRate: 85,
      bloodPressure: "105/65",
      temperature: 98.1,
      stressLevel: "Low",
      lastCheck: "2024-01-15 13:45",
      status: "Excellent",
      alerts: [],
    },
    {
      id: 5,
      guestName: "David Brown",
      age: 35,
      heartRate: 155,
      bloodPressure: "135/85",
      temperature: 100.1,
      stressLevel: "High",
      lastCheck: "2024-01-15 13:30",
      status: "Warning",
      alerts: ["Elevated heart rate", "High stress level"],
    },
  ];

  const alerts = [
    {
      id: 1,
      guestName: "David Brown",
      type: "High Heart Rate",
      severity: "Warning",
      message: "Heart rate elevated to 155 bpm",
      timestamp: "2024-01-15 13:30",
      status: "Active",
    },
    {
      id: 2,
      guestName: "Lisa Anderson",
      type: "High Stress",
      severity: "Warning",
      message: "Stress level detected as high",
      timestamp: "2024-01-15 13:15",
      status: "Resolved",
    },
    {
      id: 3,
      guestName: "Tom Wilson",
      type: "Blood Pressure",
      severity: "Alert",
      message: "Blood pressure reading: 140/90",
      timestamp: "2024-01-15 13:00",
      status: "Active",
    },
  ];

  const stats = [
    {
      title: "Total Monitored",
      value: "1,247",
      change: "+8%",
      changeType: "positive",
      icon: UserGroupIcon,
      color: "blue",
    },
    {
      title: "Normal Status",
      value: "1,180",
      change: "+5%",
      changeType: "positive",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      title: "Active Alerts",
      value: "3",
      change: "-25%",
      changeType: "positive",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
    {
      title: "Avg Health Score",
      value: "87.6",
      change: "+2%",
      changeType: "positive",
      icon: HeartIcon,
      color: "purple",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Normal":
        return "bg-blue-100 text-blue-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Alert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alert":
        return "bg-red-100 text-red-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHeartRateColor = (heartRate: number) => {
    if (heartRate > 140) return "text-red-600";
    if (heartRate > 120) return "text-yellow-600";
    if (heartRate < 60) return "text-blue-600";
    return "text-green-600";
  };

  const getStressLevelColor = (stressLevel: string) => {
    switch (stressLevel) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return { bg: "bg-blue-100", text: "text-blue-600" };
      case "green":
        return { bg: "bg-green-100", text: "text-green-600" };
      case "yellow":
        return { bg: "bg-yellow-100", text: "text-yellow-600" };
      case "red":
        return { bg: "bg-red-100", text: "text-red-600" };
      case "purple":
        return { bg: "bg-purple-100", text: "text-purple-600" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600" };
    }
  };

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
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
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
            </div>
          );
        })}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          <select
            value={selectedHealthStatus}
            onChange={(e) => setSelectedHealthStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="excellent">Excellent</option>
            <option value="normal">Normal</option>
            <option value="warning">Warning</option>
            <option value="alert">Alert</option>
          </select>

          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Health Monitoring Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Guest Health Status
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heart Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Pressure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stress Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Check
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {healthData.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {guest.guestName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {guest.guestName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${getHeartRateColor(
                        guest.heartRate
                      )}`}
                    >
                      {guest.heartRate} bpm
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.bloodPressure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.temperature}°F
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${getStressLevelColor(
                        guest.stressLevel
                      )}`}
                    >
                      {guest.stressLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        guest.status
                      )}`}
                    >
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      const date = new Date(guest.lastCheck);
                      if (isNaN(date.getTime())) return "Invalid Date";
                      const hours = date.getHours().toString().padStart(2, "0");
                      const minutes = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      return `${hours}:${minutes}`;
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
            Health Score Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Excellent (90-100)</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Good (80-89)</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fair (70-79)</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Poor (less than 70)</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "5%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">5%</span>
              </div>
            </div>
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
