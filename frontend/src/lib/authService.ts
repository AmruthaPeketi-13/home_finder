import API_BASE_URL from './api';

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    role?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || 'user',
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
    }

    return response.json();
};

/**
 * Login an existing user
 */
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    return response.json();
};

/**
 * Store authentication token and user data in localStorage
 */
export const storeAuthData = (authResponse: AuthResponse) => {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('user', JSON.stringify({
        _id: authResponse._id,
        name: authResponse.name,
        email: authResponse.email,
        role: authResponse.role,
    }));
};

/**
 * Get stored authentication token
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

/**
 * Get stored user data
 */
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Clear authentication data (logout)
 */
export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};
