import React, {useEffect} from 'react';
import './Home.css';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNews} from "../actions/newsActions";

function Home(props) {
    const dispatch = useDispatch();
    const {news, loading, error} = useSelector((state) => state.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error || !news) return <h1> Помилка отримання новин </h1>; // Якщо помилка або news дорівнює null, нічого не виводимо

    return (
        <>
            <div className="container name-page">
                <h1>Про федерацію</h1>
            </div>
            <div className="main">
                <div className="container">
                    <img src="/res/home.png" alt="Домашня сторінка"/>
                    <div className="comment-page">
                        <h3 style={{textAlign: 'center'}}>
                            Інформаційний сайт ЗВЕНИГОРОДСЬКОЇ ОБ'ЄДНАНОЇ ТЕРИТОРІАЛЬНОЇ ГРОМАДИ ЧЕРКАСЬКОЇ ОБЛАСТІ
                        </h3>
                    </div>

                    <div className='global-news'>
                        <h1>Спортивні новини України</h1>
                        <ul>
                            {news?.map((article, index) => (
                                <div className="global-news-news-card">
                                    <img src={article.urlToImage} alt={article.title} className="news-image" />
                                    <div className="global-news-news-content">
                                        <h2 className="global-news-news-title">{article.title}</h2>
                                        <p className="global-news-news-description">{article.description}</p>
                                        <a href={article.url} className="global-news-news-link" target="_blank" rel="noopener noreferrer">Детальніше</a>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
