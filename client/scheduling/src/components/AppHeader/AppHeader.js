import React, { useState } from 'react';
import './AppHeader.scss';
import { MdMenu, MdClose } from 'react-icons/md';

const mainColor = '#3470E4';

const AppHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="AppHeader">
      <div className="flex">
        <img src="images/auburn_solar_logo_sm.jpg" alt="Auburn Solar Logo" />
        <button onClick={showMenuHandler}>
          {showMenu ? (
            <MdClose size="3em" color={mainColor} />
          ) : (
            <MdMenu size="3em" color={mainColor} />
          )}
        </button>
      </div>
      <nav className="navBar">
        <ul className={`navMenu ${showMenu ? 'navMenuOpen' : 'navMenuClosed'}`}>
          <li>Home</li>
          <li>Maintenence Request</li>
          <li>Login</li>
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;
