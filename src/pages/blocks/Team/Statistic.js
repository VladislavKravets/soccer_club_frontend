import React, {useMemo} from 'react';
import CustomSelect from "../../../components/Select/CustomSelect";
import Table from "../../../components/Table/Table";

const data = [
    {
        id: 1,
        season: '2022-2023',
        games: 20,
        wins: 15,
        loss: 5,
        goalsScored: 45,
        goalsConceded: 20,
        yellowCard: 30,
        redCard: 2,
    },
    {
        id: 2,
        season: '2021-2022',
        games: 22,
        wins: 18,
        loss: 4,
        goalsScored: 55,
        goalsConceded: 15,
        yellowCard: 28,
        redCard: 1,
    },
    {
        id: 3,
        season: '2020-2021',
        games: 18,
        wins: 12,
        loss: 6,
        goalsScored: 40,
        goalsConceded: 25,
        yellowCard: 35,
        redCard: 3,
    },
    // Додайте інші записи за необхідності
];


function Statistic(props) {

    const columnsStatistic = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'id',
            },
            {
                Header: 'Сезон',
                accessor: 'season',
            },
            {
                Header: 'Ігор',
                accessor: 'games',
            },
            {
                Header: 'Виграно',
                accessor: 'wins',
            },
            {
                Header: 'Програші',
                accessor: 'loss',
            },
            {
                Header: 'Мячів забито',
                accessor: 'goalsScored',
            },
            {
                Header: 'Мячів пропущено',
                accessor: 'goalsConceded',
            },
            {
                Header: 'Жовтих карток',
                accessor: 'yellowCard',
            },
            {
                Header: 'Червоних карток',
                accessor: 'redCard',
            },
        ],
        []
    );

    return (
        <div>
            <div className="content-navigation">
                <span className="section-title"><h2>Статистика</h2></span>
                <CustomSelect options={['2020']} onHandle={() => {
                }}/>
            </div>
                <Table columns={columnsStatistic} data={data}/>
        </div>
    );
}

export default Statistic;
