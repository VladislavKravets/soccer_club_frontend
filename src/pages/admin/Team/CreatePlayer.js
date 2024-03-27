import React, {useState} from 'react';
import {createTeam} from "../../../services/apiFootballTeam";
import {createPlayer} from "../../../services/apiPlayer";
import {useParams} from "react-router-dom";

function CreateTeam(props) {
    const { teamName } = useParams();

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [player, setPlayer] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        position: '',
        shirtNumber: '',
        teamName: teamName || '',
        active: false,
    });

    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setPlayer({
            ...player,
            [event.target.name]: value
        });
    };

    const handleSubmit = async (event) => {
        // console.log(player)
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            // const response = await createPlayer({player, file, token});
            const response = await createPlayer({player, file, token});
            // console.log(JSON.stringify({tournament: player, file, token}))
            if(response.data.message)
                console.log(response.data.message);
            else
                window.location.href = '/participants';
        } catch (error) {
            console.log('Error fetching data:', error);
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

                {/*<div>*/}
                {/*    <label>Фотографія Гравця:</label>*/}
                {/*    <input type="file" onChange={handleFileChange} />*/}
                {/*    {filePreview && (*/}
                {/*        <img*/}
                {/*            src={filePreview}*/}
                {/*            alt="Preview"*/}
                {/*            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', width: "100%"}}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</div>*/}

                <div>
                    <label>Ім'я гравця:</label>
                    <input type="text" name="firstName" value={player.firstName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Прізвище гравця:</label>
                    <input type="text" name="lastName" value={player.lastName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>День народження гравця:</label>
                    <input type="date" name="birthDate" value={player.birthDate} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Позиція гравця на полі (воротарь, захисник тощо):</label>
                    <input type="text" name="position" value={player.position} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Номер футболки:</label>
                    <input type="text" name="shirtNumber" value={player.shirtNumber} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Назва команди:</label>
                    <input type="text" name="teamName" value={player.teamName} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Грає чи зараз гравець (активність):</label>
                    <input type="checkbox" name="active" value={player.active} onChange={handleInputChange} required />
                </div>

                <button type="submit" style={{width: "100%"}}>Відправити</button>
            </form>
        </div>
    );
}

export default CreateTeam;
