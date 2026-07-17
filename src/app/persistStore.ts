import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export function loadPersistedState(): undefined {
  return undefined;
}

export function persistStoreState(_store: Store<RootState>) {
  // no-op
}

export function clearPersistedState() {
  // no-op
}
