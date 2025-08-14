// safepulse/redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import guestReducer from "../slices/guestSlice";
import headerReducer from "../slices/headerSlice";
import guestHealthReducer from "../slices/guestsHealthSlice";

// Root reducer
const rootReducer = combineReducers({
  guest: guestReducer,
  header: headerReducer,
  guestHealth: guestHealthReducer,
});

// Separate persist config for header with field filtering
const headerPersistConfig = {
  key: "header",
  storage,
  whitelist: ["refreshInterval", "isPaused"], // Only persist these specific fields
  blacklist: ["pageCallbackFunc", "lastUpdated", "nextRefreshTime"], // Explicitly exclude these
};

// Create persisted header reducer
const persistedHeaderReducer = persistReducer(
  headerPersistConfig,
  headerReducer
);

// Root reducer with persisted header
const persistedRootReducer = combineReducers({
  guest: guestReducer,
  header: persistedHeaderReducer,
  guestHealth: guestHealthReducer,
});

// Configure store
export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for redux-persist
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
          "guest/fetchGuests/pending",
          "guest/fetchGuests/fulfilled",
          "guest/fetchGuests/rejected",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: [
          "guest.timestamp",
          "header.lastUpdated",
          "header.nextRefreshTime",
          "header.pageCallbackFunc",
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
