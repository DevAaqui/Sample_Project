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

// Helper function to calculate stress level based on health metrics
const calculateStressLevel = (latestMetric) => {
  if (!latestMetric) return "Unknown";

  let stressScore = 0;
  let factors = 0;

  // Factor 1: Heart Rate (40% weight) - use latest heart rate
  if (latestMetric.heartRate?.latest) {
    const hr = latestMetric.heartRate.latest;
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

  // Factor 2: Blood Pressure (35% weight) - use latest blood pressure
  if (latestMetric.bloodPressure?.latest) {
    const bp = latestMetric.bloodPressure.latest;
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

  // Factor 3: Activity Level (25% weight) - use latest steps
  if (latestMetric.steps?.latest) {
    const steps = latestMetric.steps.latest;
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

// Helper function to calculate comprehensive health metrics
const calculateComprehensiveHealthMetrics = (metrics) => {
  if (!metrics || metrics.length === 0) {
    return {
      heartRate: { max: null, avg: null, latest: null },
      bloodPressure: {
        maxSystolic: null,
        maxDiastolic: null,
        avgSystolic: null,
        avgDiastolic: null,
        latest: null,
      },
      steps: { max: null, avg: null, latest: null, total: null },
      caloriesBurned: { max: null, avg: null, latest: null, total: null },
      stressLevel: { max: null, avg: null, latest: null },
      activityLevel: { max: null, avg: null, latest: null },
      totalMetrics: 0,
    };
  }

  // Filter out null/undefined values for calculations
  const validHeartRates = metrics
    .filter((m) => m.heart_rate !== null && m.heart_rate !== undefined)
    .map((m) => m.heart_rate);
  const validSystolic = metrics
    .filter(
      (m) =>
        m.blood_pressure_systolic !== null &&
        m.blood_pressure_systolic !== undefined
    )
    .map((m) => m.blood_pressure_systolic);
  const validDiastolic = metrics
    .filter(
      (m) =>
        m.blood_pressure_diastolic !== null &&
        m.blood_pressure_diastolic !== undefined
    )
    .map((m) => m.blood_pressure_diastolic);
  const validSteps = metrics
    .filter((m) => m.steps !== null && m.steps !== undefined)
    .map((m) => m.steps);
  const validCalories = metrics
    .filter(
      (m) => m.calories_burned !== null && m.calories_burned !== undefined
    )
    .map((m) => m.calories_burned);
  const validStressLevels = metrics
    .filter((m) => m.stress_level !== null && m.stress_level !== undefined)
    .map((m) => m.stress_level);
  const validActivityLevels = metrics
    .filter((m) => m.activity_level !== null && m.activity_level !== undefined)
    .map((m) => m.activity_level);

  // Calculate averages
  const avg = (arr) =>
    arr.length > 0
      ? Math.round(arr.reduce((sum, val) => sum + val, 0) / arr.length)
      : null;
  const max = (arr) => (arr.length > 0 ? Math.max(...arr) : null);
  const min = (arr) => (arr.length > 0 ? Math.min(...arr) : null);

  // Calculate stress level average (convert to numeric for calculation)
  const stressLevelToNumeric = (level) => {
    switch (level) {
      case "Low":
        return 1;
      case "Medium":
        return 2;
      case "High":
        return 3;
      default:
        return null;
    }
  };

  const numericStressLevels = validStressLevels
    .map(stressLevelToNumeric)
    .filter((val) => val !== null);
  const avgStressLevelNumeric = avg(numericStressLevels);
  const avgStressLevel = avgStressLevelNumeric
    ? avgStressLevelNumeric <= 1.5
      ? "Low"
      : avgStressLevelNumeric <= 2.5
      ? "Medium"
      : "High"
    : null;

  // Calculate activity level average
  const activityLevelToNumeric = (level) => {
    switch (level) {
      case "Low":
        return 1;
      case "Medium":
        return 2;
      case "High":
        return 3;
      default:
        return null;
    }
  };

  const numericActivityLevels = validActivityLevels
    .map(activityLevelToNumeric)
    .filter((val) => val !== null);
  const avgActivityLevelNumeric = avg(numericActivityLevels);
  const avgActivityLevel = avgActivityLevelNumeric
    ? avgActivityLevelNumeric <= 1.5
      ? "Low"
      : avgActivityLevelNumeric <= 2.5
      ? "Medium"
      : "High"
    : null;

  return {
    heartRate: {
      max: max(validHeartRates),
      avg: avg(validHeartRates),
      latest: metrics[0]?.heart_rate || null,
    },
    bloodPressure: {
      maxSystolic: max(validSystolic),
      maxDiastolic: max(validDiastolic),
      avgSystolic: avg(validSystolic),
      avgDiastolic: avg(validDiastolic),
      latest:
        metrics[0]?.blood_pressure_systolic &&
        metrics[0]?.blood_pressure_diastolic
          ? `${metrics[0].blood_pressure_systolic}/${metrics[0].blood_pressure_diastolic}`
          : null,
    },
    steps: {
      max: max(validSteps),
      avg: avg(validSteps),
      latest: metrics[0]?.steps || null,
      total: validSteps.reduce((sum, val) => sum + val, 0),
    },
    caloriesBurned: {
      max: max(validCalories),
      avg: avg(validCalories),
      latest: metrics[0]?.calories_burned || null,
      total: validCalories.reduce((sum, val) => sum + val, 0),
    },
    stressLevel: {
      max:
        validStressLevels.length > 0
          ? validStressLevels.reduce((max, current) =>
              stressLevelToNumeric(current) > stressLevelToNumeric(max)
                ? current
                : max
            )
          : null,
      avg: avgStressLevel,
      latest: metrics[0]?.stress_level || null,
    },
    activityLevel: {
      max:
        validActivityLevels.length > 0
          ? validActivityLevels.reduce((max, current) =>
              activityLevelToNumeric(current) > activityLevelToNumeric(max)
                ? current
                : max
            )
          : null,
      avg: avgActivityLevel,
      latest: metrics[0]?.activity_level || null,
    },
    totalMetrics: metrics.length,
  };
};

// Helper function to calculate comprehensive ride metrics
const calculateComprehensiveRideMetrics = (rideSessions) => {
  if (!rideSessions || rideSessions.length === 0) {
    return {
      heartRate: { max: null, avg: null, preRide: null, postRide: null },
      caloriesBurned: { max: null, avg: null, total: null },
      totalSessions: 0,
      totalDuration: 0,
    };
  }

  // Filter out null/undefined values
  const validPreRideHR = rideSessions
    .filter(
      (s) =>
        s.pre_ride_heart_rate !== null && s.pre_ride_heart_rate !== undefined
    )
    .map((s) => s.pre_ride_heart_rate);
  const validPostRideHR = rideSessions
    .filter(
      (s) =>
        s.post_ride_heart_rate !== null && s.post_ride_heart_rate !== undefined
    )
    .map((s) => s.post_ride_heart_rate);
  const validMaxHR = rideSessions
    .filter((s) => s.max_heart_rate !== null && s.max_heart_rate !== undefined)
    .map((s) => s.max_heart_rate);
  const validAvgHR = rideSessions
    .filter((s) => s.avg_heart_rate !== null && s.avg_heart_rate !== undefined)
    .map((s) => s.avg_heart_rate);
  const validCalories = rideSessions
    .filter(
      (s) => s.calories_burned !== null && s.calories_burned !== undefined
    )
    .map((s) => s.calories_burned);

  // Calculate averages
  const avg = (arr) =>
    arr.length > 0
      ? Math.round(arr.reduce((sum, val) => sum + val, 0) / arr.length)
      : null;
  const max = (arr) => (arr.length > 0 ? Math.max(...arr) : null);

  // Calculate total duration
  const totalDuration = rideSessions.reduce((total, session) => {
    if (session.start_time && session.end_time) {
      return (
        total + (new Date(session.end_time) - new Date(session.start_time))
      );
    }
    return total;
  }, 0);

  return {
    heartRate: {
      max: max(validMaxHR),
      avg: avg(validAvgHR),
      preRide: avg(validPreRideHR),
      postRide: avg(validPostRideHR),
    },
    caloriesBurned: {
      max: max(validCalories),
      avg: avg(validCalories),
      total: validCalories.reduce((sum, val) => sum + val, 0),
    },
    totalSessions: rideSessions.length,
    totalDuration: Math.floor(totalDuration / (1000 * 60)), // Convert to minutes
  };
};

// Enhanced health score calculation using comprehensive metrics
const calculateEnhancedHealthScore = (guest, healthMetrics, rideMetrics) => {
  let score = 100; // Start with perfect score

  // Heart rate analysis
  if (healthMetrics.heartRate.avg) {
    const hr = healthMetrics.heartRate.avg;
    if (hr < guest.safe_hr_min || hr > guest.safe_hr_max) {
      score -= 20; // Significant penalty for unsafe heart rate
    } else if (hr < guest.safe_hr_min + 10 || hr > guest.safe_hr_max - 10) {
      score -= 10; // Minor penalty for borderline heart rate
    }
  }

  // Blood pressure analysis
  if (
    healthMetrics.bloodPressure.avgSystolic &&
    healthMetrics.bloodPressure.avgDiastolic
  ) {
    const systolic = healthMetrics.bloodPressure.avgSystolic;
    const diastolic = healthMetrics.bloodPressure.avgDiastolic;

    if (systolic > 140 || diastolic > 90) {
      score -= 15; // Penalty for high blood pressure
    } else if (systolic < 90 || diastolic < 60) {
      score -= 10; // Penalty for low blood pressure
    }
  }

  // Activity level analysis
  if (healthMetrics.activityLevel.avg === "Low") {
    score -= 15; // Penalty for low activity
  } else if (healthMetrics.activityLevel.avg === "High") {
    score += 10; // Bonus for high activity
  }

  // Stress level analysis
  if (healthMetrics.stressLevel.avg === "High") {
    score -= 15; // Penalty for high stress
  } else if (healthMetrics.stressLevel.avg === "Low") {
    score += 5; // Bonus for low stress
  }

  // Ride participation bonus
  if (rideMetrics.totalSessions > 0) {
    score += Math.min(rideMetrics.totalSessions * 2, 20); // Bonus up to 20 points for ride participation
  }

  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, Math.round(score)));
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
  calculateComprehensiveHealthMetrics,
  calculateComprehensiveRideMetrics,
  calculateEnhancedHealthScore,
};
