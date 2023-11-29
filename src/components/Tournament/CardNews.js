import React from 'react';
import './CardNews.css';
function CardNews(props) {
    console.log(props.post);
    return (
        <div className="card-news">
            {
                props.post.photoPath ?
                    <img src={props.post.photoPath} alt="Картинка для новин"/>
                    :
                    <img src="/res/Spain_national_under-21_football_team_2011.jpg" alt="Картинка для новини"/>
            }
            <div className="card-news-text">
                <p className='card-news-text-date'>{props.post.publicationDate}</p>
                <h1 className='card-news-text-title'>{props.post.title}</h1>
                <p className='card-news-text-info'>{props.post.content}</p>
            </div>
        </div>
    );
}

export default CardNews;
