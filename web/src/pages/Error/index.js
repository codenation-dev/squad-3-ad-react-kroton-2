import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from './styles';

import api from '../../services/api';

const Error = function(props) {
  const [error, setError] = useState({});
  const auth = useSelector(store => store.auth);
  const { id } = useParams();

  const getError = async function() {
    debugger;
    const data = await api.get(`/errors/${id}`);
    debugger;
    if (data) setError(data.data);
  };

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    debugger;
    getError();
  }, [auth]);

  return (
    <Container>
      <Link to="/dashboard">
        <button className="back">Voltar</button>
      </Link>
      <div className="title">
        <h1>
          {error.level} em {error.dateCaptured}
        </h1>
      </div>
      <div className="content">
        <h2>Eventos: {error.events}</h2>
        <h4>Log:</h4>
        <p>{error.log}</p>
      </div>
    </Container>
  );
};

export default Error;
