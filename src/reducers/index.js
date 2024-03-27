import { combineReducers } from 'redux';
import newsReducer from './newsReducer'; // Імпортуємо ваш редуктор для новин

const rootReducer = combineReducers({
    news: newsReducer,
});

export default rootReducer;
