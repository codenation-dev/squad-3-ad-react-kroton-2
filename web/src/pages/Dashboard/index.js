import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy, useFilters } from 'react-table';

import styled from 'styled-components'

import api from '../../services/api';

const Styles = styled.div`
  padding: 1rem;
  display: flex;
  justify-content:center;
  align-items:center;
  

  table {
    border-spacing: 0;
    width: 80%;

    thead{
      background-color: #ed2e38;
      color: white;
    }

    tbody{
      background-color: #fff;
    }

    tr {
      :nth-child(even) {background-color: #f2f2f2;}
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
  }
`


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

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        onClick={e => {
          e.stopPropagation();
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )


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
        defaultColumn
      },
      useFilters,
      useSortBy
    );

    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}{} <div>{column.canFilter ? column.render('Filter') : null}</div>
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

  return <Styles><Table columns={columns} data={errors}></Table></Styles>;
};

export default Dashboard;
