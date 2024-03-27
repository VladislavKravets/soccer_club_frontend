import React, {useEffect, useState} from 'react';
import './InfoTour.css';
import CardNews from '../../../components/Tournament/CardNews';
import {getTournament, getTournamentAllNews, getTournamentAllPhoto} from '../../../services/apiTournament';
import CardTour from '../../../components/Tournament/CardTour';
import Modal from "../../../components/showImage/Modal";

function InfoTour(props) {
    const [news, setNews] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [visibleNewsCount, setVisibleNewsCount] = useState(2);
    const [visiblePhotoCount, setVisiblePhotoCount] = useState(2);
    const [modalImageUrl, setModalImageUrl] = useState(null); // Додайте стан для посилання на фотографію в модальному вікні

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const responseNews = await getTournamentAllNews(props.id);
            const responsePhoto = await getTournamentAllPhoto(props.id);
            setNews(responseNews);
            setPhoto(responsePhoto);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const showMoreNews = () => {
        setVisibleNewsCount(visibleNewsCount + 2);
    };

    const showMorePhotos = () => {
        setVisiblePhotoCount(visiblePhotoCount + 2);
    };

    const handlePhotoClick = (imageUrl) => {
        setModalImageUrl(imageUrl); // Встановлення посилання на фотографію для відображення в модальному вікні
    };

    const closeModal = () => {
        setModalImageUrl(null); // Закриття модального вікна
    };


    return (
        <div>
            <div className="container name-page">
                <h1 style={{width: "100%", background:"white", padding:"10px", borderRadius: "20px", paddingLeft: "20px"}}>
                    Новини
                </h1>
            </div>
            <div>
                <div className="grid-container-2">
                    {news.length > 0 ? news.slice(0, visibleNewsCount).map(post => (
                            <li key={post.newsId}>
                                <a href={`/posts/${post.newsId}`}>
                                    <CardNews post={post}/>
                                </a>
                            </li>
                        ))
                        :
                        <h1>Поки немає</h1>
                    }
                </div>
                {visibleNewsCount < news.length && (
                    <input className="info-tour-button" type="button" value="Показати більше" onClick={showMoreNews}/>
                )}
            </div>
            <div>
                <div className="container name-page">
                    <h1 style={{width: "100%", background:"white", padding:"10px", borderRadius: "20px", paddingLeft: "20px"}}>
                        Фото
                    </h1>
                </div>
                <div className="grid-container-2">
                    {photo.length > 0 ? photo.slice(0, visiblePhotoCount).map(post => (
                            <li key={post.photoId}>
                                <img className='info-tour-image' src={post.patch} alt="" onClick={() => handlePhotoClick(post.patch)} />
                            </li>
                        ))
                        :
                        <h1>Поки немає</h1>
                    }
                </div>
                {visiblePhotoCount < photo.length && (
                    <input className="info-tour-button" type="button" value="Показати більше" onClick={showMorePhotos}/>
                )}
            </div>
            {/* Модальне вікно для перегляду фотографій */}
            {modalImageUrl && <Modal imageUrl={modalImageUrl} onClose={closeModal} />}
        </div>
    );
}

export default InfoTour;
