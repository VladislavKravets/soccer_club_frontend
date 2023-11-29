import React, {useState} from 'react';
import {createTeam} from "../../../services/apiFootballTeam";

function CreateTeam(props) {
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [team, setTeam] = useState({
        teamName: '',
        coach: '',
        district: '',
        tagName: ''
    });

    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

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
            const response = await createTeam({team, file, token});
            console.log(JSON.stringify({tournament: team, file, token}))
            if(response.data.message)
                console.log(response.data.message);
            else
                window.location.href = '/participants/team/' + response.data.teamId;
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
                <button type="submit" style={{width: "100%"}}>Відправити</button>
            </form>
        </div>
    );
}

export default CreateTeam;
