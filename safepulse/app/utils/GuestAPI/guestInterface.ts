export type Guest = {
  id: number;
  fullName: string;
  age: number;
  healthScore: number;
  lastRide: string;
  totalTimeSpent: string;
  email: string;
  gender: string;
  latestHeartRate: number | null;
  latestBloodPressure: string | null;
  latestSteps: number | null;
  latestCalories: number | null;
  safeHeartRateRange: string;
};
