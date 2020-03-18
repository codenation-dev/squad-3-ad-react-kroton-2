import React, { useState, useEffect } from 'react';
// import { useTable, useGlobalFilter } from 'react-table';

import api from '../../services/api';

const Dashboard = () => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    (async function callApi() {
      const data = await api.get('/errors');
      //      console.log(data.data.data);
      if (data) setErrors(data.data.data);
    })();
  }, []);

  return errors.map(er => <h1 key={er.id}>{er.log}</h1>);
};

export default Dashboard;
