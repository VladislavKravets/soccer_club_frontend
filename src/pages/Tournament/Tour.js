import React, {useEffect, useState} from 'react';
import CustomSelect from "../../components/Select/CustomSelect";
import InfoTour from "../blocks/Tour/InfoTour";
import TourCalendar from "../blocks/Tour/TourCalendar";
import {useParams} from "react-router-dom";
import Tables from "../../components/Tournament/Tables";
import {Roles} from "../../enum/Roles";
import {
    deleteTournament,
    getTournament,
    getTournamentAllNews, getTournamentAllPhoto,
    getTournamentInfoById
} from "../../services/apiTournament";

function Tour(props) {
    const { id } = useParams();

    const [tournamentInfo, setTournamentInfo] = useState('');

    const contentByOption = {
        'Про турнір': <InfoTour id = {id}/>,
        'Календар': <TourCalendar id = {id}/>,
        'Таблиця та сітки': <Tables id = {id}/>,
        // 'Статистика': 'В розробці',
        'Команди': 'В розробці',
        // 'Новини': 'В розробці',
        // 'Фото': 'В розробці',
        // 'Відео': 'В розробці',
        // 'Документи': 'В розробці',
    };

    const adminOption = [
        'Вибрати дію',
        'Змінити турнір',
        'Видалити турнір',
        'Додати фотографію турніру',
        'Додати новину турніру',
        'Додати команди в турнір',
        'Додати матч для турніру',
        // '': '',
    ];

    useEffect(() => {
        handleGetTournamentInfo();
    }, []);

    const [selectedOption, setSelectedOption] = useState(Object.keys(contentByOption)[0]);
    const selectOptions = Object.keys(contentByOption);
    // const selectAdminOption = Object.keys(adminOption);

    const handleSelectTournamentPage = (option) => {
        setSelectedOption(option);
    };

    const handleSelectAdminOption = (option) => {
        switch (option) {
            case adminOption[1] : {
                window.location.href = '/admin/update-tournament/' + id;
            }break;
            case adminOption[2] : {
                // Вывести alert с вопросом и сохранить результат в переменную
                const userConfirmed = window.confirm('Ви впевнені, що хочете видалити турнір?');

                // Если пользователь подтвердил удаление, выполнить необходимые действия
                if (userConfirmed) {
                    handleDeleteTournament();
                }
            }break;
            case adminOption[3] : {
                window.location.href = '/admin/photo-upload/' + tournamentInfo.tagName;
            }break;
            case adminOption[4] : {
                window.location.href = '/admin/create-news/' + tournamentInfo.tagName;
            }break;
            case adminOption[5] : {
                window.location.href = '/admin/tournament-form/' + id;
            }break;
            case adminOption[6] : {
                window.location.href = '/admin/create-match/' + id;
            }break;

        }
    };

    async function handleDeleteTournament() {
        try {
            // await deleteTournament(id,localStorage.getItem('token'));
            const response = await deleteTournament(id,localStorage.getItem('token'));
            if (response) {
                window.location.href = '/tournament';
            }else {
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    const handleGetTournamentInfo = async () => {
        try {
            // await deleteTournament(id,localStorage.getItem('token'));
            const response = await getTournamentInfoById(id);
            if (response.message) {
                console.log(response.message);
                window.location.href = '/tournament';
            }else {
                console.log(response);
                setTournamentInfo(response);
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
                </div>
                <div style={{display: "flex"}}>
                    <CustomSelect options={selectOptions} onSelectChange={handleSelectTournamentPage}/>
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

export default Tour;
