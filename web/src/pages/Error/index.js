import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import Header from '../../components/Header';

import api from '../../services/api';

const Error = function(props) {
  const [error, setError] = useState({});
  const auth = useSelector(store => store.auth);
  const { id } = useParams();

  useEffect(() => {
    document.title = 'Error | Logger.io';
  }, []);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    const getError = async function() {
      const data = await api.get(`/errors/${id}`);
      if (data) setError(data.data);
    };
    getError();
  }, [auth, id]);

  return (
    <>
      <Header />
      <div className="error-page">
        <Link className="back" to="/dashboard">
          Voltar
        </Link>
        <div className="title">
          <h1>
            {error.title} em{' '}
            {format(
              parseISO(error.dateCaptured ? error.dateCaptured : '2020-04-02'),
              'dd/MM/yyyy'
            )}
          </h1>
        </div>
        <div className="content">
          <div className="center">
            <h2>Eventos: {error.events}</h2>
            <hr></hr>
            <h4>Log:</h4>
            <p>{error.log}</p>
            <h4>Collected By:</h4>
            <p>{error.collectedBy}</p>
          </div>
          <aside>
            <h2>{error.level}</h2>
            {error.closed && <h3>Arquivado</h3>}
          </aside>
        </div>
      </div>
    </>
  );
};

export default Error;
