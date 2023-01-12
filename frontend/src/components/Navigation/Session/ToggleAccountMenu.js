/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { NavLink, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// local files
import MenuButton from "../MenuButton";
import * as sessionActions from '../../../store/sessionReducer';
import './ToggleAccountMenu.css'


/******************************* COMPONENT *******************************/
function ToggleAccountMenu({ user }) {

  /****************** access store *******************/
  const sessionState = useSelector(state => state.session)

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  /***************** handle events *******************/
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  let history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  /**************** render component *****************/
  return (
    <>
      <button className='menu-button' onClick={openMenu}>
        <MenuButton />
      </button>

      {showMenu && (
        <div className="account-dropdown-menu">

          <div className="welcome-user" id="emphasis-item">
            Welcome, {sessionState.user.firstName}
          </div>

          <div id="line-break"></div>

          {/* GUEST */}
          <NavLink exact to='/trips'>
            <button className="account-listings-button" id="emphasis-item">
                Trips
            </button>
          </NavLink>

          <NavLink exact to='/reviews'>
            <button className="account-listings-button" id="emphasis-item">
                Reviews
            </button>
          </NavLink>

          <div id="line-break"></div>

          {/* HOST */}

          <NavLink exact to='/spots'>
            <button className="account-listings-button">
              Manage Listings
            </button>
          </NavLink>

          <NavLink exact to='/reservations'>
            <button className="account-listings-button">
              Manage Reservations
            </button>
          </NavLink>

          <div id="line-break"></div>

          <div>
            <button className="account-listings-button" onClick={logout}>Log out</button>
          </div>

        </div>
      )}

    </>
  );
}


/******************************** EXPORTS ********************************/
export default ToggleAccountMenu;
