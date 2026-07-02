import { configureStore } from "@reduxjs/toolkit";

import appFlowReducer from "../features/appFlow/appFlowSlice";

export const store = configureStore({
  reducer: {
    appFlow: appFlowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
