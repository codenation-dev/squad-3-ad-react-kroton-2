import React from 'react';

export default function Header() {
  const handleSignOut = function() {};

  return (
    <header className="navbar">
      <h1>Logger.io</h1>

      <p onClick={handleSignOut}>Sair</p>
    </header>
  );
}
