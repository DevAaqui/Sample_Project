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
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";

const timeRangeOptions = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
];

// Health status options
const healthStatusOptions = [
  { key: "all", label: "All Status" },
  { key: "excellent", label: "Excellent" },
  { key: "good", label: "Good" },
  { key: "fair", label: "Fair" },
  { key: "poor", label: "Poor" },
  { key: "critical", label: "Critical" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-green-100 text-green-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Fair":
      return "bg-yellow-100 text-yellow-800";
    case "Poor":
      return "bg-orange-100 text-orange-800";
    case "Critical":
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
    case "Extreme":
      return "text-red-600";
    case "Very High":
      return "text-red-600";
    case "High":
      return "text-orange-600";
    case "Moderate":
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
    case "lightgreen":
      return { bg: "bg-green-100", text: "text-green-600" };
    case "orange":
      return { bg: "bg-orange-100", text: "text-orange-600" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-600" };
  }
};

export default function HealthMonitoringClient({
  initialGuestsHealthData,
  initialPaginationHealthData,
}: {
  initialGuestsHealthData: any;
  initialPaginationHealthData: any;
}) {
  console.log("initialGuestsHealthData>>>>>", initialGuestsHealthData);
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Calculate stats from the actual data
  const calculateStats = () => {
    if (!initialGuestsHealthData || initialGuestsHealthData.length === 0) {
      return {
        totalMonitored: 0,
        normalStatus: 0,
        activeAlerts: 0,
        avgHealthScore: 0,
      };
    }

    const totalMonitored = initialGuestsHealthData.length;
    const normalStatus = initialGuestsHealthData.filter(
      (guest: any) =>
        guest.healthStatus.value === "Excellent" ||
        guest.healthStatus.value === "Good"
    ).length;

    const activeAlerts = initialGuestsHealthData.filter(
      (guest: any) =>
        guest.healthStatus.value === "Critical" ||
        guest.healthStatus.value === "Poor"
    ).length;

    // Calculate average health score (simplified - you can enhance this)
    const avgHealthScore = Math.round((normalStatus / totalMonitored) * 100);

    return {
      totalMonitored,
      normalStatus,
      activeAlerts,
      avgHealthScore,
    };
  };

  const statsData = calculateStats();

  const stats = [
    {
      title: "Total Monitored",
      value: statsData.totalMonitored.toString(),
      change: "+8%",
      changeType: "positive",
      icon: UserGroupIcon,
      color: "blue",
    },
    {
      title: "Normal Status",
      value: statsData.normalStatus.toString(),
      change: "+5%",
      changeType: "positive",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      title: "Active Alerts",
      value: statsData.activeAlerts.toString(),
      change: "-25%",
      changeType: "positive",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
    {
      title: "Health Score",
      value: `${statsData.avgHealthScore}%`,
      change: "+2%",
      changeType: "positive",
      icon: HeartIcon,
      color: "purple",
    },
  ];

  // Generate alerts from health data
  const generateAlerts = () => {
    if (!initialGuestsHealthData) return [];

    const alerts: any[] = [];

    initialGuestsHealthData.forEach((guest: any) => {
      // Heart rate alerts
      if (guest.heartRate.value > 120) {
        alerts.push({
          id: `hr-${guest.id}`,
          guestName: guest.fullName,
          type: "High Heart Rate",
          severity: guest.heartRate.value > 140 ? "Alert" : "Warning",
          message: `Heart rate elevated to ${guest.heartRate.value} bpm`,
          timestamp: guest.lastCheck,
          status: "Active",
        });
      }

      // Stress level alerts
      if (
        guest.stressLevel.value === "High" ||
        guest.stressLevel.value === "Very High" ||
        guest.stressLevel.value === "Extreme"
      ) {
        alerts.push({
          id: `stress-${guest.id}`,
          guestName: guest.fullName,
          type: "High Stress",
          severity: guest.stressLevel.value === "Extreme" ? "Alert" : "Warning",
          message: `Stress level detected as ${guest.stressLevel.value}`,
          timestamp: guest.lastCheck,
          status: "Active",
        });
      }

      // Critical health status
      if (guest.healthStatus.value === "Critical") {
        alerts.push({
          id: `critical-${guest.id}`,
          guestName: guest.fullName,
          type: "Critical Health",
          severity: "Alert",
          message: `Health status is critical - requires immediate attention`,
          timestamp: guest.lastCheck,
          status: "Active",
        });
      }
    });

    return alerts.slice(0, 5); // Limit to 5 most recent alerts
  };

  const alerts = generateAlerts();

  // Filter guests based on selected status
  const filteredGuests =
    initialGuestsHealthData?.filter((guest: any) => {
      if (selectedHealthStatus === "all") return true;
      return guest.healthStatus.value.toLowerCase() === selectedHealthStatus;
    }) || [];

  // Time range option

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
            <Card key={stat.title}>
              <CardBody>
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
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search guests..."
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="w-full"
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            selectedKeys={[selectedTimeRange]}
            onSelectionChange={(keys) =>
              setSelectedTimeRange(Array.from(keys)[0] as string)
            }
            size="sm"
            className="min-w-[140px]"
          >
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            selectedKeys={[selectedHealthStatus]}
            onSelectionChange={(keys) =>
              setSelectedHealthStatus(Array.from(keys)[0] as string)
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

          <Button
            size="sm"
            variant="bordered"
            startContent={<FunnelIcon className="h-5 w-5" />}
            className="px-4"
          >
            Filter
          </Button>
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
              {filteredGuests.map((guest: any) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${getHeartRateColor(
                        guest.heartRate.value
                      )}`}
                    >
                      {guest.heartRate.value} {guest.heartRate.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.bloodPressure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.temperature.value} {guest.temperature.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${getStressLevelColor(
                        guest.stressLevel.value
                      )}`}
                    >
                      {guest.stressLevel.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        guest.healthStatus.value
                      )}`}
                    >
                      {guest.healthStatus.value}
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
            Health Status Distribution
          </h3>
          <div className="space-y-4">
            {(() => {
              if (!initialGuestsHealthData) return null;

              const statusCounts = initialGuestsHealthData.reduce(
                (acc: any, guest: any) => {
                  const status = guest.healthStatus.value;
                  acc[status] = (acc[status] || 0) + 1;
                  return acc;
                },
                {}
              );

              const total = initialGuestsHealthData.length;

              return Object.entries(statusCounts).map(
                ([status, count]: [string, any]) => {
                  const percentage = Math.round((count / total) * 100);
                  const color =
                    status === "Excellent"
                      ? "bg-green-600"
                      : status === "Good"
                        ? "bg-blue-600"
                        : status === "Fair"
                          ? "bg-yellow-600"
                          : status === "Poor"
                            ? "bg-orange-600"
                            : "bg-red-600";

                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">{status}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`${color} h-2 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                }
              );
            })()}
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
