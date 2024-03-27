import axios from 'axios';
import {Url} from "../enum/Url";

const API_BASE_URL = Url.local;

export const getMatchByTourId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/match/getAllMathByTourId/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getMatchById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/match/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// // Створити нове бронювання
export const createMatch = async (match, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/match`, match, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// // Оновити існуюче бронювання
export const updateMatch = async (id, match, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/match/${id}`, match, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Видалити матч за його ідентифікатором
export const deleteMatchById = async (id, token) => {
    try {
        await axios.delete(`${API_BASE_URL}/match/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
