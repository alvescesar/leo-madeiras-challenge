import React from 'react';

function Header({ title }) {
  return (
    <header className="header">
      <img
        src="http://amigoleo.leomadeiras.com.br/static/media/amigoleo.b8f4e1ec.png"
        alt="logomarca Amigo Leo"
        className="header__logo-box"
      />
      <h1 className="header__text-box">{title}</h1>
    </header>
  );
}

export default Header;
