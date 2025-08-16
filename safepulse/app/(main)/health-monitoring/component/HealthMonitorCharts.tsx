"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";

interface HealthMonitorChartsProps {
  initialGuestsHealthData: any[];
}

export default function HealthMonitorCharts({
  initialGuestsHealthData,
}: HealthMonitorChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Health Score Distribution */}
      <Card className="w-full">
        <CardHeader className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Health Status Distribution
          </h3>
        </CardHeader>
        <CardBody className="px-6 py-4">
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
        </CardBody>
      </Card>

      {/* Alert Trends */}
      <Card className="w-full">
        <CardHeader className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Alert Trends (Last 7 Days)
          </h3>
        </CardHeader>
        <CardBody className="px-6 py-4">
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
        </CardBody>
      </Card>
    </div>
  );
}
