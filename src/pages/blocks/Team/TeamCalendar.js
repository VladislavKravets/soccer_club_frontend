import React, {useEffect, useState} from 'react';
import CustomSelect from "../../../components/Select/CustomSelect";
import ScheduleMatches from "../../../components/Team/SheduleMatches";
import {getMatchesFootballTeamById} from "../../../services/apiFootballTeam";

function TeamCalendar(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getMatchesFootballTeamById(props.id);
            setData(response);
            console.log(response)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className="content-navigation">
                <span className="section-title"><h2>Календар</h2></span>
                <CustomSelect options={['2023']} onHandle={() => {
                }}/>
            </div>

            <ul>
                {
                    data.map((match, index) => (
                        <ScheduleMatches info={match}/>
                    ))
                }
            </ul>
        </div>
    );
}

export default TeamCalendar;
