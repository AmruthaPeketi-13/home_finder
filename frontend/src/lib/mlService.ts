import axios from 'axios';

const ML_API_URL = 'http://localhost:5001';

export interface PredictRentRequest {
    city: string;
    locality: string;
    area: number;
    beds: number;
    bathrooms: number;
    balconies: number;
    furnishing: string;
}

export interface PredictRentResponse {
    success: boolean;
    predicted_rent: number;
    formatted_rent: string;
    input: PredictRentRequest;
    error?: string;
}

export const predictRent = async (data: PredictRentRequest): Promise<PredictRentResponse> => {
    try {
        const response = await axios.post(`${ML_API_URL}/predict`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw new Error('Failed to connect to ML prediction service');
    }
};

export const getAvailableCities = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${ML_API_URL}/cities`);
        return response.data.cities;
    } catch (error) {
        console.error('Failed to fetch cities:', error);
        return ['Mumbai', 'Bangalore', 'Pune', 'New Delhi', 'Nagpur'];
    }
};

export const getFurnishingTypes = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${ML_API_URL}/furnishing-types`);
        return response.data.furnishing_types;
    } catch (error) {
        console.error('Failed to fetch furnishing types:', error);
        return ['Furnished', 'Semi-Furnished', 'Unfurnished'];
    }
};
