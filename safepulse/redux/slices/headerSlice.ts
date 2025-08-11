import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  refreshInterval: number;
  isPaused: boolean;
  pageCallbackFunc: () => void;
}

const initialState: HeaderState = {
  refreshInterval: 60 * 1000,
  isPaused: true,
  pageCallbackFunc: () => {},
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setRefreshInterval: (state, action: PayloadAction<number>) => {
      state.refreshInterval = action.payload;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    setPageCallbackFunc: (state, action: PayloadAction<() => void>) => {
      state.pageCallbackFunc = action.payload;
    },
  },
});

export const {
  setRefreshInterval,
  togglePause,
  setPageCallbackFunc,
} = headerSlice.actions;

export default headerSlice.reducer;
