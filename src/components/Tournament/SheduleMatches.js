import React from 'react';
import {Roles} from "../../enum/Roles";
import {DontVisible} from "../../functions/userOrAdminAuthenticated";
import {useNavigate} from "react-router-dom";
import {deleteMatchById} from "../../services/apiMatches"

// import './SheduleMathes.css';
function SheduleMatches(props) {
    const navigate = useNavigate();
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
                            </span>
                            <div className="schedule__team-logo schedule__team-logo--margin-left">
                                {/* Add team logo if needed */}
                            </div>
                        </a>
                        {
                            props.info.team1TotalGoals != null ?
                                <a className="schedule__score" href={"/match/" + props.info.matchId}>
                                    <div className="schedule__score-main">
                                        {(props.info.team1TotalGoals || ' ') + " : " + (props.info.team2TotalGoals || ' ')}
                                    </div>
                                    <div className="schedule__score-additional"></div>
                                </a>
                                :
                                <p>&nbsp; Рахунку немає &nbsp;</p>
                        }
                        <a style = {{ paddingLeft: "20px"}} className="schedule__team-2" href={"/team/" + props.info.teamId2}>
                            <div className="schedule__team-logo schedule__team-logo--margin-right">
                                {/* Add team logo if needed */}
                            </div>
                            <span className="schedule__team-name schedule__team-name--left">
                                {props.info.teamName2}
                            </span>
                        </a>
                        <div>
                            <p>Груповий етап {props.info.groupStage !== null ? props.info.groupStage : "Поки не обрано"}</p>
                        </div>

                        <DontVisible element={
                            <div style={{paddingLeft: "20px"}}>
                                <input className='custom-button' type="button" value="Редагувати" onClick={ () => {
                                    navigate('/admin/update-match/' + props.info.matchId);
                                }}/>
                                <input className='custom-button' type="button" value="Видалити" onClick={ () => {
                                    deleteMatchById(props.info.matchId, localStorage.getItem("token"));
                                }}/>
                            </div>
                        } roles={[Roles.admin]}/>


                    </>
                }
            </li>
        </div>
    );
}

export default SheduleMatches;
