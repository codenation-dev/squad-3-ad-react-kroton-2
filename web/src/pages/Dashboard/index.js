import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  usePagination,
} from 'react-table';
import { MdClose } from 'react-icons/md';

import Header from '../../components/Header';
import { Container, Modal, Button } from './styles';

import api from '../../services/api';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

// function Table({ columns, data }) {
// const [selectedRows, setSelectedRows] = useState([]);
// debugger;

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

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      onClick={e => {
        e.stopPropagation();
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Table({ columns, data, handleDelete, handleClose }) {
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
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { selectedRowIds, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      getRowId,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    usePagination,
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
              <IndeterminateCheckbox
                onClick={e => {
                  e.stopPropagation();
                }}
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  return (
    <>
      <div {...getTableProps()}>
        {headerGroups.map((headerGroup, index) => (
          <div key={index}>
            <div>
              <div>{headerGroup.headers[1].render('Filter')}</div>
            </div>
            <div>
              <div>{headerGroup.headers[2].render('Filter')}</div>
            </div>
            <div>
              <div>{headerGroup.headers[3].render('Filter')}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button
          onClick={() => {
            handleClose(selectedFlatRows);
          }}
        >
          Arquivar
        </Button>
        <Button
          onClick={() => {
            handleDelete(Object.keys(selectedRowIds));
          }}
        >
          {' '}
          Apagar
        </Button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, _) => {
            prepareRow(row);
            return (
              <tr
                className={row.original.closed ? 'closedRow' : ''}
                {...row.getRowProps()}
              >
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
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const Dashboard = () => {
  const [errors, setErrors] = useState([]);
  const auth = useSelector(store => store.auth);

  const getErrors = async function() {
    const data = await api.get('/errors');
    debugger;
    console.log(data);
    if (data) setErrors(data.data);
  };

  const deleteError = async function(RowsIds) {
    return Promise.all(
      RowsIds.map(async row => {
        await api.delete(`/errors/${row}`);
      })
    );
  };

  const toggleCloseError = async function(Rows) {
    return Promise.all(
      Rows.map(async data => {
        const newData = data.original;
        newData.closed = !newData.closed;
        debugger;
        await api.put(`/errors/${data.original.id}`, newData);
      })
    );
  };

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    getErrors();
  }, [auth]);

  const columns = [
    {
      Header: 'Level',
      accessor: 'level',
      Filter: SelectColumnFilter,
    },
    {
      Header: 'Descrição do Erro',
      accessor: 'log',
      Filter: DefaultColumnFilter,
    },
    {
      Header: 'Eventos',
      accessor: 'events',
      Filter: DefaultColumnFilter,
    },
  ];

  const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  };

  const handleDelete = async function(RowsIds) {
    const response = await deleteError(RowsIds);
    getErrors();
  };

  const handleClose = async function(Rows) {
    const response = await toggleCloseError(Rows);
    getErrors();
  };

  return (
    <>
      <Header />
      <Container>
        <Table
          getId
          columns={columns}
          data={errors}
          handleDelete={handleDelete}
          handleClose={handleClose}
        />
        <Modal id="modal">
          <div>
            <p id="modalText" />
            <MdClose onClick={closeModal} size={20} color="#fff" />
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
