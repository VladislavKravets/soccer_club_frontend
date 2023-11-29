import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './Table.css'; // Підключіть ваш файл стилів, якщо необхідно

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    return (
        <table {...getTableProps()} className="custom-table">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps(column.disableSortBy ? {} : column.getSortByToggleProps())}
                            title={column.title} // Додаємо атрибут title для відображення імені колонки
                        >
                            {column.render('Header')}
                            {column.disableSortBy ? null : (
                                <span className='sorted'>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '🔼🔽'}</span>
                            )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className="table-row">
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default Table;

