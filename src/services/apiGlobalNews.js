import axios from "axios";


export const getGlobalNews = async (id) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=ua&category=sport&apiKey=30bc5fff4e7b45bc934bc29e5077b2da`);
        return response.articles;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
