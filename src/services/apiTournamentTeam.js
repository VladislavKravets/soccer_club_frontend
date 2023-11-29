// teamService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tournament-team';

export const getAllTeams = async (tournamentId) => {
    return await axios.get(BASE_URL + '/' + tournamentId);
};

export const getAllTeamsNotByTournament = async (tournamentId) => {
    return await axios.get(BASE_URL + '/getAllTeamByNotTournamentTeam/' + tournamentId);
};

export const addTeam = async (tournamentTeam, token) => {
    const response = await axios.post(BASE_URL, tournamentTeam, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteTeam = async (tournamentTeam, token) => {
    console.log(tournamentTeam);

    const config = {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: tournamentTeam, // This is where you pass the data for DELETE requests
    };

    return await axios.delete(BASE_URL, config);
};

