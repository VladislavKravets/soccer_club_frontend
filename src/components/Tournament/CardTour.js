import React from 'react';
import Tags from "../Tags/Tags";

function CardTour(props) {
    return (
        <div className="card-tour" data-testid="main">
            {props.tournamentInfo.photoUrl ? (
                <img src={props.tournamentInfo.photoUrl} alt="Картинка для турніра"/>
            ) : (
                <img src="/res/Spain_national_under-21_football_team_2011.jpg" alt="Картинка для турніра"/>
            )}
            <h4>{props.tournamentInfo.tournamentName}</h4>
            <div className="info-tour">
                <p>{props.tournamentInfo.startDate + " - " + props.tournamentInfo.endDate}</p>
                <p>{props.tournamentInfo.countTeam + " команд"}</p>
                <p>{props.tournamentInfo.status}</p>
            </div>
            <div className="tour-tag">
                <Tags tag={props.tournamentInfo.tagName}/>
            </div>
        </div>
    );
}

export default CardTour;
