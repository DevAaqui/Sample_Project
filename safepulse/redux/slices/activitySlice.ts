// safepulse/redux/slices/activityTrackingSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// Define the interfaces
interface ActivityData {
  activeSessions: {
    title: string;
    current: number;
    percentageChange: string;
    trend: "positive" | "negative" | "neutral";
  };
  caloriesBurned: {
    title: string;
    current: number;
    percentageChange: string;
    trend: "positive" | "negative" | "neutral";
  };
  peakActivityTime: {
    title: string;
    current: string;
    percentageChange: string;
    trend: "positive" | "negative" | "neutral";
  };
  healthAlerts: {
    title: string;
    current: number;
    percentageChange: string;
    trend: "positive" | "negative" | "neutral";
  };
}

interface ActivityTrackingState {
  dashboardData: ActivityData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
}

// Initial state
const initialState: ActivityTrackingState = {
  dashboardData: [],
  loading: false,
  error: null,
  lastUpdated: null,
  autoRefresh: true,
  refreshInterval: 30, // 30 seconds
};

// Async thunk for fetching activity tracking dashboard data
export const fetchActivityDashboard = createAsyncThunk(
  "activityTracking/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/service?endpoint=/activity-tracking/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch activity dashboard"
      );
    }
  }
);

// Async thunk for fetching individual metrics
export const fetchActiveSessions = createAsyncThunk(
  "activityTracking/fetchActiveSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/service?endpoint=/activity-tracking/active-sessions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch active sessions"
      );
    }
  }
);

export const fetchCaloriesBurned = createAsyncThunk(
  "activityTracking/fetchCaloriesBurned",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/service?endpoint=/activity-tracking/calories-burned`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch calories burned"
      );
    }
  }
);

export const fetchPeakActivityTime = createAsyncThunk(
  "activityTracking/fetchPeakActivityTime",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/service?endpoint=/activity-tracking/peak-activity-time`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch peak activity time"
      );
    }
  }
);

export const fetchHealthAlerts = createAsyncThunk(
  "activityTracking/fetchHealthAlerts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/service?endpoint=/activity-tracking/health-alerts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch health alerts"
      );
    }
  }
);

// Create the slice
const activityTrackingSlice = createSlice({
  name: "activityTracking",
  initialState,
  reducers: {

    dashboarCarddData: (state, action: PayloadAction<ActivityData[]>) => {
      state.dashboardData = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset state
    resetActivityTrackingState: (state) => {
      state.dashboardData = [];
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
      state.autoRefresh = true;
      state.refreshInterval = 30;
    },

    // Update last updated timestamp
    updateLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard pending
      .addCase(fetchActivityDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch dashboard fulfilled
      .addCase(fetchActivityDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload.data || [];
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      // Fetch dashboard rejected
      .addCase(fetchActivityDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch activity dashboard";
      })
  },
});

// Export actions
export const {
  dashboarCarddData,
  clearError,
  resetActivityTrackingState,
  updateLastUpdated,
} = activityTrackingSlice.actions;


export default activityTrackingSlice.reducer;