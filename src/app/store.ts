import { configureStore } from "@reduxjs/toolkit";

import appFlowReducer from "../features/appFlow/appFlowSlice";
import { loadPersistedState, persistStoreState } from "./persistStore";

export const store = configureStore({
  reducer: {
    appFlow: appFlowReducer,
  },
  preloadedState: loadPersistedState(),
});

persistStoreState(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
