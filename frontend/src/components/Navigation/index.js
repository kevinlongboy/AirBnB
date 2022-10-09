import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import HostingButton from './HostingButton';
import LoginFormModal from '../LoginFormModal/index.js';
import cranebnbLogo from "../../assets/branding/cranebnb-logo-3.png";
import './Navigation.css';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);
  let userId
  if (sessionUser) userId = sessionUser.id

  let sessionLinks;

  if (userId) { // prev: if (sessionUser)
    sessionLinks = (
      <div className="nav-bar-right">
        <HostingButton />
        <ProfileButton user={sessionUser} />
      </div>
    );
  }

  else {
    sessionLinks = (
      <div className="nav-bar-right">
        <LoginFormModal />
        </div>
    );
  }

  return (
    <div className="nav-bar">

        <NavLink exact to="/">
          <img className="nav-bar-left" id="crainbnb-logo" src={cranebnbLogo}></img>
        </NavLink>

        {isLoaded && sessionLinks}

    </div>
  );
}

export default Navigation;
