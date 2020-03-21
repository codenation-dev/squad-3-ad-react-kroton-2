import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy, useFilters } from 'react-table';
import { MdClose } from 'react-icons/md';

import Header from '../../components/Header';
import { Container, Modal } from './styles';

import api from '../../services/api';

const Dashboard = () => {
  const [errors, setErrors] = useState([]);
  const auth = useSelector(store => store.auth);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    (async function callApi() {
      const data = await api.get('/errors');
      console.log(data)
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

  const revealModal = text => {
    const modal = document.getElementById("modal");
    const textModal = document.getElementById("modalText");

    modal.style.display = 'block';
    textModal.textContent = text
  }

  const closeModal = () => {
    const modal = document.getElementById("modal")

    modal.style.display = "none";
  }

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
      <>
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
            {rows.map((row, _) => {
              prepareRow(row);
              return (
                <tr onClick={() => revealModal(row.values.log)} {...row.getRowProps()}>
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
      </>
    );
  }

  const columns = [
    {
      Header: 'Level',
      accessor: 'level',
    },
    {
      Header: 'Descrição do Erro',
      accessor: 'log',
    },
    {
      Header: 'Eventos',
      accessor: 'events',
    }
  ];

  return (
    <>
      <Header />
      <Container>
        <Table columns={columns} data={errors} />
        <Modal id="modal">
          <div>
            <p id="modalText" />
            <MdClose onClick={closeModal} size={20} color="#fff" />
          </div>
        </Modal>
      </Container>
    </>
  )
};

export default Dashboard;
