import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  phone?: string;
  isVerified?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

// Load initial state from localStorage safely
const getInitialState = (): AuthState => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    console.error("Failed to load initial auth state from localStorage:", error);
    return {
      accessToken: null,
      refreshToken: null,
      user: null,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string; user: User }>
    ) {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;

      try {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to save credentials to localStorage:", error);
      }
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to update user in localStorage:", error);
      }
    },
    logOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Failed to clear credentials from localStorage:", error);
      }
    },
  },
});

export const { setCredentials, updateUser, logOut } = authSlice.actions;
export default authSlice.reducer;
