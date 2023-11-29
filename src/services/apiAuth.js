import axios from 'axios';
import {Url} from "../enum/Url";

const API_BASE_URL = Url.local;

export const authorization = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const registration = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/registration`,data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
