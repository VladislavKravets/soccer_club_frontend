import React from 'react';
import './TeamComposition.css'
import PlayerComposition from "../../../components/Team/PlayerComposition";

function TeamComposition(props) {
    return (
        <>
            <div className="team-photo">
                <img src='/res/Spain_national_under-21_football_team_2011.jpg'
                     style={{width: '100%'}} alt="Фото команди"/>
            </div>
            <div className="team-composition grid-container-3">
                <PlayerComposition
                    img='/res/6047530021a18_cover.jpg' fullName='Lorean Ipson'
                    amplua='helper' date='25.07.1990'
                />
                <PlayerComposition
                    img='/res/6047530021a18_cover.jpg' fullName='Lorean Ipson'
                    amplua='helper' date='25.07.1990'
                />
                <PlayerComposition
                    img='/res/6047530021a18_cover.jpg' fullName='Lorean Ipson'
                    amplua='helper' date='25.07.1990'
                />
                <PlayerComposition
                    img='/res/6047530021a18_cover.jpg' fullName='Lorean Ipson'
                    amplua='helper' date='25.07.1990'
                />
            </div>
        </>
    );
}

export default TeamComposition;
