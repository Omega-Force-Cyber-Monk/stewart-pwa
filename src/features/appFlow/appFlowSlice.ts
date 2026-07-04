import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import type {
  AppFlowState,
  DriverProfile,
  FunnelType,
  Locale,
  ModuleStatus,
} from "./appFlowTypes";

export type { AppFlowState, DriverProfile, FunnelType, Locale, ModuleStatus };

const initialModuleStatuses: Record<string, ModuleStatus> = {
  business_basics: "not_started",
  driver_page_setup: "not_started",
  booking_tool_setup: "not_started",
  first_customer_outreach: "not_started",
  review_referral_engine: "not_started",
  repeat_rider_systems: "not_started",
  b2b_scale_growth: "not_started",
};

const initialState: AppFlowState = {
  locale: "en",
  activeFunnel: "standard",
  hasPurchased: false,
  hasDfyUpgrade: false,
  onboardingCompleted: false,
  driverProfile: null,
  moduleStatuses: initialModuleStatuses,
  dfyPipelineStep: 0,
};

const moduleStatusCycle: ModuleStatus[] = ["not_started", "in_progress", "complete"];
const clampDfyPipelineStep = (step: number) => Math.min(6, Math.max(0, step));

const appFlowSlice = createSlice({
  name: "appFlow",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    toggleLocale: (state) => {
      state.locale = state.locale === "en" ? "es" : "en";
    },
    setActiveFunnel: (state, action: PayloadAction<FunnelType>) => {
      state.activeFunnel = action.payload;
    },
    completePurchase: (
      state,
      action: PayloadAction<{ hasDfyUpgrade: boolean }>,
    ) => {
      state.hasPurchased = true;
      state.hasDfyUpgrade = action.payload.hasDfyUpgrade;
    },
    submitOnboarding: (state, action: PayloadAction<DriverProfile>) => {
      state.driverProfile = action.payload;
      state.onboardingCompleted = true;
    },
    updateModuleStatus: (
      state,
      action: PayloadAction<{ moduleId: string; status?: ModuleStatus }>,
    ) => {
      const currentStatus = state.moduleStatuses[action.payload.moduleId];

      if (!currentStatus) return;

      if (action.payload.status) {
        state.moduleStatuses[action.payload.moduleId] = action.payload.status;
        return;
      }

      const currentIndex = moduleStatusCycle.indexOf(currentStatus);
      const nextStatus = moduleStatusCycle[(currentIndex + 1) % moduleStatusCycle.length];

      state.moduleStatuses[action.payload.moduleId] = nextStatus;
    },
    setDfyPipelineStep: (state, action: PayloadAction<number>) => {
      state.dfyPipelineStep = clampDfyPipelineStep(action.payload);
    },
    resetDemo: () => initialState,
  },
});

export const {
  setLocale,
  toggleLocale,
  setActiveFunnel,
  completePurchase,
  submitOnboarding,
  updateModuleStatus,
  setDfyPipelineStep,
  resetDemo,
} = appFlowSlice.actions;

export const selectLocale = (state: RootState) => state.appFlow.locale;
export const selectActiveFunnel = (state: RootState) => state.appFlow.activeFunnel;
export const selectHasPurchased = (state: RootState) => state.appFlow.hasPurchased;
export const selectHasDfyUpgrade = (state: RootState) => state.appFlow.hasDfyUpgrade;
export const selectOnboardingCompleted = (state: RootState) =>
  state.appFlow.onboardingCompleted;
export const selectDriverProfile = (state: RootState) => state.appFlow.driverProfile;
export const selectModuleStatuses = (state: RootState) => state.appFlow.moduleStatuses;
export const selectDfyPipelineStep = (state: RootState) => state.appFlow.dfyPipelineStep;
export const selectCompletedModuleCount = (state: RootState) =>
  Object.values(state.appFlow.moduleStatuses).filter((status) => status === "complete")
    .length;
export const selectTotalModuleCount = (state: RootState) =>
  Object.keys(state.appFlow.moduleStatuses).length;
export const selectLaunchProgressPercentage = (state: RootState) => {
  const total = selectTotalModuleCount(state);

  if (total === 0) return 0;

  return Math.round((selectCompletedModuleCount(state) / total) * 100);
};

export default appFlowSlice.reducer;
