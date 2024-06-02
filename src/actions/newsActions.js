export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNews = () => async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });

    try {
        const response = await fetch('https://soccer-club-backend.onrender.com/api/news/global-news');
        const data = await response.json();

        dispatch({ type: FETCH_NEWS_SUCCESS, payload: data.articles });
    } catch (error) {
        dispatch({ type: FETCH_NEWS_FAILURE, payload: error.message });
    }
};
