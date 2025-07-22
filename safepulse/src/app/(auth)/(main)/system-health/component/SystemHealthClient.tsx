"use client";

import { useState } from "react";
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ServerIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  WifiIcon,
  CpuChipIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

export default function SystemHealthClient() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedSystemType, setSelectedSystemType] = useState("all");

  const systemComponents = [
    {
      id: 1,
      name: "Main Database Server",
      type: "Database",
      status: "Healthy",
      uptime: "99.9%",
      responseTime: "45ms",
      cpuUsage: 65,
      memoryUsage: 78,
      diskUsage: 45,
      lastCheck: "2024-01-15 14:30",
      location: "Data Center A",
      alerts: [],
    },
    {
      id: 2,
      name: "Load Balancer",
      type: "Network",
      status: "Warning",
      uptime: "98.5%",
      responseTime: "120ms",
      cpuUsage: 85,
      memoryUsage: 92,
      diskUsage: 30,
      lastCheck: "2024-01-15 14:25",
      location: "Data Center A",
      alerts: ["High CPU usage", "Memory pressure detected"],
    },
    {
      id: 3,
      name: "API Gateway",
      type: "Application",
      status: "Healthy",
      uptime: "99.8%",
      responseTime: "25ms",
      cpuUsage: 45,
      memoryUsage: 60,
      diskUsage: 20,
      lastCheck: "2024-01-15 14:20",
      location: "Data Center B",
      alerts: [],
    },
    {
      id: 4,
      name: "Monitoring System",
      type: "Monitoring",
      status: "Healthy",
      uptime: "99.9%",
      responseTime: "15ms",
      cpuUsage: 30,
      memoryUsage: 45,
      diskUsage: 35,
      lastCheck: "2024-01-15 14:15",
      location: "Data Center A",
      alerts: [],
    },
    {
      id: 5,
      name: "File Storage Server",
      type: "Storage",
      status: "Critical",
      uptime: "95.2%",
      responseTime: "500ms",
      cpuUsage: 95,
      memoryUsage: 98,
      diskUsage: 92,
      lastCheck: "2024-01-15 14:10",
      location: "Data Center B",
      alerts: [
        "Critical disk space",
        "High memory usage",
        "Slow response time",
      ],
    },
    {
      id: 6,
      name: "Backup Server",
      type: "Backup",
      status: "Healthy",
      uptime: "99.7%",
      responseTime: "80ms",
      cpuUsage: 25,
      memoryUsage: 40,
      diskUsage: 75,
      lastCheck: "2024-01-15 14:05",
      location: "Data Center C",
      alerts: [],
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      component: "Load Balancer",
      type: "Performance",
      severity: "Warning",
      message: "CPU usage exceeded 80% threshold",
      timestamp: "2024-01-15 14:25",
      status: "Active",
      assignedTo: "System Admin",
    },
    {
      id: 2,
      component: "File Storage Server",
      type: "Critical",
      severity: "Critical",
      message: "Disk space usage at 92%",
      timestamp: "2024-01-15 14:10",
      status: "Active",
      assignedTo: "Storage Team",
    },
    {
      id: 3,
      component: "API Gateway",
      type: "Network",
      severity: "Info",
      message: "Increased latency detected",
      timestamp: "2024-01-15 13:45",
      status: "Resolved",
      assignedTo: "Network Team",
    },
  ];

  const performanceMetrics = [
    {
      name: "Overall System Health",
      value: "87%",
      trend: "+2%",
      status: "Good",
      icon: ShieldCheckIcon,
      color: "green",
    },
    {
      name: "Average Response Time",
      value: "85ms",
      trend: "-12%",
      status: "Improving",
      icon: ClockIcon,
      color: "blue",
    },
    {
      name: "System Uptime",
      value: "99.7%",
      trend: "+0.1%",
      status: "Excellent",
      icon: ServerIcon,
      color: "green",
    },
    {
      name: "Active Alerts",
      value: "2",
      trend: "-50%",
      status: "Good",
      icon: ExclamationTriangleIcon,
      color: "yellow",
    },
  ];

  const stats = [
    {
      title: "Total Systems",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: ServerIcon,
      color: "blue",
    },
    {
      title: "Healthy Systems",
      value: "20",
      change: "+3",
      changeType: "positive",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      title: "Critical Alerts",
      value: "1",
      change: "-2",
      changeType: "positive",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
    {
      title: "Avg Uptime",
      value: "99.7%",
      change: "+0.1%",
      changeType: "positive",
      icon: ArrowTrendingUpIcon,
      color: "purple",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-100 text-green-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      case "Offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage > 90) return "text-red-600";
    if (usage > 75) return "text-yellow-600";
    if (usage > 50) return "text-blue-600";
    return "text-green-600";
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
        <h1 className="text-2xl font-bold text-gray-900">System Health</h1>
        <p className="text-gray-600">
          Monitor system performance and infrastructure health
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => {
          const colorClasses = getColorClasses(metric.color);
          return (
            <div
              key={metric.name}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-2 ${colorClasses.bg} rounded-lg`}>
                  <metric.icon className={`h-6 w-6 ${colorClasses.text}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {metric.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-green-600">
                    {metric.trend} from yesterday
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
              placeholder="Search systems..."
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
            value={selectedSystemType}
            onChange={(e) => setSelectedSystemType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Systems</option>
            <option value="database">Database</option>
            <option value="network">Network</option>
            <option value="application">Application</option>
            <option value="storage">Storage</option>
            <option value="backup">Backup</option>
            <option value="monitoring">Monitoring</option>
          </select>

          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* System Components */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            System Components
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  System
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Check
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systemComponents.map((system) => (
                <tr key={system.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {system.name}
                      </div>
                      {system.alerts.length > 0 && (
                        <div className="text-sm text-red-600">
                          {system.alerts.length} alert(s)
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {system.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        system.status
                      )}`}
                    >
                      {system.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.responseTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${getUsageColor(
                        system.cpuUsage
                      )}`}
                    >
                      {system.cpuUsage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${getUsageColor(
                        system.memoryUsage
                      )}`}
                    >
                      {system.memoryUsage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${getUsageColor(
                        system.diskUsage
                      )}`}
                    >
                      {system.diskUsage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      const date = new Date(system.lastCheck);
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

      {/* System Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systemAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {alert.component}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.type}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.message}
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

      {/* System Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Health Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Healthy</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "83%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">83%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Warning</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "13%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">13%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Critical</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "4%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Trends (Last 7 Days)
          </h3>
          <div className="space-y-3">
            {[
              { day: "Monday", uptime: "99.8%", responseTime: "75ms" },
              { day: "Tuesday", uptime: "99.9%", responseTime: "68ms" },
              { day: "Wednesday", uptime: "99.7%", responseTime: "82ms" },
              { day: "Thursday", uptime: "99.9%", responseTime: "71ms" },
              { day: "Friday", uptime: "99.6%", responseTime: "89ms" },
              { day: "Saturday", uptime: "99.8%", responseTime: "76ms" },
              { day: "Sunday", uptime: "99.9%", responseTime: "69ms" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.day}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">
                    {item.uptime}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.responseTime}
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
