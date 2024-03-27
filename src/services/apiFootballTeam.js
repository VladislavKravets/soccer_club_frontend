import axios from 'axios';
import {Url} from "../enum/Url";

const API_BASE_URL = Url.local;

export const getFootballTeam = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/footballTeam`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getFootballTeamFromId = async (footballTeamId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/footballTeam/footballTeamById/${footballTeamId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getInfoFootballTeamById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/footballTeam/getInfo/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getMatchesFootballTeamById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/footballTeam/getMatches/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const createTeam = async (data) => {
    const blob = new Blob([JSON.stringify(data.team)], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('footballTeam', blob);

    // Выводим содержимое formData в консоль
    // console.log(formData.get('file'));

    try {
        return await axios.post(`${API_BASE_URL}/footballTeam`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data if needed
                'Authorization': `Bearer ${data.token}`
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export const updateTeam = async (data) => {
    const blob = new Blob([JSON.stringify(data.team)], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('footballTeam', blob);

    try {
        // console.log(data)
        return await axios.put(`${API_BASE_URL}/footballTeam/${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data if needed
                'Authorization': `Bearer ${data.token}`
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

// Видалити бронювання за його ідентифікатором
export const deleteTeam = async (id, token) => {
    try {
        return await axios.delete(`${API_BASE_URL}/footballTeam/${id}` , {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
