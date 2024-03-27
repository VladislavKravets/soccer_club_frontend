import React, { useState, useEffect } from 'react';
import { updateTeam, getFootballTeamFromId } from "../../../services/apiFootballTeam";
import {useParams} from "react-router-dom";

function UpdateTeam() {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [team, setTeam] = useState({
        teamName: '',
        coach: '',
        district: '',
        tagName: ''
    });

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await getFootballTeamFromId(id);
                // const { teamData, fileData } = response;
                console.log(response)
                setTeam({
                        teamName: response.teamName,
                        coach: response.coach,
                        district: response.district,
                        tagName: response.tag.tagName,
                    }
                );
                setFilePreview(response.photo.path); // Встановлюємо URL зображення

                // if (fileData) {
                //     setFile(fileData);
                //     setFilePreview(URL.createObjectURL(fileData)); // Для перегляду фотографії перед завантаженням
                // }
            } catch (error) {
                console.log('Error fetching team data:', error);
            }
        };

        fetchTeam();
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleInputChange = (event) => {
        setTeam({
            ...team,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await updateTeam({id, team, file, token });
            console.log(JSON.stringify({ tournament: team, file, token }));
            console.log(response.data)
            if (response)
                window.location.href = '/participants/team/' + response.data.teamId;
        } catch (error) {
            console.log('Error fetching data:', error);
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
                            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', width: "100%" }}
                        />
                    )}
                </div>
                <div>
                    <label>Назва команди:</label>
                    <input type="text" name="teamName" value={team.teamName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Тренер (ПІБ) (ЧАСТКОВО):</label>
                    <input type="text" name="coach" value={team.coach} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Район:</label>
                    <input type="text" name="district" value={team.district} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Тег:</label>
                    <input type="text" name="tagName" value={team.tagName} onChange={handleInputChange} required />
                </div>
                <button type="submit" style={{ width: "100%" }}>Відправити</button>
            </form>
        </div>
    );
}

export default UpdateTeam;
