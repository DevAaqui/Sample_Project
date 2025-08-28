import { createColumnHelper } from "@tanstack/react-table";
import { getStatusColor, getHeartRateColor, getStressLevelColor } from "./commonHealthFunc";

// Define the type for health data
interface HealthData {
  id: number;
  initials: string;
  fullName: string;
  age: number;
  heartRate: {
    value: number;
    color: string;
    unit: string;
  };
  bloodPressure: string;
  temperature: {
    value: number;
    unit: string;
    status: string;
  };
  stressLevel: {
    value: string;
    color: string;
  };
  healthStatus: {
    value: string;
    color: string;
  };
  lastCheck: string;
  rawMetrics: {
    metric_id: number;
    timestamp: string;
    heart_rate: number;
    blood_pressure: string;
    steps: number;
    calories_burned: number;
  };
}

// Column helper
export const columnHelper = createColumnHelper<HealthData>();

// Define columns with correct field names
export const columns = [
  columnHelper.accessor("fullName", {
    header: "Guest",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {row.original.initials}
          </span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            {row.original.fullName}
          </div>
          <div className="text-xs text-gray-500">
            ID: {row.original.id}
          </div>
        </div>
      </div>
    ),
  }),

  columnHelper.accessor("age", {
    header: "Age",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-900">{getValue()} years</span>
    ),
  }),

  columnHelper.accessor("heartRate", {
    header: "Heart Rate",
    cell: ({ row }) => {
      const heartRate = row.original.heartRate;
      return (
        <div className="flex items-center">
          <span className={`text-sm font-medium ${getHeartRateColor(heartRate.value)}`}>
            {heartRate.value} {heartRate.unit}
          </span>
          <div className="ml-2 w-3 h-3 rounded-full" style={{ backgroundColor: heartRate.color }}></div>
        </div>
      );
    },
  }),

  columnHelper.accessor("bloodPressure", {
    header: "Blood Pressure",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-900">{getValue()}</span>
    ),
  }),

  columnHelper.accessor("temperature", {
    header: "Temperature",
    cell: ({ row }) => {
      const temp = row.original.temperature;
      const statusColor = temp.status === "Normal" ? "text-green-600" : 
                         temp.status === "High" ? "text-red-600" : 
                         temp.status === "Low" ? "text-blue-600" : "text-gray-600";
      
      return (
        <div className="flex items-center">
          <span className={`text-sm font-medium ${statusColor}`}>
            {temp.value} {temp.unit}
          </span>
          <span className="ml-2 text-xs text-gray-500">({temp.status})</span>
        </div>
      );
    },
  }),

  columnHelper.accessor("stressLevel", {
    header: "Stress Level",
    cell: ({ row }) => {
      const stress = row.original.stressLevel;
      return (
        <div className="flex items-center">
          <span className={`text-sm font-medium ${getStressLevelColor(stress.value)}`}>
            {stress.value}
          </span>
          <div className="ml-2 w-3 h-3 rounded-full" style={{ backgroundColor: stress.color }}></div>
        </div>
      );
    },
  }),

  columnHelper.accessor("healthStatus", {
    header: "Health Status",
    cell: ({ row }) => {
      const status = row.original.healthStatus;
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status.value)}`}>
          {status.value}
        </span>
      );
    },
  }),

  columnHelper.accessor("lastCheck", {
    header: "Last Check",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
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
    },
  }),

  columnHelper.accessor("rawMetrics", {
    header: "Activity",
    cell: ({ row }) => {
      const metrics = row.original.rawMetrics;
      return (
        <div className="text-sm">
          <div className="text-gray-900">
            <span className="font-medium">{metrics?.steps?.toLocaleString()}</span> steps
          </div>
          <div className="text-xs text-gray-500">
            {metrics?.calories_burned} cal burned
          </div>
        </div>
      );
    },
  }),
];

// Export the type for use in other components
export type { HealthData };