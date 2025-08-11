// safepulse/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import guestReducer from '../slices/guestSlice';
import headerReducer from '../slices/headerSlice';

// Root reducer
const rootReducer = combineReducers({
  guest: guestReducer,
  header: headerReducer,
});

// Persist configuration for header slice only
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['header'], // Only persist header state
  blacklist: ['guest'], // Don't persist guest data
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for redux-persist
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
          'guest/fetchGuests/pending', 
          'guest/fetchGuests/fulfilled', 
          'guest/fetchGuests/rejected'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['guest.timestamp', 'header.lastUpdated', 'header.nextRefreshTime'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;