import React, {useEffect, useState} from 'react';
import "./match.css"
import {getMatchById} from "../../services/apiMatches";
import {getTournamentInfoById} from "../../services/apiTournament";
import {useParams} from "react-router-dom";
import {translateDayOfWeek} from "../../functions/translateDayOfWeek";

function Match(props) {
    const {id} = useParams();
    const [tournamentInfo, setTournamentInfo] = useState('');
    const [matchInfo, setMatchInfo] = useState('');

    useEffect(() => {
        handleGetMatch(id)
    }, []);

    const dayOfWeekTranslations = {
        Monday: 'Понеділок',
        Tuesday: 'Вівторок',
        Wednesday: 'Середа',
        Thursday: 'Четвер',
        Friday: 'Пʼятниця',
        Saturday: 'Субота',
        Sunday: 'Неділя',
    };

    const handleGetTournamentInfo = async (tournamentId) => {
        try {
            // await deleteTournament(id,localStorage.getItem('token'));
            const response = await getTournamentInfoById(tournamentId);
            if (response.message) {
                console.log(response.message);
            } else {
                console.log(response);
                setTournamentInfo(response);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleGetMatch = async (id) => {
        try {
            // await deleteTournament(id,localStorage.getItem('token'));
            const response = await getMatchById(id);
            if (response.message) {
                console.log(response.message);
            } else {
                console.log(response);
                setMatchInfo(response);
                await handleGetTournamentInfo(response.tournamentId)
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className="container name-page">
                <div>
                    <h1>Турнір {tournamentInfo.tournamentName}</h1>
                    <div style={{display: "flex", fontSize: "12px", color: "gray", padding: "10px 0"}}>
                        <p style={{marginRight: "10px"}}>{tournamentInfo.startDate + " - " + tournamentInfo.endDate}</p>
                        <p style={{marginRight: "10px"}}>{tournamentInfo.countTeam + " команд"}</p>
                        <p style={{marginRight: "10px"}}>{tournamentInfo.status}</p>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <div className="match">
                        <div className="match-image-container">
                            <img src="/res/football_game_mobile_cover_cover.jpg" width="480" height="270" alt=""/>
                            <div className="match-overlay"></div>
                            <div className="match-text">
                                <div className="match-date">
                                    <p>{matchInfo.matchDate}</p>
                                    <p>{matchInfo.matchTime}</p>
                                    <p>{translateDayOfWeek(matchInfo.matchDay)}</p>
                                </div>

                                <div style={{
                                    display: "flex",
                                    marginTop: "50px",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    marginBottom: "50px"
                                }}>
                                    <a href={"/participants/team/" + matchInfo.team1Id}>
                                        <div style={{display: "flex", textAlign: "right", fontSize: "14px", border: "2px solid white", borderRadius: "10px", padding: "20px 30px"}}>
                                            <h3 style={{marginRight: "20px"}}>{matchInfo.team1Name}</h3>
                                            <img style={{width: "100px", height: "100px", borderRadius: "50px"}}
                                                 src={matchInfo.photoTeam1 ? "/res/Spain_national_under-21_football_team_2011.jpg" : matchInfo.photoTeam1}
                                                 alt=""/>
                                        </div>
                                    </a>

                                    <h3 style={{marginLeft: "30px", width: "200px", fontSize: "20px"}}>
                                        {matchInfo.score}
                                    </h3>

                                    <a href={"/participants/team/" + matchInfo.team2Id}>
                                        <div style={{display: "flex", textAlign: "right", fontSize: "14px", border: "2px solid white", borderRadius: "10px", padding: "20px 30px"}}>
                                            <h3 style={{marginRight: "20px"}}>{matchInfo.team2Name}</h3>
                                            <img style={{width: "100px", height: "100px", borderRadius: "50px"}}
                                                 src={matchInfo.photoTeam2 ? "/res/Spain_national_under-21_football_team_2011.jpg" : matchInfo.photoTeam2}
                                                 alt=""/>
                                        </div>
                                    </a>
                                </div>

                                {/*<h4>{matchInfo.tournamentName}</h4>*/}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Match;
