import React, {useEffect, useState} from 'react';
import './Tournament.css'
import CardTour from "../../components/Tournament/CardTour";
import {getTournament} from '../../services/apiTournament';
import CustomSelect from "../../components/Select/CustomSelect";
import {Roles} from "../../enum/Roles";

function Tournament(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getTournament();
            setData(response);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="container name-page">
                <h1>Всі турніри </h1>
                <div style={{display: "flex"}}>
                    <CustomSelect options={['2020', '2021']}/>
                    {
                        JSON.parse(localStorage.getItem('userInfo'))?.roles.toString() === Roles.admin &&
                        <input className="custom-button" type="button" value="Додати турнір" onClick={() => {
                            window.location.href = '/admin/create-tournament';
                        }}/>
                    }
                </div>
            </div>
            <div className="main">
                <div className="container grid-container-3">
                    {data ? data.map(tour => (
                            <li key={tour.id}>
                                <a href={`/tournament/${tour.tournamentId}`}>
                                    <CardTour tournamentInfo={tour}/>
                                </a>
                            </li>
                        ))
                        :
                        <h1>Loading</h1>
                    }
                </div>
            </div>
        </>
    );
}

export default Tournament;
