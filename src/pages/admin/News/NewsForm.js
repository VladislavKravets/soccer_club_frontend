import React, {useState} from 'react';
import axios from 'axios';
import {createPost} from "../../../services/apiNews";
import {useParams} from "react-router-dom";

const NewsForm = () => {
    const {tag} = useParams();
    // const [tagTournament, setTagTournament] = useState(tag | '');
    const [filePreview, setFilePreview] = useState(null);

    const [file, setFile] = useState(null);
    const [news, setNews] = useState({
        title: '',
        content: '',
        publicationDate: '',
        tagName: tag
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (event) => {
        setNews({
            ...news,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await createPost({news, file, token});
            console.log(response)
            if (response.data.message)
                console.log(response.data.message);
            else
                window.location.href = '/posts/' + response.data.newsId;
        } catch (error) {
            console.log('Помилка при отриманні даних:', error);
        }
    };


    return (
        <div className='main'>
            <form onSubmit={handleSubmit} className='form-container'>
                <div>
                    <label htmlFor="myfile" className="label">Фотографія новини:</label>
                    <input type="file" className="my" id="myfile" name="myfile" onChange={handleFileChange}/>
                </div>
                <div>
                    <label>Заголовок:</label>
                    <input type="text" name="title" value={news.title} onChange={handleInputChange} required/>
                    {filePreview && (
                        <div className="preview-container">
                            <img
                                src={filePreview}
                                alt="Preview"
                                className="file-preview"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label>Текст новини:</label>
                    <textarea
                        style={{width: '100%', resize: 'vertical'}}

                        name="content"
                        value={news.content}
                        onChange={handleInputChange}
                        required/>
                </div>
                <div>
                    <label>Дата публікації:</label>
                    <input type="date" name="publicationDate" value={news.publicationDate} onChange={handleInputChange}
                           required/>
                </div>
                <div>
                    <label>Тег:</label>
                    <input type="text" name="tagName" value={news.tagName} onChange={handleInputChange} required/>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default NewsForm;
