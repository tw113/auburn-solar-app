import React from 'react';
import './AppHeader.scss';

import AppMenu from '../AppMenu/AppMenu'
import { MdMenu } from 'react-icons/md'

const mainColor = '#3470E4'

let showMenu = false;

const AppHeader = () => (
  <div className="AppHeader">
    <div className="flex">
      <img src="images/auburn_solar_logo_sm.jpg" alt="Auburn Solar Logo"/>
      <div><MdMenu onClick={toggleShowMenu()} size="2.5em" color={mainColor}/></div>
    </div>
    <AppMenu showMenu={showMenu}></AppMenu>
  </div>
);

const toggleShowMenu = () => {
  showMenu = !showMenu;
}


export default AppHeader;