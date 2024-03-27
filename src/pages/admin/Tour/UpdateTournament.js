import React, {useEffect, useState} from 'react';
import {getTournamentGetId, updateTournament} from "../../../services/apiTournament";
import {useParams} from "react-router-dom";

function UpdateTournament(props) {
    const {id} = useParams();

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [tournament, setTournament] = useState({
        tournamentName: '',
        startDate: '',
        endDate: '',
        organizer: '',
        tagName: '',
        photoUrl: '' // Додайте поле для URL фотографії
    });

    useEffect(() => {
        if (id !== undefined) {
            getTournamentGetId(id)
                .then(response => {
                    const tournamentData = response;
                    // console.log(response)
                    setTournament({
                        tournamentName: tournamentData.tournamentName,
                        startDate: tournamentData.startDate,
                        endDate: tournamentData.endDate,
                        organizer: tournamentData.organizer,
                        tagName: tournamentData.tag.tagName,
                        photoUrl: tournamentData.photo.path
                    });
                })
                .catch(error => {
                    console.error('Error fetching tournament data:', error);
                });
        }
    }, [props.tournamentId]);

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
            const response = await updateTournament(id, {tournament, file, token});
            console.log(response);
            if (response.data.message)
                console.log(response.data.message);
            else
                window.location.href = '/tournament/' + response.data.tournamentId;
            // console.log(JSON.stringify({ tournament, file, token }));
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

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

    // console.log(tournament)
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
                    Оновлення турніру
                </h1>
            </div>
            <div className="container form-contain">
                <form onSubmit={handleSubmit} className="form-container">
                    <div style={{width: "100%", textAlign: "center"}}>
                        <label htmlFor="myfile" className="label">Фотографія турніру:</label>
                        <input type="file" className="my" id="myfile" name="myfile" onChange={handleFileChange}/>
                        {filePreview ? (
                            <img
                                src={filePreview}
                                alt="Preview"
                                style={{maxWidth: '100%', maxHeight: '200px', marginTop: '10px', width: "100%"}}
                            />
                        ) : (
                            <img
                                src={tournament.photoUrl} // Використовуйте URL фотографії
                                alt="Preview"
                                style={{maxWidth: '100%', maxHeight: '200px', marginTop: '10px', width: "100%"}}
                            />
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

export default UpdateTournament;
