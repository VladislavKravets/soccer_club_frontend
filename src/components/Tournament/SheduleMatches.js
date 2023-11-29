import React from 'react';

// import './SheduleMathes.css';
function SheduleMatches(props) {
    return (
        <div>
            <li className={"schedule__matches-item " + (props.date !== undefined ? 'green-background' : '')}>
                {/*<li className={"schedule__matches-item "}>*/}
                <div className="schedule__time-place">
                        <span className="schedule__time">
                            <h4>{props.date || props.info.matchtime}</h4>
                            {/*03 КВІТ. 2021 / 11:20*/}
                        </span>
                </div>
                {
                    !props.date &&
                    <>
                        <a className="schedule__team-1" href={"/participants/team/" + props.info.teamId1}>
                            <span className="schedule__team-name schedule__team-name--right">
                                {props.info.teamName1}
                                {/*"Kolo druziv"*/}
                            </span>
                            <div className="schedule__team-logo schedule__team-logo--margin-left">
                                {/*<img className="schedule__team-img" src="https://st.joinsport.io/team/1178111/logo/606d87edc02e4_100x100.jpg">*/}
                            </div>
                        </a>
                        {
                            props.info.team1TotalGoals != null ?
                                <a className="schedule__score" href={"/match/" + props.info.matchId}>
                                    <div className="schedule__score-main">
                                        {(props.info.team1TotalGoals || ' ') + " : " + (props.info.team2TotalGoals || ' ')}
                                        {/*6 : 1*/}
                                    </div>
                                    <div className="schedule__score-additional">
                                    </div>
                                </a>
                                :
                                <p>Рахунку немає</p>
                        }
                        <a className="schedule__team-2" href={"/team/" + props.info.teamId2}>
                            <div className="schedule__team-logo schedule__team-logo--margin-right">
                                {/*<img className="schedule__team-img" src="/assets/59b9badda1003665e5f4b7e41b4377e1/football_logo_100x100.png">*/}
                            </div>
                            <span className="schedule__team-name schedule__team-name--left">
                            {props.info.teamName2}
                                {/*ДЮСШ №2*/}
                        </span>
                        </a>
                        <div>
                            <p>Груповий
                                етап {props.info.groupStage !== null ? props.info.groupStage : "Поки не обрано"}</p>
                        </div>
                    </>
                }
            </li>
        </div>
    );
}

export default SheduleMatches;
