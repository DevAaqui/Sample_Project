"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  DocumentIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  FolderIcon,
  HeartIcon,
  FireIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import * as echarts from "echarts";
import HealthMetrics from "@/components/HealthMetrics";
import GuestManagement from "@/components/GuestManagement";
import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";

// Sample data for charts
const pieData = [
  { name: "Safe", value: 43.8, color: "#10B981" },
  { name: "Caution", value: 31.3, color: "#F59E0B" },
  { name: "Restricted", value: 18.8, color: "#EF4444" },
  { name: "Inactive", value: 6.3, color: "#6B7280" },
];

const barData = [
  { month: "Jan", "Safe Rides": 42, "Caution Rides": 50 },
  { month: "Feb", "Safe Rides": 33, "Caution Rides": 68 },
  { month: "Mar", "Safe Rides": 22, "Caution Rides": 47 },
  { month: "Apr", "Safe Rides": 38, "Caution Rides": 65 },
  { month: "May", "Safe Rides": 67, "Caution Rides": 40 },
  { month: "Jun", "Safe Rides": 68, "Caution Rides": 38 },
  { month: "Jul", "Safe Rides": 38, "Caution Rides": 30 },
  { month: "Aug", "Safe Rides": 30, "Caution Rides": 68 },
  { month: "Sep", "Safe Rides": 55, "Caution Rides": 25 },
];

const lineData = [
  {
    day: "Mon",
    healthScore: 65,
    activeGuests: 45,
    rideSessions: 78,
    safetyAlerts: 12,
  },
  {
    day: "Tue",
    healthScore: 72,
    activeGuests: 52,
    rideSessions: 85,
    safetyAlerts: 18,
  },
  {
    day: "Wed",
    healthScore: 68,
    activeGuests: 48,
    rideSessions: 82,
    safetyAlerts: 15,
  },
  {
    day: "Thu",
    healthScore: 75,
    activeGuests: 55,
    rideSessions: 88,
    safetyAlerts: 22,
  },
  {
    day: "Fri",
    healthScore: 80,
    activeGuests: 58,
    rideSessions: 92,
    safetyAlerts: 28,
  },
  {
    day: "Sat",
    healthScore: 85,
    activeGuests: 62,
    rideSessions: 95,
    safetyAlerts: 35,
  },
  {
    day: "Sun",
    healthScore: 78,
    activeGuests: 56,
    rideSessions: 89,
    safetyAlerts: 30,
  },
];

export default function Dashboard() {
  const [activeSection] = useState("analytics");
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const miniChartRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navigationItems = [
    {
      category: "OVERVIEW",
      items: [
        { name: "Dashboard", icon: ChartBarIcon, href: "#" },
        { name: "Guests", icon: UserGroupIcon, href: "#" },
        { name: "Analytics", icon: ChartBarIcon, href: "#", active: true },
        { name: "Rides", icon: ShoppingBagIcon, href: "#" },
        { name: "Safety", icon: ExclamationTriangleIcon, href: "#" },
        { name: "Reports", icon: DocumentIcon, href: "#" },
        { name: "Settings", icon: Cog6ToothIcon, href: "#" },
      ],
    },
    {
      category: "MANAGEMENT",
      items: [
        {
          name: "User Management",
          icon: UserGroupIcon,
          href: "#",
          hasSubmenu: true,
        },
        {
          name: "Ride Management",
          icon: ShoppingBagIcon,
          href: "#",
          hasSubmenu: true,
        },
        {
          name: "Safety Protocols",
          icon: ExclamationTriangleIcon,
          href: "#",
          hasSubmenu: true,
        },
        {
          name: "Health Monitoring",
          icon: HeartIcon,
          href: "#",
          hasSubmenu: true,
        },
        {
          name: "Activity Tracking",
          icon: FireIcon,
          href: "#",
          hasSubmenu: true,
        },
        {
          name: "Alerts & Notifications",
          icon: BellIcon,
          href: "#",
          hasSubmenu: true,
        },
        {
          name: "System Health",
          icon: Cog6ToothIcon,
          href: "#",
          hasSubmenu: true,
        },
      ],
    },
  ];

  const kpiCards = [
    {
      title: "Weekly Health Score",
      value: "714k",
      change: "+2.6%",
      trend: "up",
      icon: HeartIcon,
      color: "bg-green-50",
      iconColor: "text-green-600",
      data: lineData.map((d) => d.healthScore),
      chartColor: "#10B981",
    },
    {
      title: "Active Guests",
      value: "1.35m",
      change: "-0.1%",
      trend: "down",
      icon: UserGroupIcon,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      data: lineData.map((d) => d.activeGuests),
      chartColor: "#8B5CF6",
    },
    {
      title: "Ride Sessions",
      value: "1.72m",
      change: "+2.8%",
      trend: "up",
      icon: ShoppingCartIcon,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
      data: lineData.map((d) => d.rideSessions),
      chartColor: "#F59E0B",
    },
    {
      title: "Safety Alerts",
      value: "234",
      change: "+3.6%",
      trend: "up",
      icon: EnvelopeIcon,
      color: "bg-red-50",
      iconColor: "text-red-600",
      data: lineData.map((d) => d.safetyAlerts),
      chartColor: "#EF4444",
    },
  ];

  // Initialize pie chart
  useEffect(() => {
    if (pieChartRef.current) {
      const chart = echarts.init(pieChartRef.current);

      const option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#E5E7EB",
          textStyle: { color: "#374151" },
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "50%"],
            data: pieData.map((item) => ({
              name: item.name,
              value: item.value,
              itemStyle: { color: item.color },
            })),
            label: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Initialize bar chart
  useEffect(() => {
    if (barChartRef.current) {
      const chart = echarts.init(barChartRef.current);

      const option = {
        grid: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: barData.map((item) => item.month),
          axisLine: { lineStyle: { color: "#E5E7EB" } },
          axisLabel: { color: "#6B7280", fontSize: 10 },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#E5E7EB" } },
          axisLabel: { color: "#6B7280", fontSize: 10 },
          splitLine: { lineStyle: { color: "#F3F4F6", type: "dashed" } },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#E5E7EB",
          textStyle: { color: "#374151" },
        },
        legend: {
          data: ["Safe Rides", "Caution Rides"],
          textStyle: { color: "#6B7280", fontSize: 10 },
          top: 0,
        },
        series: [
          {
            name: "Safe Rides",
            type: "bar",
            data: barData.map((item) => item["Safe Rides"]),
            itemStyle: { color: "#14B8A6" },
          },
          {
            name: "Caution Rides",
            type: "bar",
            data: barData.map((item) => item["Caution Rides"]),
            itemStyle: { color: "#EAB308" },
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Initialize mini charts
  useEffect(() => {
    miniChartRefs.current.forEach((ref, index) => {
      if (ref && kpiCards[index]) {
        const chart = echarts.init(ref);
        const card = kpiCards[index];

        const option = {
          grid: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          xAxis: {
            type: "category",
            show: false,
            data: card.data.map((_, i) => i),
          },
          yAxis: {
            type: "value",
            show: false,
          },
          series: [
            {
              data: card.data,
              type: "line",
              smooth: true,
              symbol: "none",
              lineStyle: {
                color: card.chartColor,
                width: 2,
              },
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: `${card.chartColor}20` },
                    { offset: 1, color: `${card.chartColor}05` },
                  ],
                },
              },
            },
          ],
        };

        chart.setOption(option);

        const handleResize = () => chart.resize();
        window.addEventListener("resize", handleResize);

        return () => {
          chart.dispose();
          window.removeEventListener("resize", handleResize);
        };
      }
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Hi, Welcome back 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your health-aware amusement platform
              today.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiCards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} rounded-xl p-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="w-full h-full bg-current rounded-full"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-2 rounded-lg ${card.iconColor} bg-white/50`}
                    >
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        card.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span className="font-medium">{card.change}</span>
                      <svg
                        className={`w-4 h-4 ml-1 ${
                          card.trend === "up" ? "rotate-0" : "rotate-180"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{card.title}</p>

                  {/* Mini Line Chart */}
                  <div className="mt-4 h-12">
                    <div
                      ref={(el) => {
                        miniChartRefs.current[index] = el;
                      }}
                      className="w-full h-full"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Health Metrics Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Real-time Health Monitoring
            </h2>
            <HealthMetrics />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Guest Health Distribution Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Guest Health Distribution
              </h3>
              <div className="h-64">
                <div ref={pieChartRef} className="w-full h-full"></div>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ride Safety Metrics Bar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ride Safety Metrics
                </h3>
                <span className="text-sm text-green-600 font-medium">
                  (+43%) than last year
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-teal-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Safe Rides</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Caution Rides</span>
                </div>
              </div>
              <div className="h-64">
                <div ref={barChartRef} className="w-full h-full"></div>
              </div>
            </div>
          </div>

          {/* Guest Management Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Guest Management
            </h2>
            <GuestManagement />
          </div>
        </main>
      </div>
    </div>
  );
}
