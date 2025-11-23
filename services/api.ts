// services/api.ts
import axios from 'axios';

const AUTH_API_BASE_URL = 'https://dummyjson.com';

const authApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  timeout: 10000,
});

export interface LoginResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// ============ Authentication APIs ============
export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await authApi.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  register: async (username: string, email: string, password: string): Promise<LoginResponse> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      return {
        success: true,
        data: {
          id: Math.random().toString(36).substr(2, 9),
          username,
          email,
          firstName: username,
          lastName: 'User',
          token: 'mock_token_' + Date.now(),
        },
      };
    } catch {
      return {
        success: false,
        error: 'Registration failed',
      };
    }
  },
};

export default authService;