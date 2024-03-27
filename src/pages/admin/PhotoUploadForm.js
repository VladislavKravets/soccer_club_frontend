import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Url} from "../../enum/Url";

const API_BASE_URL = Url.local;

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
            const response = await axios.post(`${API_BASE_URL}/photos/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.data.message) {
                console.log(response.data.message);
                setMessage(response.data.message);
            } else {
                setMessage('Успішно завантажено фотографію');
                console.log(response);
            }
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
            <div className="container name-page">
                <h1 style={{
                    width: "100%",
                    // textAlign: "center",
                    padding: "10px 20px",
                    background: "white",
                    borderRadius: "30px"
                }}>
                    Додати фотографію
                </h1>
            </div>
            <div className="container form-contain">
                <div className='login-page'>
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
                        <div>
                            {filePreview && (
                                <div className="preview-container">
                                    <img
                                        type="file" className="my" id="myfile" name="myfile"
                                        src={filePreview}
                                        alt="Preview"
                                        // className="file-preview"
                                    />
                                </div>
                            )}
                        </div>


                        <button style={{marginTop: "20px", width: "100%"}} type="submit">Завантажити</button>
                    </form>
                </div>
                {/*<p>{message}</p>*/}
                <br/>
                <h1 style={{color: 'black'}}>{message}</h1>
            </div>
        </div>
    );
};

export default PhotoUploadForm;
