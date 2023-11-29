import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getAllTeams } from '../../services/apiTournamentTeam';
import { getMatchById, updateMatch } from '../../services/apiMatches';

function UpdateMatch() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        tournamentId: '',
        matchDate: '',
        matchTime: '',
        team1Id: null,
        team2Id: null,
        team1TotalGoals: null,
        team2TotalGoals: null,
        groupStage: '',
    });
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const matchResponse = await getMatchById(id);
                console.log(matchResponse)
                const teamsResponse = await getAllTeams(matchResponse.tournamentId);
                console.log(teamsResponse)
                setFormData({
                    tournamentId: matchResponse.tournamentId,
                    matchDate: matchResponse.matchDate,
                    matchTime: matchResponse.matchTime,
                    team1Id: matchResponse.team1Id,
                    team2Id: matchResponse.team2Id,
                    team1TotalGoals: matchResponse.team1TotalGoals,
                    team2TotalGoals: matchResponse.team2TotalGoals,
                    groupStage: matchResponse.groupStage,
                });

                setTeams(teamsResponse.data);
            } catch (error) {
                console.error('Error fetching match data', error);
            }
        };

        fetchMatchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await updateMatch(id, formData, token);
            console.log('Data successfully updated');
        } catch (error) {
            console.error('Error updating data', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-container">
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
                    Team 1:
                    <p>
                        <select name="team1Id" value={formData.team1Id} onChange={handleChange}>
                            <option value="">Select Team 1</option>
                            {teams?.map((team) => (
                                <option key={team.teamid} value={team.teamid}>
                                    {team.teamname}
                                </option>
                            ))}
                        </select>
                    </p>
                </p>

                <p>
                    Team 2:
                    <p>
                        <select name="team2Id" value={formData.team2Id} onChange={handleChange}>
                            <option value="">Select Team 2</option>
                            {teams?.map((team) => (
                                <option key={team.teamid} value={team.teamid}>
                                    {team.teamname}
                                </option>
                            ))}
                        </select>
                    </p>
                </p>

                <label>
                    Team 1 Total Goals:
                    <input
                        type="number"
                        name="team1TotalGoals"
                        value={formData.team1TotalGoals}
                        onChange={handleChange}
                        required={true}
                    />
                </label>

                <label>
                    Team 2 Total Goals:
                    <input
                        type="number"
                        name="team2TotalGoals"
                        value={formData.team2TotalGoals}
                        onChange={handleChange}
                        required={true}
                    />
                </label>
                <label>
                    Group Stage:
                    <input
                        type="number"
                        name="groupStage"
                        value={formData.groupStage}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateMatch;
