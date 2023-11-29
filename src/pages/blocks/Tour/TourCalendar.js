import React, {useEffect, useState} from 'react';
import ScheduleMatches from "../../../components/Tournament/SheduleMatches";
import {getMatchByTourId} from "../../../services/apiMatches";

function TourCalendar(props) {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getMatchByTourId(props.id);
            setMatches(response);
            console.log(response)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    // Групуємо матчі за датами
    const groupedMatches = matches.reduce((result, match) => {
        const matchDate = match.matchDate; // Припускається, що в полі matchDate знаходиться дата матчу

        // Форматуємо дату за необхідним форматом (20 березня 2021, Субота)
        const formattedDate = new Date(matchDate).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });

        // Якщо дата ще не є ключем у result, створюємо новий ключ
        if (!result[formattedDate]) {
            result[formattedDate] = [];
        }

        // Додаємо поточний матч до відповідної дати
        result[formattedDate].push(match);

        return result;
    }, {});
    return (
        <div>
            <div>
                {
                    matches.length > 0 ?
                        <>
                            <h3>По датах</h3>
                            {
                                Object.entries(groupedMatches).map(([date, matches]) => (
                                    <div key={date}>
                                        <ScheduleMatches date={date}/>
                                        {matches.map(match => (
                                            <ScheduleMatches key={match.matchId} info={match}/>
                                        ))}
                                    </div>))
                            }
                        </>
                        :
                        <h1>Поки матчів не має</h1>
                }
            </div>
        </div>
    );
}

export default TourCalendar;
