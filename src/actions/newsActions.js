export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNews = () => async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });

    try {
        const response = await fetch('https://soccer-club-backend.onrender.com/api/news/global-news');
        const text = await response.text(); // Отримуємо відповідь як текст
        console.log('Fetched response:', text); // Логуємо відповідь
        try {
            const data = JSON.parse(text); // Пробуємо розпарсити JSON
            dispatch({ type: FETCH_NEWS_SUCCESS, payload: data.articles });
        } catch (parseError) {
            console.error('Invalid JSON:', parseError);
            dispatch({ type: FETCH_NEWS_FAILURE, payload: null }); // Встановлюємо payload в null у разі помилки
        }
    } catch (networkError) {
        dispatch({ type: FETCH_NEWS_FAILURE, payload: networkError.message });
    }
};
