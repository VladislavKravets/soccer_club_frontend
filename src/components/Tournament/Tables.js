import React, {useEffect, useMemo, useState} from 'react';
import Table from "../Table/Table";
import {getTournamentTableById} from "../../services/apiTournament"

function Tables(props) {
    const [tourTable, setTourTable] = useState([]);
    // console.log(data)
    const columnsTeam = useMemo(
        () => [
            {
                Header: '#',
                accessor: (_, index) => index + 1, // Виводимо порядковий номер (індекс + 1)
            },
            {
                Header: 'НК',
                accessor: 'teamName',
                title: 'Назва команди'
            },
            {
                Header: 'І',
                accessor: 'totalMatchesPlayed',
                title: 'Ігор'
            },
            {
                Header: 'В',
                accessor: 'wins',
                title: 'Виіграно'
            },
            {
                Header: 'Н',
                accessor: 'draws',
                title: 'Нічиїх'
            },
            {
                Header: 'П',
                accessor: 'losses',
                title: 'Програшів'
            },
            {
                Header: 'МЗ',
                accessor: 'goalsScored',
                title: 'М\'ячів забито'
            },
            {
                Header: 'МП',
                accessor: 'goalsConceded',
                title: 'М\'ячів пропущено'
            },
            {
                Header: 'О',
                accessor: 'points',
                title: 'Очок'
            },
            {
                Header: 'Останні 5 ігор',
                accessor: 'matchIds',
                disableSortBy: true, // Вимикаємо сортування для цієї колонки
                Cell: ({row}) => {
                    const {wonMatches, drawMatches, lostMatches} = row.original.matchIds;

                    const firstFiveWonMatches = wonMatches.slice(0, 5);
                    const firstFiveDrawMatches = drawMatches.slice(0, 5);
                    const firstFiveLostMatches = lostMatches.slice(0, 5);

                    const matches = [...firstFiveWonMatches, ...firstFiveDrawMatches, ...firstFiveLostMatches];
                    // console.log(matches)

                    const matchResults = matches.map((result, index) => {
                        if (result !== null) {
                            if (index < firstFiveWonMatches.length) {
                                return {
                                    label: 'В', // Виіграш
                                    color: 'green', // Колір фону
                                };
                            } else if (index < firstFiveWonMatches.length + firstFiveDrawMatches.length) {
                                return {
                                    label: 'Н', // Нічия
                                    color: 'gray', // Колір фону
                                };
                            } else {
                                return {
                                    label: 'П', // Програш
                                    color: 'red', // Колір фону
                                };
                            }
                        } else {
                            return {
                                label: 'null',
                                color: 'blue', // Колір фону для 'null'
                            };
                        }
                    });

                    return (
                        <div style={{display: "flex"}}>
                            {matchResults.map((result, index) => (
                                <>
                                    {
                                        result.label !== 'null' &&
                                        <a
                                            key={index}
                                            href={`/matches/${matches[index]}`}
                                            style={{
                                                backgroundColor: result.color,
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                width: '30px',
                                                height: '30px',
                                                lineHeight: '30px', // Вирівнюємо текст по центру
                                                textAlign: 'center',
                                                color: 'white', // Колір тексту
                                                textDecoration: 'none', // Видаляємо підкреслення для посилань
                                                marginRight: '5px',
                                            }}
                                        >
                                            {result.label}
                                        </a>

                                    }

                                </>
                            ))}
                        </div>
                    );
                    },
            }
        ],
        []
    );

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getTournamentTableById(props.id);
            setTourTable(response);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Table columns={columnsTeam} data={tourTable}/>
        </div>
    );
}

export default Tables;
