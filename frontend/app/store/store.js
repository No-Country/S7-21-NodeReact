import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { turnerSlice } from './turner/turnerSlice';
import { barberSlice } from './barber/barberSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootReducer = combineReducers({
  user: authSlice.reducer,
  turner: turnerSlice.reducer,
  barber: barberSlice.reducer

});

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
