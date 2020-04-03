import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  usePagination,
} from 'react-table';

import {
  FiChevronRight,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronsLeft,
  FiArchive,
  FiDelete,
} from 'react-icons/fi';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <label className="customCheckBox">
          <input type="checkbox" ref={resolvedRef} {...rest} />
          <span className="checkmark"></span>
        </label>
      </>
    );
  }
);

function Table({ columns, data, handleDelete, handleClose }) {
  const [columnFiltered, setColumnFiltered] = useState(2);

  const getRowId = React.useCallback(row => {
    return row.id;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
    state: { selectedRowIds, pageIndex },
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
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  function handleFilter(e) {
    setColumnFiltered(parseInt(e.target.value));
  }

  return (
    <>
      <div className="table-options">
        {Object.keys(selectedRowIds).length > 0 && (
          <div className="actions">
            <h4>Ações</h4>

            <button
              onClick={() => {
                handleClose(selectedFlatRows);
              }}
            >
              <FiArchive /> Arquivar
            </button>
            <button
              onClick={() => {
                handleDelete(Object.keys(selectedRowIds));
              }}
            >
              <FiDelete /> Apagar
            </button>
          </div>
        )}

        <div className="filters">
          <h4>Filtros</h4>

          {headerGroups.map((headerGroup, index) => (
            <>
              {headerGroup.headers[4].render('Filter')}

              {headerGroup.headers[1].render('Filter')}

              <select className="select-combo" onChange={handleFilter}>
                {headerGroup.headers.slice(2).map((x, index) => (
                  <option value={index + 2}>{x.render('Header')}</option>
                ))}
              </select>

              {headerGroup.headers[columnFiltered].render('Filter', {
                placeHolder: 'Pesquise',
              })}
            </>
          ))}
        </div>
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
                  {column.id === 'ambient' ? '' : column.render('Header')}
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
                  if (cell.column.id === 'selection') {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>
                        <Link to={`/error/${row.original.id}`}>
                          {cell.column.id === 'ambient'
                            ? ''
                            : cell.render('Cell')}
                        </Link>
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <FiChevronsLeft />
        </button>
        <button
          className="pagination-button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FiChevronLeft />
        </button>
        <button
          className="pagination-button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FiChevronRight />
        </button>
        <button
          className="pagination-button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <FiChevronsRight />
        </button>

        <p>
          Página {pageIndex + 1} de {pageOptions.length}
        </p>
      </div>
    </>
  );
}

export default Table;
