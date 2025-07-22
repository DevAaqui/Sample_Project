"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  HeartIcon,
  FireIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import * as echarts from "echarts";
import HealthMetrics from "@/components/HealthMetrics";
import GuestManagement from "@/components/GuestManagement";

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
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#E5E7EB",
          textStyle: { color: "#374151" },
        },
        legend: {
          data: ["Safe Rides", "Caution Rides"],
          textStyle: { color: "#6B7280" },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: barData.map((d) => d.month),
          axisLine: { lineStyle: { color: "#E5E7EB" } },
          axisLabel: { color: "#6B7280" },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#E5E7EB" } },
          axisLabel: { color: "#6B7280" },
          splitLine: { lineStyle: { color: "#F3F4F6" } },
        },
        series: [
          {
            name: "Safe Rides",
            type: "bar",
            data: barData.map((d) => d["Safe Rides"]),
            itemStyle: { color: "#10B981" },
          },
          {
            name: "Caution Rides",
            type: "bar",
            data: barData.map((d) => d["Caution Rides"]),
            itemStyle: { color: "#F59E0B" },
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
      if (ref) {
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
                    {
                      offset: 0,
                      color: card.chartColor + "40",
                    },
                    {
                      offset: 1,
                      color: card.chartColor + "00",
                    },
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
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Monitor your amusement park's health metrics and guest activity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <div
            key={card.title}
            className={`${card.color} rounded-xl p-6 border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center mt-1">
                  <span
                    className={`text-sm font-medium ${
                      card.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {card.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    vs last week
                  </span>
                </div>
              </div>
              <div className={`${card.iconColor} p-3 rounded-lg bg-white`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
            <div
              ref={(el) => {
                miniChartRefs.current[index] = el;
              }}
              className="h-16 mt-4"
            />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Guest Health Status Distribution
          </h3>
          <div ref={pieChartRef} className="h-64" />
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Ride Safety Metrics
          </h3>
          <div ref={barChartRef} className="h-64" />
        </div>
      </div>

      {/* Additional Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthMetrics />
        <GuestManagement />
      </div>
    </div>
  );
}
