const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = localStorage.getItem('token');

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.message || 'Request failed',
                };
            }

            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Network error',
            };
        }
    }

    // Auth endpoints
    async login(email: string, password: string) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async logout() {
        return this.request('/auth/logout', {
            method: 'POST',
        });
    }

    async getProfile() {
        return this.request('/auth/profile');
    }

    // Dashboard data
    async getDashboardStats() {
        return this.request('/dashboard/stats');
    }

    async getHealthMetrics() {
        return this.request('/health/metrics');
    }

    async getRecentActivities() {
        return this.request('/activities/recent');
    }

    // Users
    async getUsers() {
        return this.request('/users');
    }

    async createUser(userData: any) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async updateUser(id: number, userData: any) {
        return this.request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async deleteUser(id: number) {
        return this.request(`/users/${id}`, {
            method: 'DELETE',
        });
    }

    // Guests
    async getGuests() {
        return this.request('/guests');
    }

    async createGuest(guestData: any) {
        return this.request('/guests', {
            method: 'POST',
            body: JSON.stringify(guestData),
        });
    }

    // Rides
    async getRides() {
        return this.request('/rides');
    }

    async getRideDetails(id: number) {
        return this.request(`/rides/${id}`);
    }

    // Safety
    async getSafetyReports() {
        return this.request('/safety/reports');
    }

    async createSafetyReport(reportData: any) {
        return this.request('/safety/reports', {
            method: 'POST',
            body: JSON.stringify(reportData),
        });
    }

    // Alerts
    async getAlerts() {
        return this.request('/alerts');
    }

    async markAlertAsRead(id: number) {
        return this.request(`/alerts/${id}/read`, {
            method: 'PUT',
        });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient; 