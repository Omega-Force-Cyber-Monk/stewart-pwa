import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Locale = "en" | "es";
export type FunnelType = "standard" | "women" | "seniors" | "couples";
export type ModuleStatus = "locked" | "available" | "in-progress" | "complete";

export type DriverProfile = {
  name: string;
  email: string;
  phone: string;
  city: string;
  vehicleStatus: string;
  launchGoal: string;
};

export type ModuleKey =
  | "businessSetup"
  | "vehicleReadiness"
  | "localMarketing"
  | "dispatchSystems"
  | "launchChecklist";

export type ModuleStatuses = Record<ModuleKey, ModuleStatus>;

export type DfyPipelineStep =
  | "intake"
  | "business-buildout"
  | "asset-prep"
  | "launch-handoff"
  | "complete";

type AppFlowState = {
  locale: Locale;
  activeFunnel: FunnelType;
  hasPurchased: boolean;
  hasDfyUpgrade: boolean;
  onboardingCompleted: boolean;
  driverProfile: DriverProfile | null;
  moduleStatuses: ModuleStatuses;
  dfyPipelineStep: DfyPipelineStep;
};

const initialModuleStatuses: ModuleStatuses = {
  businessSetup: "available",
  vehicleReadiness: "locked",
  localMarketing: "locked",
  dispatchSystems: "locked",
  launchChecklist: "locked",
};

const initialState: AppFlowState = {
  locale: "en",
  activeFunnel: "standard",
  hasPurchased: false,
  hasDfyUpgrade: false,
  onboardingCompleted: false,
  driverProfile: null,
  moduleStatuses: initialModuleStatuses,
  dfyPipelineStep: "intake",
};

const appFlowSlice = createSlice({
  name: "appFlow",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    setActiveFunnel: (state, action: PayloadAction<FunnelType>) => {
      state.activeFunnel = action.payload;
    },
    completePurchase: (
      state,
      action: PayloadAction<{ hasDfyUpgrade?: boolean } | undefined>,
    ) => {
      state.hasPurchased = true;
      state.hasDfyUpgrade = Boolean(action.payload?.hasDfyUpgrade);
    },
    submitOnboarding: (state, action: PayloadAction<DriverProfile>) => {
      state.driverProfile = action.payload;
      state.onboardingCompleted = true;
      state.moduleStatuses.businessSetup = "in-progress";
    },
    updateModuleStatus: (
      state,
      action: PayloadAction<{ module: ModuleKey; status: ModuleStatus }>,
    ) => {
      state.moduleStatuses[action.payload.module] = action.payload.status;
    },
    setDfyPipelineStep: (state, action: PayloadAction<DfyPipelineStep>) => {
      state.dfyPipelineStep = action.payload;
    },
    resetDemo: () => initialState,
  },
});

export const {
  setLocale,
  setActiveFunnel,
  completePurchase,
  submitOnboarding,
  updateModuleStatus,
  setDfyPipelineStep,
  resetDemo,
} = appFlowSlice.actions;

export default appFlowSlice.reducer;
