import axios from 'axios';
import {Url} from "../enum/Url";

const API_BASE_URL = Url.local;

// Отримати всі бронювання
export const getPlayers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/players`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getPlayerStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/players/getPlayerStats`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
//
// // Отримати окреме бронювання за його ідентифікатором
export const getPlayersGetId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/players/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
//
// // Створити нове бронювання
// export const createBooking = async (bookingData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.message);
//     }
// };
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
