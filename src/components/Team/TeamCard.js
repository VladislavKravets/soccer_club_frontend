import React from 'react';

function TeamCard(props) {
    return (
        <div className="team-card">
            {
                props.img ?
                    <img src={props.img} alt="Картинка для новини"/>
                    :
                    <img src="/res/Spain_national_under-21_football_team_2011.jpg" alt="Картинка для новини"/>
            }
            <h3>{props.nameTeam}</h3>
        </div>
    );
}

export default TeamCard;
