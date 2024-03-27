import React, {useEffect, useState} from 'react';
import './TeamComposition.css'
import PlayerComposition from "../../../components/Team/PlayerComposition";
import {getInfoFootballTeamById} from "../../../services/apiFootballTeam";
import {getPlayersByTeamId} from "../../../services/apiPlayer";

function TeamComposition(props) {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const {data} = await getPlayersByTeamId(props.id);
            setPlayers(data);
            console.log(data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="team-photo">
                {/*<img src='/res/Spain_national_under-21_football_team_2011.jpg'*/}
                <img src={props.data.photoUrl}
                     style={{width: '100%'}} alt="Фото команди"/>
            </div>

            <div className="name-page">
                <h1 style={{
                    width: "100%",
                    // textAlign: "center",
                    padding: "10px 20px",
                    background: "white",
                    borderRadius: "30px"
                }}>
                    Склад команди
                </h1>
            </div>

            <div className="team-composition grid-container-3">
                {
                    players.map((player, index) => (
                        <PlayerComposition
                            img={props.data.photoUrl || '/res/6047530021a18_cover.jpg'}
                            fullName={player.firstName + " " + player.lastName}
                            amplua={player.position}
                            date={player.birthDate}
                        />
                    ))
                }

            </div>
        </>
    );
}

export default TeamComposition;
