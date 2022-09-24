import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import { Modal } from '../../context/Modal';

import './Navigation.css'
import menuBars from '../../assets/fontawesome/bars-solid.png'
import userIcon from '../../assets/fontawesome/circle-user-solid.png'


function ProfileButton({ user }) {

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='account-button' onClick={openMenu}>
        <img id='menu-icon' src={menuBars}></img>
        <img id='user-icon' src={userIcon}></img>
      </button>

      {showMenu && (
        <div className="account-dropdown-menu">
          <p>Manage Listings (change to NavLink = '/spots')</p>
          <p>Manage Reviews (change to NavLink = './reviews')</p>
          <button id="logout-button" onClick={logout}>Log out</button>
        </div>
      )}

    </>
  );
}

export default ProfileButton;
