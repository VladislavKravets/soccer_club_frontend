import React from 'react';
import './SheduleMathes.css';
function SheduleMatches(props) {
    return (
        <div>
            <li className="schedule__matches-item">
                <div className="schedule__time-place">
                        <span className="schedule__time">
                            {props.info.date + " " + props.info.matchTime}
                            {/*03 КВІТ. 2021 / 11:20*/}
                        </span>
                </div>
                <a className="schedule__team-1" href={props.info.team1_link}>
                            <span className="schedule__team-name schedule__team-name--right">
                                {props.info.nameTeam1}
                                {/*"Kolo druziv"*/}
                            </span>
                    <div className="schedule__team-logo schedule__team-logo--margin-left">
                        {/*<img className="schedule__team-img" src="https://st.joinsport.io/team/1178111/logo/606d87edc02e4_100x100.jpg">*/}
                    </div>
                </a>
                <a className="schedule__score" href={props.info.match_link}>
                    <div className="schedule__score-main">
                        {props.info.score}
                        {/*6 : 1*/}
                    </div>
                    <div className="schedule__score-additional">
                    </div>
                </a>
                <a className="schedule__team-2" href={props.info.team2_link}>
                    <div className="schedule__team-logo schedule__team-logo--margin-right">
                        {/*<img className="schedule__team-img" src="/assets/59b9badda1003665e5f4b7e41b4377e1/football_logo_100x100.png">*/}
                    </div>
                    <span className="schedule__team-name schedule__team-name--left">
                            {props.info.nameTeam2}
                        {/*ДЮСШ №2*/}
                        </span>
                </a>
                <ul className='form-results-list'>
                    {(() => {
                        switch (props.info.win) {
                            case 'lose':
                                return <li className="form-results-list-loss">П</li>;
                            case 'win':
                                return <li className="form-results-list-win">В</li>;
                            default:
                                return <li className="form-results-list-draw">Н</li>;
                        }
                    })()}
                </ul>
            </li>
        </div>
    );
}

export default SheduleMatches;
