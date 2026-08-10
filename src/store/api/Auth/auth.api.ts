import { baseApi } from "../baseApi";
import type {
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  MeResponse,
  UpdateProfileRequest,
  ChangeEmailRequest,
  ChangeEmailResponse,
  ConfirmEmailChangeRequest,
  ConfirmEmailChangeResponse,
} from "./auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerRider: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    verifyRegistrationOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    resendRegistrationOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    refreshUserToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
    logoutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    forgotUserPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetUserPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    getRiderProfile: builder.query<MeResponse, void>({
      query: () => "/auth/me",
    }),
    updateRiderProfile: builder.mutation<MeResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/auth/me",
        method: "PATCH",
        body,
      }),
    }),
    requestRiderEmailChange: builder.mutation<ChangeEmailResponse, ChangeEmailRequest>({
      query: (body) => ({
        url: "/auth/me/change-email",
        method: "POST",
        body,
      }),
    }),
    confirmRiderEmailChange: builder.mutation<ConfirmEmailChangeResponse, ConfirmEmailChangeRequest>({
      query: (body) => ({
        url: "/auth/me/confirm-email-change",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterRiderMutation,
  useVerifyRegistrationOtpMutation,
  useResendRegistrationOtpMutation,
  useLoginUserMutation,
  useRefreshUserTokenMutation,
  useLogoutUserMutation,
  useForgotUserPasswordMutation,
  useResetUserPasswordMutation,
  useGetRiderProfileQuery,
  useLazyGetRiderProfileQuery,
  useUpdateRiderProfileMutation,
  useRequestRiderEmailChangeMutation,
  useConfirmRiderEmailChangeMutation,
} = authApi;
