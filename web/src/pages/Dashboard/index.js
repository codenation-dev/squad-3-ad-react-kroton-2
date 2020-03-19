import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';

import api from '../../services/api';

const Dashboard = () => {
  const [errors, setErrors] = useState([]);
  const auth = useSelector(store => store.auth);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    (async function callApi() {
      const data = await api.get('/errors');

      if (data) setErrors(data.data.data);
    })();
  }, [auth]);

  function Table({ columns, data }) {
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  const columns = [
    {
      Header: 'Level',
      accessor: 'level',
    },
    {
      Header: 'Log',
      accessor: 'log',
    },
    {
      Header: 'Eventos',
      accessor: 'events',
    },
  ];

  return <Table columns={columns} data={errors}></Table>;
};

export default Dashboard;
