import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit';
import ApiService from '../../api/ApiService';
import {RootState} from "../store";
import ApiConstants from "../../api/ApiConstants";
import {LoginParams, LoginResponse} from "../../models/LoginModel";
import {StandardResponse} from "../../models/StandardResponse";

interface initialState {
    isLoading: boolean;
    isAuthenticated: boolean;
    error: any;
}

// Initial state
const initialState: initialState = {
    isLoading: false,
    isAuthenticated: false,
    error: null,
};

// Async thunk for Login
export const loginUser = createAsyncThunk<StandardResponse<LoginResponse>, LoginParams>(
    'Auth/Login',
    async ({ email, password }: LoginParams, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: StandardResponse<LoginResponse> = await ApiService.post(ApiConstants.LOGIN, { email, password });

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
const loginSlice = createSlice<initialState>({
    name: 'login',
    initialState,
    reducers: {
    }, // No reducers needed
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message ||  'Login failed';
            });
    },
});

// Export selectors
export const isLoading = (state: RootState) => state.login.isLoading;
export const isAuthenticated = (state: RootState) => state.login.isAuthenticated;
export const isError = (state: RootState) => state.login.error;

// Export reducer
export default loginSlice.reducer;
