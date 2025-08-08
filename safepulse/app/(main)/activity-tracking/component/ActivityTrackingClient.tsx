"use client";

import { useState } from "react";
import {
  FireIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Button,
  Input,
} from "@heroui/react";

export default function ActivityTrackingClient() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedActivityType, setSelectedActivityType] = useState("all");

  const activityData = [
    {
      id: 1,
      guestName: "John Smith",
      activityType: "Ride",
      rideName: "Roller Coaster A",
      duration: "15m",
      intensity: "High",
      healthMetrics: {
        heartRate: 145,
        bloodPressure: "120/80",
        stressLevel: "Medium",
      },
      timestamp: "2024-01-15 14:30",
      status: "Completed",
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      activityType: "Rest",
      rideName: "Rest Area",
      duration: "45m",
      intensity: "Low",
      healthMetrics: {
        heartRate: 72,
        bloodPressure: "110/70",
        stressLevel: "Low",
      },
      timestamp: "2024-01-15 14:15",
      status: "Active",
    },
    {
      id: 3,
      guestName: "Mike Davis",
      activityType: "Ride",
      rideName: "Water Slide",
      duration: "8m",
      intensity: "Medium",
      healthMetrics: {
        heartRate: 125,
        bloodPressure: "118/78",
        stressLevel: "Medium",
      },
      timestamp: "2024-01-15 14:00",
      status: "Completed",
    },
    {
      id: 4,
      guestName: "Emily Wilson",
      activityType: "Ride",
      rideName: "Ferris Wheel",
      duration: "12m",
      intensity: "Low",
      healthMetrics: {
        heartRate: 85,
        bloodPressure: "105/65",
        stressLevel: "Low",
      },
      timestamp: "2024-01-15 13:45",
      status: "Completed",
    },
    {
      id: 5,
      guestName: "David Brown",
      activityType: "Ride",
      rideName: "Roller Coaster B",
      duration: "18m",
      intensity: "High",
      healthMetrics: {
        heartRate: 155,
        bloodPressure: "135/85",
        stressLevel: "High",
      },
      timestamp: "2024-01-15 13:30",
      status: "Completed",
    },
  ];

  const stats = [
    {
      title: "Active Sessions",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: FireIcon,
      color: "blue",
    },
    {
      title: "Avg Session Duration",
      value: "23m",
      change: "+5%",
      changeType: "positive",
      icon: ClockIcon,
      color: "green",
    },
    {
      title: "Peak Activity Time",
      value: "2:30 PM",
      change: "-2%",
      changeType: "negative",
      icon: ArrowTrendingUpIcon,
      color: "yellow",
    },
    {
      title: "Health Alerts",
      value: "3",
      change: "-25%",
      changeType: "positive",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthStatusColor = (heartRate: number) => {
    if (heartRate > 140) return "text-red-600";
    if (heartRate > 120) return "text-yellow-600";
    return "text-green-600";
  };

  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Tracking</h1>
        <p className="text-gray-600">
          Monitor real-time guest activities and health metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-gray-200">
            <CardBody className="p-6">
              <div className="flex items-center">
                <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm ${stat.changeType === "positive"
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
        ))}
      </div>

      {/* Filters and Controls */}
      <Card className="border border-gray-200">
        <CardBody className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <div className="flex-1"> */}
              <Input
                type="text"
                placeholder="Search activities..."
                startContent={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                className="w-full"
                variant="bordered"
              />
            {/* </div> */}

            <Select
              placeholder="Select time range"
              selectedKeys={selectedTimeRange ? [selectedTimeRange] : []}
              onSelectionChange={(keys) => setSelectedTimeRange(Array.from(keys)[0] as string)}
              className="min-w-[150px]"
              variant="bordered"
            >
              <SelectItem key="today">Today</SelectItem>
              <SelectItem key="week">This Week</SelectItem>
              <SelectItem key="month">This Month</SelectItem>
              <SelectItem key="year">This Year</SelectItem>
            </Select>

            <Select
              placeholder="Select activity type"
              selectedKeys={selectedActivityType ? [selectedActivityType] : []}
              onSelectionChange={(keys) => setSelectedActivityType(Array.from(keys)[0] as string)}
              className="min-w-[180px]"
              variant="bordered"
            >
              <SelectItem key="all">All Activities</SelectItem>
              <SelectItem key="ride">Rides</SelectItem>
              <SelectItem key="rest">Rest</SelectItem>
              <SelectItem key="food">Food & Beverage</SelectItem>
            </Select>

            <Button
              variant="bordered"
              startContent={<FunnelIcon className="h-5 w-5" />}
              className="self-end"
            >
              Filter
            </Button>
          </div>
        </CardBody>
      </Card>


      {/* Activity Timeline */}
      <Card className="border border-gray-200">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activities
          </h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Intensity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health Metrics
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
                {activityData.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {activity.guestName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.guestName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {activity.rideName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.activityType}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getIntensityColor(
                          activity.intensity
                        )}`}
                      >
                        {activity.intensity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div
                          className={`font-medium ${getHealthStatusColor(
                            activity.healthMetrics.heartRate
                          )}`}
                        >
                          HR: {activity.healthMetrics.heartRate} bpm
                        </div>
                        <div className="text-gray-500">
                          BP: {activity.healthMetrics.bloodPressure}
                        </div>
                        <div className="text-gray-500">
                          Stress: {activity.healthMetrics.stressLevel}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Activity Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Distribution Chart */}
        <Card className="border border-gray-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Activity Distribution
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rides</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rest Periods</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Food & Beverage</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">10%</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Peak Activity Hours */}
        <Card className="border border-gray-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Peak Activity Hours
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { hour: "2:00 PM", activity: "Very High", percentage: 95 },
                { hour: "3:00 PM", activity: "High", percentage: 85 },
                { hour: "1:00 PM", activity: "High", percentage: 80 },
                { hour: "4:00 PM", activity: "Medium", percentage: 65 },
                { hour: "12:00 PM", activity: "Medium", percentage: 60 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.hour}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
