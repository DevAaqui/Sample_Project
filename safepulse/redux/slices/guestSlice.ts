// safepulse/redux/slices/guestSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Guest, PaginationInfo } from "@/app/utils/GuestAPI/guestInterface";
import { RootState } from "../store/store";

// Define the state interface
interface GuestState {
  guests: Guest[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchTerm: string;
}

// Initial state
const initialState: GuestState = {
  guests: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 50,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  },
  loading: false,
  error: null,
  currentPage: 1,
  searchTerm: "",
};

// Async thunk for fetching guests
export const fetchGuests = createAsyncThunk(
  "guest/fetchGuests",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/service?endpoint=/guests/metrics/latest&params=${JSON.stringify({
          page: page.toString(),
          limit: "50",
        })}`,
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
        error instanceof Error ? error.message : "Failed to fetch guests"
      );
    }
  }
);

// Create the slice
const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    // Set search term
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },

    // Set current page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset state
    resetGuestState: (state) => {
      state.guests = [];
      state.pagination = initialState.pagination;
      state.loading = false;
      state.error = null;
      state.currentPage = 1;
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch guests pending
      .addCase(fetchGuests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch guests fulfilled
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.loading = false;
        state.guests = action.payload.guests || [];
        state.pagination = action.payload.pagination || initialState.pagination;
        state.error = null;
      })
      // Fetch guests rejected
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch guests";
      });
  },
});

// Export actions
export const { setSearchTerm, setCurrentPage, clearError, resetGuestState } =
  guestSlice.actions;

// Export selectors
export const selectGuests = (state: RootState) => state.guest.guests;
export const selectPagination = (state: RootState) => state.guest.pagination;
export const selectLoading = (state: RootState) => state.guest.loading;
export const selectError = (state: RootState) => state.guest.error;
export const selectCurrentPage = (state: RootState) => state.guest.currentPage;
export const selectSearchTerm = (state: RootState) => state.guest.searchTerm;

// Export filtered guests selector
export const selectFilteredGuests = (state: RootState) => {
  const guests = state.guest.guests;
  const searchTerm = state.guest.searchTerm.toLowerCase();

  if (!searchTerm) return guests;

  return guests.filter(
    (guest) =>
      guest.fullName.toLowerCase().includes(searchTerm) ||
      guest.email.toLowerCase().includes(searchTerm)
  );
};

// Export stats selector
export const selectGuestStats = (state: RootState) => {
  const guests = state.guest.guests;
  const totalGuests = state.guest.pagination.totalCount;

  const healthyGuests = guests.filter((g) => g.healthScore >= 80).length;
  const needsAttention = guests.filter(
    (g) => g.healthScore < 80 && g.healthScore >= 60
  ).length;
  const avgHealthScore =
    guests.length > 0
      ? Math.round(
          guests.reduce((sum, g) => sum + g.healthScore, 0) / guests.length
        )
      : 0;

  return {
    total: totalGuests,
    healthy: healthyGuests,
    needsAttention: needsAttention,
    avgHealthScore: avgHealthScore,
  };
};

export default guestSlice.reducer;
