import React, { useState, useEffect } from 'react';
import {
    getAllTeams,
    getAllTeamsNotByTournament,
    addTeam,
    deleteTeam
} from '../../../services/apiTournamentTeam';
import {useParams} from "react-router-dom";

const TournamentForm = () => {
    const { id } = useParams();
    const [teams, setTeams] = useState([]); // Change the initial state to an empty array
    const [notTeams, setNotTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const data = await getAllTeamsNotByTournament(id);
            console.log(data)
            console.log(data.data.message)
            if (data.data.message)
                window.location.href = '/';

            setNotTeams(data.data);

            const data2 = await getAllTeams(id);
            setTeams(data2.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setTeams({
            ...teams,
            [event.target.name]: event.target.value
        });
    };

    const addTeamHandler = async () => {
        if (selectedTeam !== '') {
            const addedTeam = await addTeam({ tournamentId: id, teamId: selectedTeam }, token);
            // setTeams([...teams, addedTeam]);
            // setSelectedTeam('');
            fetchData();
        }
    };



    const removeTeamHandler = async (teamid) => {
        try {
            console.log(await deleteTeam({tournamentId: id, teamId: teamid}, token));
            fetchData();
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };


    console.log(teams)
    return (
        <div className='container main form-container' style={{textAlign: 'center'}}>
            <h2>Додавання команд в турнір</h2>
            <ul>
                {teams.map((team) => (
                    <li key={team.tournamentid} style = {{margin: "0 auto"}}>
                        {team.photoUrl && <img src={team.photoUrl} alt=""/>}
                        {team.teamname}{' '}
                        <br/>
                        <button onClick={() => removeTeamHandler(team.teamid)}>Видалити команду з турніру</button>
                    </li>
                ))}
            </ul>
            <div>
                <label>Виберіть команду із доступних:</label>
                <br/>
                <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                >
                    <option value="">Команду не вибрано</option>
                    {notTeams.map((team) => (
                        <option key={team.teamid} value={team.teamid}>
                            {team.teamname}
                        </option>
                    ))}
                </select>
                <br/>
                <button onClick={addTeamHandler}>Додати команду</button>
            </div>
        </div>
    );
};

export default TournamentForm;
