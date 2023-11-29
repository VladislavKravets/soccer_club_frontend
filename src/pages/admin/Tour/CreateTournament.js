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
            if(response.data.status === 400)
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
            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <label>Фотографія турніру:</label>
                    <input type="file" onChange={handleFileChange} />
                    {filePreview && (
                        <img
                            src={filePreview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', width: "100%"}}
                        />
                    )}
                </div>
                <div>
                    <label>Назва турніру:</label>
                    <input type="text" name="tournamentName" value={tournament.tournamentName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Дата початку турніру:</label>
                    <input type="date" name="startDate" value={tournament.startDate} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Дата кінця турніру:</label>
                    <input type="date" name="endDate" value={tournament.endDate} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Організатор:</label>
                    <input type="text" name="organizer" value={tournament.organizer} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Тег:</label>
                    <input type="text" name="tagName" value={tournament.tagName} onChange={handleInputChange} required />
                </div>
                <button type="submit" style={{width: "100%"}}>Відправити</button>
            </form>
        </div>
    );
}

export default CreateTournament;
