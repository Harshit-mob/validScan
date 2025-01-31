
export interface ForgotPswParams {
    email: string;
}

export interface VerifyOtpParams {
    email: string;
    otp: string;
}

export interface VerifyOtpResponse {
    resetToken: string
}

export interface ResetPasswordParams {
    resetToken: string
    password: string
}
