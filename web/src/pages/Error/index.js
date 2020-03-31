import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import api from '../../services/api';

const Error = function() {
  const [error, setError] = useState({});
  const auth = useSelector(store => store.auth);
  const { id } = useParams;

  const getError = async function() {
    const data = await api.get(`/errors/${id}`);
    debugger;
    debugger;
    console.log(data);
    if (data) setError(data.data);
  };

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    getError();
  }, [auth]);

  return <div>Oh hello there</div>;
};

export default Error;
