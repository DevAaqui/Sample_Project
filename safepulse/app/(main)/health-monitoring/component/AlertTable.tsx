"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { getAlertSeverityColor } from "./commonHealthFunc";

interface Alert {
  id: string;
  guestName: string;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  status: string;
}

interface HealthAlertsTableProps {
  alerts: Alert[];
}

export default function HealthAlertsTable({ alerts }: HealthAlertsTableProps) {
  return (
    <Card className="w-full">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Health Alerts</h3>
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
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No alerts found
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
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
                        
                        const now = new Date();
                        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                        
                        let timeDisplay = "";
                        if (diffInHours < 1) {
                          timeDisplay = "Just now";
                        } else if (diffInHours < 24) {
                          timeDisplay = `${diffInHours}h ago`;
                        } else {
                          const days = Math.floor(diffInHours / 24);
                          timeDisplay = `${days}d ago`;
                        }
                        
                        return (
                          <div className="text-sm">
                            <div className="text-gray-900">{timeDisplay}</div>
                            <div className="text-xs text-gray-500">
                              {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        );
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}