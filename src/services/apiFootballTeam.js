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

export const getFootballTeamFromId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/footballTeam/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// // Створити нове бронювання
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
        const response = await axios.post(`${API_BASE_URL}/footballTeam`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data if needed
                'Authorization': `Bearer ${data.token}`
            }
        });
        console.log('Server Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};
//
// // Оновити існуюче бронювання
// export const updateBooking = async (id, bookingData) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/bookings/${id}`, bookingData);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.message);
//     }
// };
//
// // Видалити бронювання за його ідентифікатором
// export const deleteBooking = async (id) => {
//     try {
//         await axios.delete(`${API_BASE_URL}/bookings/${id}`);
//     } catch (error) {
//         throw new Error(error.response.data.message);
//     }
// };
