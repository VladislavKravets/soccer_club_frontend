import axios from 'axios';
import {Url} from "../enum/Url";

const API_BASE_URL = Url.local;

// Отримати всі бронювання
export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/news`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
export const getAllGlobalNews = async () => {
    try {
        const response = await axios.get(`https://soccer-club-backend.onrender.com/api/news/global-news`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
//
// // Отримати окреме бронювання за його ідентифікатором
export const getPostId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/news/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const createPost = async (data) => {
    // Create a Blob object
    const blob = new Blob([JSON.stringify(data.news)], {
        type: 'application/json'
    });

    // Create a FormData object for uploading the file and news data
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('news', blob);

    try {
        return await axios.post(`${API_BASE_URL}/news`, formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data if needed
                Authorization: `Bearer ${data.token}`
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
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
