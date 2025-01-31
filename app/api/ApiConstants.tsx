export const per_page = 10;

const BASE_URL = 'http://172.16.17.171:5000/api/v1/';

const ApiConstants ={
    BASE_URL : BASE_URL,
    REFRESH_TOKEN: BASE_URL + 'Auth/refresh-token',
    LOGIN: 'Auth/Login',
    FORGOT_PSW: 'auth/forgot-password',
    VERIFY_OTP:'auth/verify-otp',
    RESET_PSW: 'auth/reset-password'
}

export default ApiConstants;
