import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {getAllTeams} from "../../services/apiTournamentTeam";
import {createMatch} from "../../services/apiMatches";

function CreateMatch() {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        tournamentId: id,
        matchDate: '',
        matchTime: '',
        team1Id: null,
        team2Id: null,
        // refereeId: null,
        team1TotalGoals: null,
        team2TotalGoals: null,
        groupStage: ''
    });

    // Для заповнення списків команд і суддів можна використати useEffect та Axios.

    const [teams, setTeams] = useState([]);
    const [referees, setReferees] = useState([]);

    useEffect(() => {
        // Отримати дані для команд і суддів за допомогою Axios і встановити їх в стан.
        const fetchTeams = async () => {
            try {
                const response = await getAllTeams(id);
                setTeams(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Помилка при отриманні даних для команд', error);
            }
        };

        // const fetchReferees = async () => {
        //     try {
        //         const response = await axios.get('URL_ДЛЯ_СУДДІВ');
        //         setReferees(response.data);
        //     } catch (error) {
        //         console.error('Помилка при отриманні даних для суддів', error);
        //     }
        // };

        fetchTeams();
        // fetchReferees();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(formData);
        try {
            const data = await createMatch(formData, token);
            console.log('Дані успішно відправлено', data);
        } catch (error) {
            console.error('Помилка при відправці даних', error);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className='form-container'>
                {/*<label>*/}
                {/*    Tournament ID:*/}
                {/*    <input*/}
                {/*        type="number"*/}
                {/*        name="tournamentId"*/}
                {/*        value={formData.tournamentId}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</label>*/}

                <label>
                    Match Date:
                    <input
                        type="date"
                        name="matchDate"
                        value={formData.matchDate}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Match Time:
                    <input
                        type="time"
                        name="matchTime"
                        value={formData.matchTime}
                        onChange={handleChange}
                    />
                </label>

                <p>
                    Команда 1:
                    <p>
                        <select name="team1Id" value={formData.team1Id} onChange={handleChange}>
                            <option value="">Select Team 1</option>
                            {teams.map((team) => (
                                <option key={team.teamid} value={team.teamid}>
                                    {team.teamname}
                                </option>
                            ))}
                        </select>
                    </p>
                </p>

                <p>
                    Команда 2:
                    <p>
                        <select name="team2Id" value={formData.team2Id} onChange={handleChange}>
                            <option value="">Select Team 2</option>
                            {teams.map((team) => (
                                <option key={team.teamid} value={team.teamid}>
                                    {team.teamname}
                                </option>
                            ))}
                        </select>
                    </p>
                </p>

                {/*<label>*/}
                {/*    Referee:*/}
                {/*    <select name="refereeId" value={formData.refereeId} onChange={handleChange}>*/}
                {/*        <option value="">Select Referee</option>*/}
                {/*        {referees.map((referee) => (*/}
                {/*            <option key={referee.id} value={referee.id}>*/}
                {/*                {referee.name}*/}
                {/*            </option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</label>*/}

                <label>
                    Team 1 Total Goals:
                    <input
                        type="number"
                        name="team1TotalGoals"
                        value={formData.team1TotalGoals}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Team 2 Total Goals:
                    <input
                        type="number"
                        name="team2TotalGoals"
                        value={formData.team2TotalGoals}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Груповий етап:
                    <input
                        type="number"
                        name="groupStage"
                        value={formData.groupStage}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateMatch;

