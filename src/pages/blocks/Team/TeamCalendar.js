import React from 'react';
import CustomSelect from "../../../components/Select/CustomSelect";
import ScheduleMatches from "../../../components/Team/SheduleMatches";

const matchInfo = {
    date: '03 КВІТ. 2021 / 11:20',
    team1_link: 'ссылка_на_команду_1',
    team2_link: 'ссылка_на_команду_2',
    match_link: 'ссылка_на_матч',
    nameTeam1: 'Kolo druziv',
    nameTeam2: 'ДЮСШ №2',
    score: '6:1',
    win: false,
};
function TeamCalendar(props) {
    return (
        <div>
            <div className="content-navigation">
                <span className="section-title"><h2>Календар</h2></span>
                <CustomSelect options={['2020']} onHandle={() => {
                }}/>
            </div>

            <ul>
                <ScheduleMatches info={matchInfo}/>
                <ScheduleMatches info={matchInfo}/>
                <ScheduleMatches info={matchInfo}/>

                <ScheduleMatches info={matchInfo}/>
                <ScheduleMatches info={matchInfo}/>
                <ScheduleMatches info={matchInfo}/>

                <ScheduleMatches info={matchInfo}/>
                <ScheduleMatches info={matchInfo}/>
                <ScheduleMatches info={matchInfo}/>
            </ul>
        </div>
    );
}

export default TeamCalendar;
