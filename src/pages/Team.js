import React, {useState} from 'react';
import './Team.css';
import CustomSelect from "../components/Select/CustomSelect";
import StatsInfoTeam from "./blocks/Team/StatsInfoTeam";
import TeamCalendar from "./blocks/Team/TeamCalendar";
import Statistic from "./blocks/Team/Statistic";
import TeamComposition from "./blocks/Team/TeamComposition";
import Posts from "./blocks/Team/Posts";
import {useParams} from "react-router-dom";

const contentByOption = {
    'Про команду': <StatsInfoTeam/>,
    'Календар': <TeamCalendar/>,
    'Статистика': <Statistic/>,
    'Склад': <TeamComposition/>,
    'Новини': <Posts/>,
    'Фото': 'В розробці',
    'Відео': 'В розробці',
};

function Team(props) {
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState(Object.keys(contentByOption)[0]);
    const selectOptions = Object.keys(contentByOption);

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    };

    const items = Array.from({ length: 5 }, (_, index) => {
        const isWin = Math.random() < 0.5; // Генерация случайного значения между 0 и 1
        const className = isWin ? 'form-results-list-win' : 'form-results-list-loss';
        const winText = isWin ? 'В' : 'П';

        return (
            <li key={index} className={className}>
                <a href="#">{winText}</a>
            </li>
        );
    });

    return (
        <div>
            <div className="container name-page">
                <h1>Команда</h1>
                <div>
                    <CustomSelect options={selectOptions} onSelectChange={handleSelectChange} />
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <div className="team-promo">
                        <img src='/res/Spain_national_under-21_football_team_2011.jpg' alt=""/>
                        <h1>Name team</h1>
                        <div className="team-promo-result">
                            <p>Останні матчі</p>
                            <ul className='form-results-list'>
                                {items}
                            </ul>
                        </div>
                    </div>

                    {
                        selectedOption && contentByOption[selectedOption] && (
                            <div>{contentByOption[selectedOption]}</div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default Team;
