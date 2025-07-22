"use client";

import { useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function AlertsNotificationsClient() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedAlertType, setSelectedAlertType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const alerts = [
    {
      id: 1,
      title: "High Heart Rate Alert",
      description: "Guest David Brown's heart rate elevated to 155 bpm",
      type: "Health",
      severity: "High",
      status: "Active",
      guestName: "David Brown",
      timestamp: "2024-01-15 14:30",
      priority: "Critical",
      assignedTo: "Dr. Sarah Johnson",
      location: "Roller Coaster A",
      read: false,
    },
    {
      id: 2,
      title: "Safety Protocol Violation",
      description: "Guest exceeded recommended ride frequency",
      type: "Safety",
      severity: "Medium",
      status: "Resolved",
      guestName: "Mike Davis",
      timestamp: "2024-01-15 14:15",
      priority: "High",
      assignedTo: "Safety Team",
      location: "Water Slide",
      read: true,
    },
    {
      id: 3,
      title: "Equipment Maintenance Required",
      description: "Ferris Wheel requires immediate inspection",
      type: "Equipment",
      severity: "High",
      status: "Active",
      guestName: "N/A",
      timestamp: "2024-01-15 14:00",
      priority: "Critical",
      assignedTo: "Maintenance Team",
      location: "Ferris Wheel",
      read: false,
    },
    {
      id: 4,
      title: "Weather Warning",
      description: "Incoming storm detected, recommend ride closure",
      type: "Weather",
      severity: "High",
      status: "Active",
      guestName: "N/A",
      timestamp: "2024-01-15 13:45",
      priority: "Critical",
      assignedTo: "Operations Manager",
      location: "All Rides",
      read: false,
    },
    {
      id: 5,
      title: "Guest Distress Signal",
      description: "Guest pressed emergency button on Carousel",
      type: "Emergency",
      severity: "Critical",
      status: "Resolved",
      guestName: "Emily Wilson",
      timestamp: "2024-01-15 13:30",
      priority: "Critical",
      assignedTo: "Security Team",
      location: "Carousel",
      read: true,
    },
    {
      id: 6,
      title: "Crowd Control Alert",
      description: "High crowd density detected in main plaza",
      type: "Crowd",
      severity: "Medium",
      status: "Active",
      guestName: "N/A",
      timestamp: "2024-01-15 13:15",
      priority: "Medium",
      assignedTo: "Operations Team",
      location: "Main Plaza",
      read: false,
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Daily Health Report",
      description: "Health monitoring summary for today",
      type: "Report",
      status: "Sent",
      timestamp: "2024-01-15 14:00",
      recipients: ["Management", "Health Team"],
      read: true,
    },
    {
      id: 2,
      title: "Equipment Status Update",
      description: "All rides operational and safe",
      type: "Status",
      status: "Sent",
      timestamp: "2024-01-15 13:30",
      recipients: ["Operations", "Safety Team"],
      read: false,
    },
    {
      id: 3,
      title: "Guest Capacity Alert",
      description: "Park reaching 85% capacity",
      type: "Capacity",
      status: "Pending",
      timestamp: "2024-01-15 13:00",
      recipients: ["Management", "Operations"],
      read: false,
    },
  ];

  const stats = [
    {
      title: "Total Alerts",
      value: "156",
      change: "+12%",
      changeType: "negative",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
    {
      title: "Active Alerts",
      value: "4",
      change: "-25%",
      changeType: "positive",
      icon: BellIcon,
      color: "yellow",
    },
    {
      title: "Resolved Today",
      value: "23",
      change: "+8%",
      changeType: "positive",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      title: "Avg Response Time",
      value: "2.3m",
      change: "-15%",
      changeType: "positive",
      icon: ClockIcon,
      color: "blue",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Sent":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Health":
        return "bg-red-100 text-red-800";
      case "Safety":
        return "bg-orange-100 text-orange-800";
      case "Equipment":
        return "bg-yellow-100 text-yellow-800";
      case "Weather":
        return "bg-blue-100 text-blue-800";
      case "Emergency":
        return "bg-red-100 text-red-800";
      case "Crowd":
        return "bg-purple-100 text-purple-800";
      case "Report":
        return "bg-green-100 text-green-800";
      case "Status":
        return "bg-blue-100 text-blue-800";
      case "Capacity":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        <h1 className="text-2xl font-bold text-gray-900">
          Alerts & Notifications
        </h1>
        <p className="text-gray-600">
          Manage real-time alerts and notification systems
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
              placeholder="Search alerts..."
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
            value={selectedAlertType}
            onChange={(e) => setSelectedAlertType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="health">Health</option>
            <option value="safety">Safety</option>
            <option value="equipment">Equipment</option>
            <option value="weather">Weather</option>
            <option value="emergency">Emergency</option>
            <option value="crowd">Crowd</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
          </select>

          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest/Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr
                  key={alert.id}
                  className={`hover:bg-gray-50 ${
                    !alert.read ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {!alert.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {alert.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {alert.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                        alert.type
                      )}`}
                    >
                      {alert.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {alert.guestName !== "N/A" ? alert.guestName : "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {alert.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.assignedTo}
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
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        alert.status
                      )}`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircleIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`hover:bg-gray-50 ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {notification.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                        notification.type
                      )}`}
                    >
                      {notification.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {notification.recipients.join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      const date = new Date(notification.timestamp);
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
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        notification.status
                      )}`}
                    >
                      {notification.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alert Distribution by Type
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Health Alerts</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Safety Alerts</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Equipment Alerts</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Other Alerts</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Response Time Trends (Last 7 Days)
          </h3>
          <div className="space-y-3">
            {[
              { day: "Monday", avgTime: "2.1m", resolved: 18 },
              { day: "Tuesday", avgTime: "1.8m", resolved: 22 },
              { day: "Wednesday", avgTime: "2.5m", resolved: 15 },
              { day: "Thursday", avgTime: "2.0m", resolved: 20 },
              { day: "Friday", avgTime: "2.3m", resolved: 17 },
              { day: "Saturday", avgTime: "2.8m", resolved: 25 },
              { day: "Sunday", avgTime: "2.2m", resolved: 19 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.day}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">
                    {item.avgTime}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({item.resolved} resolved)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
