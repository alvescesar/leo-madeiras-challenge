import React from 'react';

import LeoLogo from '../assets/leo-logo.png';

function Header({ title }) {
  return (
    <header className="header">
      <img src={LeoLogo} alt="logomarca Leo Madeiras" className="header__logo-box" />
      <h1 className="header__text-box">{title}</h1>
    </header>
  );
}

export default Header;
