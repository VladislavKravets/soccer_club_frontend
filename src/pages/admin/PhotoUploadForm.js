import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

function PhotoUploadForm(props) {
    const {tag} = useParams();
    const [tagInput, setTagInput] = useState(tag || '');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // Опційно, якщо потрібно показувати прев'ю файлу
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setMessage('Выберите файл для загрузки.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('tag', tagInput);

        try {
            const response = await axios.post('http://localhost:8080/api/photos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if(response.data.message) {
                console.log(response.data.message);
                setMessage(response.data.message);
            }else
                setMessage('Успішно завантажено фотографію');
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setMessage('Ошибка при загрузке файла.');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 10000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div className='main'>
            <div className='container login-page'>
                <h1>Завантаження фотографій</h1>
                <form onSubmit={handleFormSubmit} className="form-container">
                    <input
                        type="text"
                        placeholder="Тег турніру"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                    />
                    <input
                        className='upload-btn'
                        type="file"
                        onChange={handleFileChange}
                    />
                    {filePreview && (
                        <img
                            src={filePreview}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '200px',
                                marginTop: '10px',
                                width: "100%",
                                marginBottom: '10px'
                            }}
                        />
                    )}
                    <button type="submit">Завантажити</button>
                </form>
                {/*<p>{message}</p>*/}
                <br/>
                <h1 style={{color: 'black'}}>{message}</h1>
            </div>
        </div>
    );
};

export default PhotoUploadForm;
