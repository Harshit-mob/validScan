import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import ApiConstants from './ApiConstants';

const TOKEN_KEY = 'authToken';

const apiClient = axios.create({
    baseURL: ApiConstants.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    } as Record<string, string>,
});

// Request Interceptor: Attach token to every request
apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                // Alert.alert('Unauthorized', 'Please log in again.');
            } else if (status === 403) {
                // Alert.alert('Forbidden', 'You do not have access to this resource.');
            } else if (status === 404) {
                // Alert.alert('Not Found', 'The requested resource was not found.');
            } else if (status === 500) {
                // Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
            } else {
                // Alert.alert('Error', data?.message || 'An unknown error occurred.');
            }
        } else {
            // Alert.alert('Network Error', 'Please check your internet connection.');
        }
        return Promise.reject(error);
    }
);

const ApiService = {
    async setToken(token) {
        try {
            await AsyncStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    },

    async removeToken() {
        try {
            await AsyncStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error removing token:', error);
        }
    },

    async getToken() {
        try {
            return await AsyncStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error retrieving token:', error);
            return null;
        }
    },

    get(endpoint, config = {}) {
        return apiClient.get(endpoint, config).then((res) => res.data);
    },

    post(endpoint, data, config = {}) {
        return apiClient.post(endpoint, data, config).then((res) => res.data);
    },

    put(endpoint, data, config = {}) {
        return apiClient.put(endpoint, data, config).then((res) => res.data);
    },

    delete(endpoint, config = {}) {
        return apiClient.delete(endpoint, config).then((res) => res.data);
    },
};

export default ApiService;
