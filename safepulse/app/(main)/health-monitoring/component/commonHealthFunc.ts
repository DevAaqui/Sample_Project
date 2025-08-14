export const timeRangeOptions = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "year", label: "This Year" },
  ];
  
  // Health status options
  export const healthStatusOptions = [
    { key: "all", label: "All Status" },
    { key: "excellent", label: "Excellent" },
    { key: "good", label: "Good" },
    { key: "fair", label: "Fair" },
    { key: "poor", label: "Poor" },
    { key: "critical", label: "Critical" },
  ];
  
  export const getStatusColor = (status: string) => {
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
  
  export const getAlertSeverityColor = (severity: string) => {
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
  
  export const getHeartRateColor = (heartRate: number) => {
    if (heartRate > 140) return "text-red-600";
    if (heartRate > 120) return "text-yellow-600";
    if (heartRate < 60) return "text-blue-600";
    return "text-green-600";
  };
  
  export const getStressLevelColor = (stressLevel: string) => {
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
  
  export const getColorClasses = (color: string) => {
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