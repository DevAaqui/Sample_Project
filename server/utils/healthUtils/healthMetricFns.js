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

module.exports = {
  calculateAge,
  calculateHealthScore,
  formatTimeDuration,
};
