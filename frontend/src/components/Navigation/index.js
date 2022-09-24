import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import HostingButton from '../LoginFormModal/HostingButton';
import LoginFormModal from '../LoginFormModal';
import cranebnbLogo from "../../assets/branding/cranebnb-logo-3.png";
import './Navigation.css';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  }

  else {
    sessionLinks = (
      <>
        <LoginFormModal />
      </>
    );
  }

  return (
    <div className="nav-bar">

        <NavLink exact to="/">
          <img className="logo" src={cranebnbLogo}></img>
        </NavLink>

        <HostingButton />

        {isLoaded && sessionLinks}

    </div>
  );
}

export default Navigation;
