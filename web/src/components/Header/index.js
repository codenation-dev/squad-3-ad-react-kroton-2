import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const handleSignOut = function() {
    dispatch({
      type: '@auth/SIGN_OUT',
    });

    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Redirect to="/" />}

      <header className="navbar">
        <h1>Logger.io</h1>

        <p>
          Olá {auth.userName}, <span onClick={handleSignOut}>Sair</span>
        </p>
      </header>
    </>
  );
}
