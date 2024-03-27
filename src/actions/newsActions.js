export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNews = () => async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });

    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=ua&category=sport&apiKey=30bc5fff4e7b45bc934bc29e5077b2da');
        const data = await response.json();

        dispatch({ type: FETCH_NEWS_SUCCESS, payload: data.articles });
    } catch (error) {
        dispatch({ type: FETCH_NEWS_FAILURE, payload: error.message });
    }
};
