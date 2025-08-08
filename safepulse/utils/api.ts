import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
        user: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
            isActive: boolean;
        };
    };
    error?: string;
}

const api = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password,
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

    // Add other API methods as needed
    getProfile: async () => {
        const response = await apiClient.get('/auth/profile');
        return response.data;
    },

    updateProfile: async (userData: any) => {
        const response = await apiClient.put('/auth/profile', userData);
        return response.data;
    },
};

export default api; 