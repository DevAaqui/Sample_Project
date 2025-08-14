// Helper function to calculate age from date of birth
const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Helper function to calculate health score based on various metrics
const calculateHealthScore = (guest, latestMetrics) => {
  // Will update later, the Heart Rate, Blood Pressure, Activity Level, Calorie Burn, Age and Gender Baseline to be the safe_hr_min and safe_hr_max from the guest object
  let score = 0;
  let factors = 0;

  // Factor 1: Heart Rate (30% weight)
  if (latestMetrics && latestMetrics.heart_rate) {
    const hr = latestMetrics.heart_rate;
    const safeMin = guest.safe_hr_min || 60;
    const safeMax = guest.safe_hr_max || 100;

    if (hr >= safeMin && hr <= safeMax) {
      score += 30; // Perfect score for normal heart rate
    } else if (hr >= safeMin - 10 && hr <= safeMax + 10) {
      score += 20; // Good score for slightly outside range
    } else if (hr >= safeMin - 20 && hr <= safeMax + 20) {
      score += 10; // Acceptable score
    } else {
      score += 5; // Poor score
    }
    factors++;
  }

  // Factor 2: Blood Pressure (25% weight)
  if (latestMetrics && latestMetrics.blood_pressure) {
    const bp = latestMetrics.blood_pressure;
    const [systolic, diastolic] = bp.split("/").map(Number);

    if (systolic && diastolic) {
      if (systolic < 120 && diastolic < 80) {
        score += 25; // Normal
      } else if (systolic < 130 && diastolic < 85) {
        score += 20; // Elevated
      } else if (systolic < 140 && diastolic < 90) {
        score += 15; // Stage 1
      } else if (systolic < 180 && diastolic < 110) {
        score += 10; // Stage 2
      } else {
        score += 5; // Crisis
      }
      factors++;
    }
  }

  // Factor 3: Activity Level (20% weight)
  if (latestMetrics && latestMetrics.steps) {
    const steps = latestMetrics.steps;
    if (steps >= 10000) {
      score += 20; // Excellent
    } else if (steps >= 7500) {
      score += 15; // Good
    } else if (steps >= 5000) {
      score += 10; // Moderate
    } else if (steps >= 2500) {
      score += 5; // Low
    } else {
      score += 2; // Very low
    }
    factors++;
  }

  // Factor 4: Calorie Burn (15% weight)
  if (latestMetrics && latestMetrics.calories_burned) {
    const calories = latestMetrics.calories_burned;
    if (calories >= 500) {
      score += 15; // Excellent
    } else if (calories >= 300) {
      score += 12; // Good
    } else if (calories >= 150) {
      score += 8; // Moderate
    } else if (calories >= 50) {
      score += 4; // Low
    } else {
      score += 2; // Very low
    }
    factors++;
  }

  // Factor 5: Age and Gender Baseline (10% weight)
  const age = calculateAge(guest.dob);
  const gender = guest.gender;

  // Age-appropriate scoring
  if (age < 18) {
    score += 10; // Young and healthy
  } else if (age < 30) {
    score += 9; // Very healthy age group
  } else if (age < 50) {
    score += 8; // Healthy age group
  } else if (age < 65) {
    score += 7; // Middle age
  } else {
    score += 6; // Senior
  }
  factors++;

  // Calculate percentage score
  const maxPossibleScore = 100;
  const healthScore =
    factors > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;

  return Math.min(100, Math.max(0, healthScore)); // Ensure score is between 0-100
};

// Helper function to format time duration
const formatTimeDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
};

// ... existing code ...

// Helper function to calculate stress level based on health metrics
const calculateStressLevel = (latestMetric) => {
  if (!latestMetric) return "Unknown";

  let stressScore = 0;
  let factors = 0;

  // Factor 1: Heart Rate (40% weight)
  if (latestMetric.heart_rate) {
    const hr = latestMetric.heart_rate;
    if (hr < 60) {
      stressScore += 40; // Bradycardia - high stress
    } else if (hr >= 60 && hr <= 100) {
      stressScore += 10; // Normal - low stress
    } else if (hr > 100 && hr <= 120) {
      stressScore += 30; // Elevated - moderate stress
    } else if (hr > 120 && hr <= 140) {
      stressScore += 50; // High - high stress
    } else {
      stressScore += 70; // Very high - extreme stress
    }
    factors++;
  }

  // Factor 2: Blood Pressure (35% weight)
  if (latestMetric.blood_pressure) {
    const bp = latestMetric.blood_pressure;
    const [systolic, diastolic] = bp.split("/").map(Number);

    if (systolic && diastolic) {
      if (systolic < 120 && diastolic < 80) {
        stressScore += 10; // Normal - low stress
      } else if (systolic < 130 && diastolic < 85) {
        stressScore += 25; // Elevated - moderate stress
      } else if (systolic < 140 && diastolic < 90) {
        stressScore += 40; // Stage 1 - high stress
      } else if (systolic < 180 && diastolic < 110) {
        stressScore += 60; // Stage 2 - very high stress
      } else {
        stressScore += 80; // Crisis - extreme stress
      }
      factors++;
    }
  }

  // Factor 3: Activity Level (25% weight)
  if (latestMetric.steps) {
    const steps = latestMetric.steps;
    if (steps >= 10000) {
      stressScore += 5; // High activity - low stress
    } else if (steps >= 7500) {
      stressScore += 15; // Good activity - low stress
    } else if (steps >= 5000) {
      stressScore += 25; // Moderate activity - moderate stress
    } else if (steps >= 2500) {
      stressScore += 35; // Low activity - high stress
    } else {
      stressScore += 45; // Very low activity - very high stress
    }
    factors++;
  }

  // Calculate average stress score
  const avgStressScore = factors > 0 ? stressScore / factors : 0;

  // Determine stress level category
  if (avgStressScore <= 20) return "Low";
  if (avgStressScore <= 40) return "Moderate";
  if (avgStressScore <= 60) return "High";
  if (avgStressScore <= 80) return "Very High";
  return "Extreme";
};

// Helper function to determine overall health status
const determineHealthStatus = (healthScore, latestMetric) => {
  // Base status on health score
  let baseStatus = "";
  if (healthScore >= 90) baseStatus = "Excellent";
  else if (healthScore >= 80) baseStatus = "Good";
  else if (healthScore >= 70) baseStatus = "Fair";
  else if (healthScore >= 60) baseStatus = "Poor";
  else baseStatus = "Critical";

  // Override with critical metrics if present
  if (latestMetric) {
    // Critical heart rate
    if (latestMetric.heart_rate) {
      if (latestMetric.heart_rate < 40 || latestMetric.heart_rate > 160) {
        return "Critical";
      }
    }

    // Critical blood pressure
    if (latestMetric.blood_pressure) {
      const [systolic, diastolic] = latestMetric.blood_pressure
        .split("/")
        .map(Number);
      if (systolic && diastolic) {
        if (
          systolic > 180 ||
          diastolic > 110 ||
          systolic < 90 ||
          diastolic < 60
        ) {
          return "Critical";
        }
      }
    }
  }

  return baseStatus;
};

// Helper function to calculate simulated temperature
const calculateTemperature = (healthScore, stressLevel) => {
  // Base temperature (normal body temperature: 36.5-37.5°C)
  let baseTemp = 37.0;

  // Adjust based on health score
  if (healthScore >= 90) {
    baseTemp += 0.1; // Slightly elevated for excellent health
  } else if (healthScore >= 80) {
    baseTemp += 0.0; // Normal for good health
  } else if (healthScore >= 70) {
    baseTemp -= 0.1; // Slightly lower for fair health
  } else if (healthScore >= 60) {
    baseTemp -= 0.2; // Lower for poor health
  } else {
    baseTemp -= 0.3; // Much lower for critical health
  }

  // Adjust based on stress level
  switch (stressLevel) {
    case "Low":
      baseTemp -= 0.1;
      break;
    case "Moderate":
      baseTemp += 0.0;
      break;
    case "High":
      baseTemp += 0.2;
      break;
    case "Very High":
      baseTemp += 0.4;
      break;
    case "Extreme":
      baseTemp += 0.6;
      break;
    default:
      baseTemp += 0.0;
  }

  // Add small random variation (±0.1°C) for realism
  const variation = (Math.random() - 0.5) * 0.2;
  const finalTemp = baseTemp + variation;

  return {
    value: Math.round(finalTemp * 10) / 10, // Round to 1 decimal place
    unit: "°C",
    status: finalTemp < 36.0 ? "Low" : finalTemp > 38.0 ? "High" : "Normal",
  };
};

// Helper function to get heart rate color based on value
const getHeartRateColor = (heartRate) => {
  if (!heartRate || heartRate === 0) return "gray";

  if (heartRate < 40) return "purple"; // Very low - critical
  if (heartRate < 60) return "blue"; // Low - bradycardia
  if (heartRate >= 60 && heartRate <= 100) return "green"; // Normal
  if (heartRate > 100 && heartRate <= 120) return "yellow"; // Elevated
  if (heartRate > 120 && heartRate <= 140) return "orange"; // High
  if (heartRate > 140 && heartRate <= 160) return "red"; // Very high
  return "darkred"; // Extreme - critical
};

// Helper function to get stress level color
const getStressLevelColor = (stressLevel) => {
  switch (stressLevel) {
    case "Low":
      return "green";
    case "Moderate":
      return "yellow";
    case "High":
      return "orange";
    case "Very High":
      return "red";
    case "Extreme":
      return "darkred";
    default:
      return "gray";
  }
};

// Helper function to get health status color
const getHealthStatusColor = (healthStatus) => {
  switch (healthStatus) {
    case "Excellent":
      return "green";
    case "Good":
      return "lightgreen";
    case "Fair":
      return "yellow";
    case "Poor":
      return "orange";
    case "Critical":
      return "red";
    default:
      return "gray";
  }
};

// Helper function to calculate summary statistics
const calculateSummaryStats = (processedGuests) => {
  if (!processedGuests || processedGuests.length === 0) {
    return {
      totalGuests: 0,
      averageAge: 0,
      averageHeartRate: 0,
      healthDistribution: {},
      stressDistribution: {},
      criticalCount: 0,
    };
  }

  const totalGuests = processedGuests.length;
  const totalAge = processedGuests.reduce((sum, guest) => sum + guest.age, 0);
  const averageAge = Math.round(totalAge / totalGuests);

  const heartRates = processedGuests
    .filter((guest) => guest.heartRate.value > 0)
    .map((guest) => guest.heartRate.value);
  const averageHeartRate =
    heartRates.length > 0
      ? Math.round(
          heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length
        )
      : 0;

  // Health status distribution
  const healthDistribution = processedGuests.reduce((acc, guest) => {
    const status = guest.healthStatus.value;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Stress level distribution
  const stressDistribution = processedGuests.reduce((acc, guest) => {
    const level = guest.stressLevel.value;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  // Count critical cases
  const criticalCount = processedGuests.filter(
    (guest) => guest.healthStatus.value === "Critical"
  ).length;

  return {
    totalGuests,
    averageAge,
    averageHeartRate,
    healthDistribution,
    stressDistribution,
    criticalCount,
  };
};

module.exports = {
  calculateAge,
  calculateHealthScore,
  formatTimeDuration,
  calculateStressLevel,
  determineHealthStatus,
  calculateTemperature,
  getHeartRateColor,
  getStressLevelColor,
  getHealthStatusColor,
  calculateSummaryStats,
};
