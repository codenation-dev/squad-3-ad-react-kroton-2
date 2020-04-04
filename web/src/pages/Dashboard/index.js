import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Table from '../../components/Table';
import api from '../../services/api';

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      className="default-filter"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      onClick={e => {
        e.stopPropagation();
      }}
      placeholder={`Procure em ${count} registros...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      className="select-combo"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Todos</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

const Dashboard = () => {
  const [errors, setErrors] = useState([]);
  const auth = useSelector(store => store.auth);

  const getErrors = async function() {
    const data = await api.get('/errors');
    if (data) setErrors(data.data);
  };

  useEffect(() => {
    document.title = 'Dashboard | Logger.io';
  }, []);

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
    {
      Header: 'Ambient',
      accessor: 'ambient',
      Filter: SelectColumnFilter,
    },
  ];

  const handleDelete = async function(RowsIds) {
    Promise.all(
      RowsIds.map(async row => {
        await api.delete(`/errors/${row}`);
      })
    );

    const updatedErrors = errors.filter(data => {
      const error = RowsIds.find(el => parseInt(el) === data.id);

      return error ? false : true;
    });

    setErrors(updatedErrors);
  };

  const handleClose = async function(Rows) {
    Promise.all(
      Rows.map(async data => {
        const newData = data.original;
        newData.closed = !newData.closed;
        await api.put(`/errors/${data.original.id}`, newData);
      })
    );

    const updatedErrors = errors.map(data => {
      const error = Rows.find(el => el.original.id === data.id);

      if (error) {
        return {
          ...data,
          closed: data.closed,
        };
      } else {
        return data;
      }
    });

    setErrors(updatedErrors);
  };

  return (
    <>
      <Header />

      <main className="tablePage">
        <Table
          getId
          columns={columns}
          data={errors}
          handleDelete={handleDelete}
          handleClose={handleClose}
        />
      </main>
    </>
  );
};

export default Dashboard;
