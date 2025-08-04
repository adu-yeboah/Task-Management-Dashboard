/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LoginCredentials, User } from "@/types/auth";
import { instance } from "@/utils/api";

class authApi {
    async login(credentials: LoginCredentials) {
        try {
            const response = await instance.post<User>('/auth/login', credentials);
            return response.data;
        } catch (error) {
            this.handleError(error)
        }

    }

    async getMe() {
        try {
            const response = await instance.get('/auth/me');
            return response.data;
        } catch (error) {
            this.handleError(error)
        }
    }

    private handleError(error: any): Error {
        if (error.response) {
            const message = error.response.data.detail || error.response.data || 'An error occurred';
            return new Error(typeof message === 'string' ? message : JSON.stringify(message));
        } else if (error.request) {
            return new Error('Please check your network connection.');
        } else {
            return new Error('Request setup error: ' + error.message);
        }
    }

};

export const AuthService = new authApi();