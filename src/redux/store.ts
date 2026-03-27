import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import shoppingReducer from "./slices/shoppingSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["shopping"],
};

const persistedReducer = persistReducer(persistConfig, shoppingReducer);

export const store = configureStore({
  reducer: {
    shopping: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
