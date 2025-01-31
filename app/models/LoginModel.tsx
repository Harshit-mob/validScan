export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LoginParams {
    email: string;
    password: string;
}
