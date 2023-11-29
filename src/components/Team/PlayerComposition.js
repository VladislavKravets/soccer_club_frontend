import React from 'react';
import './PlayerComposition.css';
function PlayerComposition(props) {
    return (
        <>
            <div className="composition-player">
                <img src={props.img} alt=""/>
                <div className="team-composition-text">
                    <h3>{props.fullName}</h3>
                    <p>{props.amplua}</p>
                    <h5>{props.date}</h5>
                </div>
            </div>
        </>
    );
}

export default PlayerComposition;
