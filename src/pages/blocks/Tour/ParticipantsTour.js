import React, {useEffect, useState} from 'react';
import TeamCard from "../../../components/Team/TeamCard";
import {getAllTeams} from "../../../services/apiTournamentTeam"

function ParticipantsTour(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getAllTeams(props.id);
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className="teams grid-container-3">
                {data.map(post => (
                    <li style={{listStyleType: 'none'}} key={post.teamId}>
                        <a href={`/participants/team/${post.teamid}`}>
                            <TeamCard img={post.photoUrl} nameTeam={post.teamname}/>
                        </a>
                    </li>
                ))}
            </div>
        </div>
    );
}

export default ParticipantsTour;