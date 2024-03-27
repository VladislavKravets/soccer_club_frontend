import React, {useState} from 'react';
import {createTournament} from "../../../services/apiTournament";

function CreateTournament(props) {
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [tournament, setTournament] = useState({
        tournamentName: '',
        startDate: '',
        endDate: '',
        organizer: '',
        tagName: ''
    });

    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

    const handleInputChange = (event) => {
        setTournament({
            ...tournament,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await createTournament({tournament, file, token});
            console.log(response)
            if (response.data.status === 400)
                console.log(response.data.message);
            else
                window.location.href = '/tournament/' + response.data.tournamentId;
        } catch (error) {
            console.log('Помилка при отриманні даних:', error);
        }
    };


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        setFile(selectedFile);

        // Перегляд фотографії перед завантаженням
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };


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
                    Створення турніру
                </h1>
            </div>
            <div className="container form-contain">
                <form onSubmit={handleSubmit} className="form-container">
                    <div style={{width: "100%", textAlign: "center"}}>
                        <label htmlFor="myfile" className="label">Фотографія турніру:</label>
                        <input type="file" className="my" id="myfile" name="myfile" onChange={handleFileChange}/>
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
                        <label>Назва турніру:</label>
                        <input type="text" name="tournamentName" value={tournament.tournamentName}
                               onChange={handleInputChange} required/>
                    </div>
                    <div>
                        <label>Дата початку турніру:</label>
                        <input type="date" name="startDate" value={tournament.startDate} onChange={handleInputChange}
                               required/>
                    </div>
                    <div>
                        <label>Дата кінця турніру:</label>
                        <input type="date" name="endDate" value={tournament.endDate} onChange={handleInputChange}
                               required/>
                    </div>
                    <div>
                        <label>Організатор:</label>
                        <input type="text" name="organizer" value={tournament.organizer} onChange={handleInputChange}
                               required/>
                    </div>
                    <div>
                        <label>Тег:</label>
                        <input type="text" name="tagName" value={tournament.tagName} onChange={handleInputChange}
                               required/>
                    </div>
                    <button type="submit" style={{width: "100%"}}>Відправити</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTournament;
