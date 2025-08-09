// safepulse/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import guestReducer from "../slices/guestSlice";

export const store = configureStore({
  reducer: {
    guest: guestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "guest/fetchGuests/pending",
          "guest/fetchGuests/fulfilled",
          "guest/fetchGuests/rejected",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["guest.timestamp"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
