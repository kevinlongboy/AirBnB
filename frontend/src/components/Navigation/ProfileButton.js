import React, { useState, useEffect } from "react";
import { NavLink, Redirect, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from '../../store/session';
import { Modal } from '../../context/Modal';

import './Navigation.css'
import menuBars from '../../assets/fontawesome/bars-solid.png'
import userIcon from '../../assets/fontawesome/circle-user-solid.png'


function ProfileButton({ user }) {

  const sessionState = useSelector(state => state.session)

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button className='account-button' onClick={openMenu}>
        <img id='menu-icon' src={menuBars}></img>
        <img id='user-icon' src={userIcon}></img>
      </button>

      {showMenu && (
        <div className="account-dropdown-menu">

          <div id="welcome-user" style={{textDecoration:"none", color:"black", fontWeight:"900"}}>
            Welcome, {sessionState.user.firstName}
          </div>

          <div id="account-listings-button">
            <NavLink to='/spots' style={{textDecoration:"none", color:"black", fontWeight:"100"}}>
                Manage Listings
            </NavLink>
          </div>

          <div id="account-reviews-button">
            <NavLink to='/reviews' style={{textDecoration:"none", color:"black", fontWeight:"100"}}>
                Manage Reviews
            </NavLink>
          </div>

          <div id="line-break">
          </div>

          <div>
            <button id="account-logout-button" style={{textAlign:"left", fontWeight:"0", paddingTop:"7px"}} onClick={logout}>Log out</button>
          </div>

        </div>
      )}

    </>
  );
}

export default ProfileButton;
