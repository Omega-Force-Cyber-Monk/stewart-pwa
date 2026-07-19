import { configureStore } from "@reduxjs/toolkit";
import { loadPersistedState, persistStoreState } from "./persistStore";

export const store = configureStore({
  reducer: {
    app: (state = { initialized: true }) => state,
  },
  preloadedState: loadPersistedState(),
});

persistStoreState(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
