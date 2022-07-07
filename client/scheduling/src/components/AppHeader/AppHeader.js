import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './AppHeader.scss';
import { MdMenu, MdClose } from 'react-icons/md';
import AuthContext from '../../auth/auth-context';

const mainColor = '#3470E4';

const AppHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;

  const logoutHandler = () => {
    authContext.logout();
  };

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  const clickHandler = () => {
    setShowMenu(false);
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
      <nav onClick={clickHandler} className="navBar">
        <ul className={`navMenu ${showMenu ? 'navMenuOpen' : 'navMenuClosed'}`}>
          {authContext.role === 1 && (
            <li>
              <Link to="/upcoming">Upcoming Appointments</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <Link to="/">
            <li>Maintenence Request</li>
          </Link>
          {isLoggedIn && (
            <li>
              <Link to="/login" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;
