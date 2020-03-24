import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useSortBy, useFilters, useRowSelect } from 'react-table';
import { MdClose } from 'react-icons/md';

import Header from '../../components/Header';
import { Container, Modal, Button } from './styles';

import api from '../../services/api';

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef()
//     const resolvedRef = ref || defaultRef

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate
//     }, [resolvedRef, indeterminate])

//     // const handleCheck = function (e) {
//     //   e.stopPropagation();
//     //   debugger;
//     // }

//     return (
//       <>
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     )
//   }
// )

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



// function Table({ columns, data }) {
// const [selectedRows, setSelectedRows] = useState([]);
// debugger;

// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter },
// }) {
//   const count = preFilteredRows.length

//   return (
//     <input
//       value={filterValue || ''}
//       onChange={e => {
//         setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
//       }}
//       onClick={e => {
//         e.stopPropagation();
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   )
// }

// const defaultColumn = React.useMemo(
//   () => ({
//     // Let's set up our default Filter UI
//     Filter: DefaultColumnFilter,
//   }),
//   []
// )

// const revealModal = text => {
//   const modal = document.getElementById("modal");
//   const textModal = document.getElementById("modalText");

//   modal.style.display = 'block';
//   textModal.textContent = text
// }

// const handleCheck = function (row) {
//   debugger;
//   console.log(selectedRowIds);
//   console.log(row);
// }

// const handleDelete = function () {
//   console.log(selectedRows);
// }

function Table({ columns, data, handleDelete }) {
  const getRowId = React.useCallback(row => {
    return row.id;
  }, []);

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
      getRowId
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
              <IndeterminateCheckbox onClick={(e) => { e.stopPropagation(); }} {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  console.log(Object.keys(selectedRowIds));
  return (
    <>
      <div>
        <Button>Arquivar</Button>
        <Button onClick={() => { handleDelete(Object.keys(selectedRowIds)) }}> Apagar</Button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th >
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
              <tr  {...row.getRowProps()}>
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
};

const Dashboard = () => {
  const [errors, setErrors] = useState([]);
  const auth = useSelector(store => store.auth);

  const getErrors = async function () {
    const data = await api.get('/errors');
    console.log(data)
    if (data) setErrors(data.data.data);
  }

  const deleteError = async function (row) {
    debugger;
    const data = await api.delete(`/errors/${row}`);
  }

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    getErrors();
  }, [auth]);

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

  const closeModal = () => {
    const modal = document.getElementById("modal")

    modal.style.display = "none";
  }

  const handleDelete = async function (RowsIds) {
    debugger;
    let promises = RowsIds.map(row => { deleteError(row); });
    Promise.all(promises)
      .then(getErrors())
  }

  return (
    <>
      <Header />
      <Container>
        <Table getId columns={columns} data={errors} handleDelete={handleDelete} />
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
