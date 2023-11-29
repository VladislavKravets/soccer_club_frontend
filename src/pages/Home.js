import React from 'react';

function Home(props) {
    return (
        <>
            <div className="container name-page">
                <h1>Про федерацію</h1>
            </div>
            <div className="main">
                <div className="container">
                    <img src='/res/home.png' alt="Домашня сторінка"/>
                    <div className="comment-page">
                        <p>Інформаційний сайт</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
