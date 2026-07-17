import { configureStore } from "@reduxjs/toolkit";
import { loadPersistedState, persistStoreState } from "./persistStore";

export const store = configureStore({
  reducer: {},
  preloadedState: loadPersistedState(),
});

persistStoreState(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
