import axios from 'axios';
import {Url} from "../enum/Url";

const API_BASE_URL = Url.local;

export const getTournament = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tournament`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getTournamentInfoById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tournament/getTournamentInfoById/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getTournamentGetId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tournament/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getTournamentAllNews = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tournament/getAllNewsByTourId/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getTournamentAllPhoto = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tournament/getAllPhotoByTourId/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getTournamentTableById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tournament/getTournamentTable/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const createTournament = async (data) => {
    const blob = new Blob([JSON.stringify(data.tournament)], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('tournament', blob);
    try {
        return await axios.post(`${API_BASE_URL}/tournament`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data if needed
                'Authorization': `Bearer ${data.token}`,
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export const updateTournament = async (id, data) => {
    const blob = new Blob([JSON.stringify(data.tournament)], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('tournament', blob);

    // Выводим содержимое formData в консоль
    // console.log(formData.get('file'));

    try {
        return await axios.put(`${API_BASE_URL}/tournament/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data if needed
                'Authorization': `Bearer ${data.token}`
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};


export const deleteTournament = async (id, token) => {
    try {
        return await axios.delete(`${API_BASE_URL}/tournament/${id}` , {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
