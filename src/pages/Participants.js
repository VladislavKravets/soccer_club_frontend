import React, {useEffect, useMemo, useState} from 'react';
import CustomSelect from "../components/Select/CustomSelect";
import './Participants.css';
import Table from "../components/Table/Table";
import TeamCard from "../components/Team/TeamCard";
import {getFootballTeam} from '../services/apiFootballTeam';
import {getPlayers, getPlayerStats} from '../services/apiPlayer';
import {Roles} from "../enum/Roles";

function Participants(props) {
    const columnsPlayer = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'playerId',
            },
            {
                Header: 'Гравець',
                accessor: 'playerName',
            },
            {
                Header: 'Ігор',
                accessor: 'totalMatchesPlayed',
            },
            {
                Header: 'Голів(пенальті)',
                accessor: 'goals',
            },
            {
                Header: 'Ср.',
                accessor: 'averageGoalsPerGame',
            },
            {
                Header: 'Жк.',
                accessor: 'yellowCards',
            },
            {
                Header: 'Чк.',
                accessor: 'redCards',
            },
        ],
        []
    );

    const columnsRefer = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'id',
            },
            {
                Header: 'Суддя',
                accessor: 'playerName',
            },
            {
                Header: 'Головний',
                accessor: 'chief',
            },
            {
                Header: '2 Асистент',
                accessor: 'assistant',
            },
            {
                Header: 'Резервний',
                accessor: 'reserve',
            },
        ],
        []
    );

    const ITEMS_PER_PAGE = 10; // Number of items to display per page

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedParticipant, setSelectedParticipant] = useState('Команди');
    const [selectedYear, setSelectedYear] = useState('');
    // const [columns, setColumns] = useState(columnsPlayer);
    const [data, setData] = useState();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectYear = (option) => {
        setSelectedYear(option);
        console.log(option)
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        fetchInitialData(selectedParticipant);
    }, []);

    const fetchInitialData = async (participantType) => {
        try {
            let response;
            if (participantType === 'Гравці') {
                response = await getPlayerStats(); // Загрузить данные для гравцев с сервера
            } else if (participantType === 'Судді') {
                // response = await fetchRefereeData(); // Загрузить данные для судей с сервера
            } else if (participantType === 'Команди') {
                response = await getFootballTeam(); // Загрузить данные для команд с сервера
            }
            setData(response);
            console.log(response);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleSelectParticipant = (option) => {
        setSelectedParticipant(option);
        if (option === 'Гравці') {
            // setColumns(columnsPlayer);
            fetchInitialData('Гравці'); // Загрузить данные для гравцев
        } else if (option === 'Судді') {
            // setColumns(columnsRefer);
            fetchInitialData('Судді'); // Загрузить данные для судей
        } else if (option === 'Команди') {
            // setColumns([]); // Очистить колонки, так как они не нужны для команд
            fetchInitialData('Команди'); // Загрузить данные для команд
        }
        console.log(option);
    };

    const filteredData = useMemo(() => {
        if (!searchQuery) {
            return data; // Return original data if searchQuery is empty
        }

        // Filter data based on searchQuery for players, referees, or teams
        return data.filter(item => {
            if (selectedParticipant === 'Гравці' && item.playerName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return true; // Filter players by playerName
            } else if (selectedParticipant === 'Судді' && item.playerName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return true; // Filter referees by playerName
            } else if (selectedParticipant === 'Команди' && item.teamName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return true; // Filter teams by teamName
            }
            return false; // No match found
        });
    }, [data, searchQuery, selectedParticipant]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Ensure filteredData is defined and is an array or default to an empty array if undefined
    const paginatedData = Array.isArray(filteredData) ? filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

    // Calculate the total number of pages
    const totalPages = Array.isArray(filteredData) ? Math.ceil(filteredData.length / ITEMS_PER_PAGE) : 1;


    return (
        <div>
            <div className="container name-page">
                <h1>Учасники</h1>
                <div className='participants'>
                    <CustomSelect options={['Команди',
                        'Гравці',
                        // 'Судді'
                    ]} onSelectChange={handleSelectParticipant}/>
                    {/*<CustomSelect options={['2020', '2021']} onSelectChange={handleSelectYear}/>*/}
                    {
                        JSON.parse(localStorage.getItem('userInfo'))?.roles.toString() === Roles.admin &&
                        <input className="custom-button" type="button" value="Додати команду" onClick={() => {
                            window.location.href = '/create-team';
                        }}/>
                    }
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <div className="find-param">
                        <input
                            placeholder={selectedParticipant === 'Команди' ? 'Знайти за назвою' : 'Знайти за прізвищем'}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        {/*<input type="submit" value='Пошук' onClick={handleSearchSubmit} />*/}
                    </div>
                    {data ?
                        <>
                            {selectedParticipant === 'Гравці' && (
                                <Table columns={columnsPlayer}
                                       data={paginatedData.map((player, index) => ({...player, playerId: index + 1}))}/>
                            )}

                            {selectedParticipant === 'Судді' && (
                                <Table columns={columnsRefer} data={paginatedData}/>
                            )}

                            {selectedParticipant === 'Команди' && (
                                <div className="teams grid-container-3">
                                    {paginatedData && paginatedData.map(post => (
                                        <li style={{listStyleType: 'none'}} key={post.teamId}>
                                            <a href={`/participants/team/${post.teamId}`}>
                                                <TeamCard img={post.pathUrl} nameTeam={post.teamName}/>
                                            </a>
                                        </li>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 &&
                                <div className="pagination grid-container-10">
                                    {Array.from({length: totalPages}, (_, index) => index + 1).map((pageNumber) => (
                                        <button key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                                    ))}
                                </div>
                            }
                        </>
                        :
                        <h1>loading</h1>}
                </div>
            </div>
        </div>
    );
}

export default Participants;
