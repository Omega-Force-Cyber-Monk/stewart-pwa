import type { Store } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import type { AppFlowState } from "../features/appFlow/appFlowTypes";
import { readStorageValue, removeStorageValue, storageKeys, writeStorageValue } from "../lib/storage";

type PersistedState = {
  appFlow: AppFlowState;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function loadPersistedState(): PersistedState | undefined {
  const serializedAppFlow = readStorageValue(storageKeys.appFlowState);

  if (!serializedAppFlow) return undefined;

  try {
    const parsedAppFlow: unknown = JSON.parse(serializedAppFlow);

    if (!isRecord(parsedAppFlow)) return undefined;

    return {
      appFlow: parsedAppFlow as AppFlowState,
    };
  } catch {
    return undefined;
  }
}

export function persistStoreState(store: Store<RootState>) {
  let previousSerializedAppFlow = "";

  return store.subscribe(() => {
    const appFlow = store.getState().appFlow;
    const serializedAppFlow = JSON.stringify(appFlow);

    if (serializedAppFlow === previousSerializedAppFlow) return;

    previousSerializedAppFlow = serializedAppFlow;
    writeStorageValue(storageKeys.appFlowState, serializedAppFlow);
  });
}

export function clearPersistedState() {
  removeStorageValue(storageKeys.appFlowState);
}
