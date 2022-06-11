import React from 'react';
import './AppMenu.scss';

const AppMenu = (props) => (
  <div className="AppMenu">
    <ul className={`navMenu ${props.showMenu ? "showMenu" : ""}`}>
      <li>Home</li>
      <li>Maintenence Request</li>
      <li>Login</li>
    </ul>
  </div>
);

export default AppMenu;
