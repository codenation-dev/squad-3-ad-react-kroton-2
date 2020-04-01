import React, { useState } from 'react';
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

import { Button } from './../../styles';

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

  // Use the state and functions returned from useTable to build your UI
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

  function handleFilter(e) {
    setColumnFiltered(parseInt(e.target.value));
  }

  return (
    <>
      <div className="table-options">
        <div className="actions">
          <Button
            onClick={() => {
              handleClose(selectedFlatRows);
            }}
          >
            <FiArchive /> Arquivar
          </Button>
          <Button
            onClick={() => {
              handleDelete(Object.keys(selectedRowIds));
            }}
          >
            <FiDelete /> Apagar
          </Button>
        </div>

        <div className="filters">
          {headerGroups.map((headerGroup, index) => (
            <div className="table-head" key={index}>
              {headerGroup.headers[1].render('Filter')}

              <select className="select-combo" onChange={handleFilter}>
                {headerGroup.headers.slice(2).map((x, index) => (
                  <option value={index + 2}>{x.render('Header')}</option>
                ))}
              </select>

              {headerGroup.headers[columnFiltered].render('Filter')}
            </div>
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
                    <td {...cell.getCellProps()}>
                      <Link
                        to={`/error/${row.original.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        {cell.render('Cell')}
                      </Link>
                    </td>
                  );
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
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            min="1"
            max={`${pageOptions.length}`}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          className="select-combo"
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

export default Table;
