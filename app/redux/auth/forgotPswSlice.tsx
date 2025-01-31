import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit';
import ApiService from '../../api/ApiService';
import {RootState} from "../store";
import ApiConstants from "../../api/ApiConstants";
import {StandardResponse} from "../../models/StandardResponse";
import {ForgotPswParams, ResetPasswordParams, VerifyOtpParams, VerifyOtpResponse} from "../../models/ForgotPswModel";

interface initialState {
    otpSentEmail: string;
    resetToken: string;
}

// Initial state
const initialState: initialState = {
    otpSentEmail: '',
    resetToken: '',
};

// Async thunk for Login
export const verifyEmail = createAsyncThunk<StandardResponse<any>, ForgotPswParams>(
    ApiConstants.FORGOT_PSW,
    async ({ email }: ForgotPswParams, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: StandardResponse<any> = await ApiService.post(ApiConstants.FORGOT_PSW, { email });

            if (response.status) {
                return fulfillWithValue({ data: {email}, message: response.message, status: response.status }); // Success case
            } else {
                return rejectWithValue(response); // API responded with status: false
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            return rejectWithValue({ data: null, message: errorMessage, status: false });
        }
    }
);

export const verifyOtp = createAsyncThunk<StandardResponse<VerifyOtpResponse>, VerifyOtpParams>(
    ApiConstants.VERIFY_OTP,
    async ({ email, otp }: VerifyOtpParams, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: StandardResponse<VerifyOtpResponse> = await ApiService.post(ApiConstants.VERIFY_OTP, { email, otp });

            if (response.status) {
                return fulfillWithValue(response); // Success case
            } else {
                return rejectWithValue(response); // API responded with status: false
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            return rejectWithValue({ data: null, message: errorMessage, status: false });
        }
    }
);

export const resetPassword = createAsyncThunk<StandardResponse<any>, ResetPasswordParams>(
    ApiConstants.RESET_PSW,
    async ({ resetToken, password }: ResetPasswordParams, { fulfillWithValue, rejectWithValue }) => {
        try {
            console.log('resetToken', resetToken)
            const response: StandardResponse<any> = await ApiService.post(ApiConstants.RESET_PSW, { password }, {
                headers: {
                    Authorization: `Bearer ${resetToken}`,  // Add 'Bearer ' before the token
                },
            });

            if (response.status) {
                return fulfillWithValue(response); // Success case
            } else {
                return rejectWithValue(response); // API responded with status: false
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            return rejectWithValue({ data: null, message: errorMessage, status: false });
        }
    }
);

// Slice
const forgotPswSlice = createSlice<initialState>({
    name: 'forgotPsw',
    initialState,
    reducers: {
    }, // No reducers needed
    extraReducers: (builder) => {
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.otpSentEmail = ''
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.otpSentEmail = action.payload.data.email;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.resetToken = ''
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.resetToken = action.payload.data.resetToken;
            })

        ;
    },
});


export const getOtpSentEmail = (state: RootState) => state.forgotPsw.otpSentEmail;
export const getResetToken = (state: RootState) => state.forgotPsw.resetToken;

// Export reducer
export default forgotPswSlice.reducer;
