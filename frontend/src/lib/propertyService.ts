import API_BASE_URL from './api';
import { getAuthToken } from './authService';

export interface Property {
    _id: string;
    title: string;
    type: 'buy' | 'rent' | 'book';
    price: number;
    location: string;
    owner: {
        _id: string;
        name: string;
        email: string;
    };
    status: 'pending' | 'approved' | 'completed';
    createdAt: string;
    updatedAt: string;
}

export interface CreatePropertyData {
    title: string;
    type: 'buy' | 'rent' | 'book';
    price: number;
    location: string;
}

/**
 * Get all approved properties
 */
export const getProperties = async (): Promise<Property[]> => {
    const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch properties');
    }

    return response.json();
};

/**
 * Create a new property (requires authentication)
 */
export const createProperty = async (data: CreatePropertyData): Promise<Property> => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('You must be logged in to create a property');
    }

    const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create property');
    }

    return response.json();
};

/**
 * Approve a property (admin only)
 */
export const approveProperty = async (propertyId: string): Promise<Property> => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('You must be logged in to approve properties');
    }

    const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/approve`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to approve property');
    }

    return response.json();
};
