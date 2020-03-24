import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useSortBy, useFilters, useRowSelect } from 'react-table';
import { MdClose } from 'react-icons/md';

import Header from '../../components/Header';
import { Container, Modal, Button } from './styles';

import api from '../../services/api';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  console.log(selectedRowIds);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
}

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

  // const revealModal = text => {
  //   const modal = document.getElementById("modal");
  //   const textModal = document.getElementById("modalText");

  //   modal.style.display = 'block';
  //   textModal.textContent = text
  // }

  // const closeModal = () => {
  //   const modal = document.getElementById("modal")

  //   modal.style.display = "none";
  // }  

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
            <MdClose size={20} color="#fff" />
          </div>
        </Modal>
      </Container>
    </>
  )
};

export default Dashboard;