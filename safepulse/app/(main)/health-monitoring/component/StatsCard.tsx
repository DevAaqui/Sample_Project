"use client";

import { Card, CardBody } from "@heroui/react";
import {
  HeartIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface HealthStatsCardsProps {
  statsData: {
    totalMonitored: number;
    normalStatus: number;
    activeAlerts: number;
    avgHealthScore: number;
  };
}

export default function HealthStatsCards({ statsData }: HealthStatsCardsProps) {
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

  const stats: StatCard[] = [
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

  return (
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
  );
}