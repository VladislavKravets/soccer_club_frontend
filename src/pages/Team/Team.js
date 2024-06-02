import React, {useEffect, useState} from 'react';
import './Team.css';
import CustomSelect from '../../components/Select/CustomSelect';
import StatsInfoTeam from '../blocks/Team/StatsInfoTeam';
import TeamCalendar from '../blocks/Team/TeamCalendar';
import {useParams} from 'react-router-dom';
import {deleteTeam, getInfoFootballTeamById} from '../../services/apiFootballTeam';
import TeamComposition from "../blocks/Team/TeamComposition";
import {Roles} from "../../enum/Roles";

function Team(props) {
    const [flagLoaded, setFlagLoaded] = useState(false);

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [matches, setMatches] = useState([]);

    const contentByOption = {
        'Про команду': <StatsInfoTeam data={data} />,
        'Календар': <TeamCalendar id = {id}/>,
        // 'Статистика': <Statistic/>,
        'Склад': <TeamComposition data={data} id = {id}/>,
        // 'Новини': <Posts/>,
        // 'Фото': 'В розробці',
        // 'Відео': 'В розробці',
    };

    const adminOption = [
        'Вибрати дію',
        'Змінити інформацію про команду',
        'Видалити команду',
        'Додати гравця в команду',
        // 'Додати новину турніру',
        // 'Додати команди в турнір',
        // 'Додати матч для турніру',
        // '': '',
    ];

    /* admin */

    const handleSelectAdminOption = (option) => {
        switch (option) {
            case adminOption[1] : {
                window.location.href = '/admin/update-team/' + id;
            }
                break;
            case adminOption[2] : {
                // Вывести alert с вопросом и сохранить результат в переменную
                const userConfirmed = window.confirm('Ви впевнені, що хочете видалити турнір?');

                // Если пользователь подтвердил удаление, выполнить необходимые действия
                if (userConfirmed) {
                    handleDeleteTeam();
                }
            }
                break;
            case adminOption[3] : {
                window.location.href = '/admin/create-player/' + data.teamName;
            }
                break;
            case adminOption[4] : {
                // window.location.href = '/admin/create-news/' + tournamentInfo.tagName;
            }
                break;
            case adminOption[5] : {
                window.location.href = '/admin/tournament-form/' + id;
            }
                break;
            case adminOption[6] : {
                window.location.href = '/admin/create-match/' + id;
            }
                break;

        }
    };

    async function handleDeleteTeam() {
        try {
            // await deleteTournament(id,localStorage.getItem('token'));
            const response = await deleteTeam(id, localStorage.getItem('token'));
            if (response) {
                window.location.href = '/participants';
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    /* == */
    const [selectedOption, setSelectedOption] = useState(Object.keys(contentByOption)[0]);

    const selectOptions = Object.keys(contentByOption);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const { matchIds, ...restData } = await getInfoFootballTeamById(id);
            setData(restData);
            setMatches(matchIds || []);
            console.log(matchIds);
            setFlagLoaded(true);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    };

    // Функция для выбора первых пяти матчей
    const getFirstFiveMatches = () => {
        if (data.numberMathPlayed) {
            const result = [];
            let i = 0;
            while (result.length < 5 && i < matches.wonMatches.length) {
                if (matches.wonMatches[i] !== null) {
                    result.push(matches.wonMatches[i]);
                }
                if (matches.drawMatches[i] !== null) {
                    result.push(matches.drawMatches[i]);
                }
                if (matches.lostMatches[i] !== null) {
                    result.push(matches.lostMatches[i]);
                }
                i++;
            }
            return result;
        }
        return [];
    };

    const getMatchColor = (matchId) => {
        if (matches.wonMatches.includes(matchId)) {
            return 'green'; // выигранный матч - зеленый цвет
        } else if (matches.lostMatches.includes(matchId)) {
            return 'red'; // проигранный матч - красный цвет
        } else {
            return 'grey'; // ничейный матч - серый цвет
        }
    };

    const getWinInfo = (matchId) => {
        if (matches.wonMatches.includes(matchId)) {
            return 'В'; // выигранный матч - зеленый цвет
        } else if (matches.lostMatches.includes(matchId)) {
            return 'П'; // проигранный матч - красный цвет
        } else {
            return 'Н'; // ничейный матч - серый цвет
        }
    };


    return (
        <div>
            {!flagLoaded ?
                <h1>load</h1>
                :
                <div>
                    <div className="container name-page">
                        <h1>Команда</h1>
                        <div style={{display: "flex"}}>
                            <CustomSelect options={selectOptions} onSelectChange={handleSelectChange} />
                            {
                                JSON.parse(localStorage.getItem('userInfo'))?.roles.toString() === Roles.admin ?
                                    <CustomSelect options={adminOption} onSelectChange={handleSelectAdminOption}/>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="main">
                        <div className="container">
                            <div className="team-promo">
                                {data.photoUrl === null ? (
                                    <img src="/res/Spain_national_under-21_football_team_2011.jpg" alt="" />
                                ) : (
                                    <img src={data.photoUrl} alt="Назва команди" />
                                )}
                                <h1 style={{ fontSize: "150%" }}>{data.teamName}</h1>
                                <div className="team-promo-result">
                                    <p>Останні матчі</p>
                                    {getFirstFiveMatches()?.map((matchId, index) => (
                                        <a
                                            key={index}
                                            href={`/match/${matchId}`}
                                            style={{
                                                fontSize: '11px',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                width: '20px',
                                                height: '20px',
                                                lineHeight: '20px', // изменено на высоту элемента
                                                textAlign: 'center',
                                                color: 'white',
                                                textDecoration: 'none',
                                                marginRight: '5px',
                                                backgroundColor: getMatchColor(matchId), // определяем цвет
                                            }}
                                        >
                                            {getWinInfo(matchId)}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {selectedOption && contentByOption[selectedOption] && (
                                <div>{contentByOption[selectedOption]}</div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Team;
