import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

const Error = function(props) {
  const [error, setError] = useState({});
  const auth = useSelector(store => store.auth);
  const { id } = useParams();

  const getError = async function() {
    const data = await api.get(`/errors/${id}`);
    if (data) setError(data.data);
  };

  useEffect(() => {
    document.title = 'Error | Logger.io';
  }, []);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    getError();
  }, [auth]);
  return (
    <div className="error-page">
      <Link to="/dashboard">
        <button className="back">Voltar</button>
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
        </div>
        <aside>
          <h2>{error.level}</h2>
          <p>Collected By:</p>
          <p>{error.collectedBy}</p>
        </aside>
      </div>
    </div>
  );
};

export default Error;
