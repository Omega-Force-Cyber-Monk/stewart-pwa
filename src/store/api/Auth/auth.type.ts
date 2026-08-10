import type { User } from "../../features/auth/authSlice";

export interface RegisterRequest {
    email: string;
    password?: string;
    confirmPassword?: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    delivery: {
        channel: string;
        devOtp?: string;
    };
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface VerifyOtpResponse {
    success: boolean;
    message: string;
}

export interface ResendOtpRequest {
    email: string;
}

export interface ResendOtpResponse {
    success: boolean;
    message: string;
    delivery: {
        channel: string;
    };
}

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface LoginResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
    delivery: {
        channel: string;
    };
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    password?: string;
    confirmPassword?: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}

export interface MeResponse {
    success: boolean;
    user: User;
}

export interface UpdateProfileRequest {
    name?: string;
    phone?: string;
}

export interface ChangeEmailRequest {
    email: string;
}

export interface ChangeEmailResponse {
    success: boolean;
    message: string;
    delivery: {
        channel: string;
    };
}

export interface ConfirmEmailChangeRequest {
    email: string;
    otp: string;
}

export interface ConfirmEmailChangeResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface UploadAvatarResponse {
    success: boolean;
    avatarUrl: string;
}

export interface ChangePasswordRequest {
    currentPassword?: string;
    password?: string;
    confirmPassword?: string;
}

export interface ChangePasswordResponse {
    success: boolean;
    message: string;
}

