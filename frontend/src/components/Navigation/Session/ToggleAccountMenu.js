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

          <div id="welcome-user" style={{textDecoration:"none", color:"black", fontWeight:"900"}}>
            Welcome, {sessionState.user.firstName}
          </div>

          {/* GUEST */}

          <div id="account-listings-button">
            <NavLink to='/trips' style={{textDecoration:"none", color:"black", fontWeight:"100"}}>
                Trips
            </NavLink>
          </div>

          <div id="account-reviews-button">
            <NavLink to='/reviews' style={{textDecoration:"none", color:"black", fontWeight:"100"}}>
                Reviews
            </NavLink>
          </div>

          <div id="line-break">
          </div>


          {/* HOST */}

          <div id="account-listings-button">
            <NavLink to='/spots' style={{textDecoration:"none", color:"black", fontWeight:"100"}}>
                Manage Listings
            </NavLink>
          </div>


          <div id="account-listings-button">
            <NavLink to='/reservations' style={{textDecoration:"none", color:"black", fontWeight:"100"}}>
                Manage Reservations
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


/******************************** EXPORTS ********************************/
export default ToggleAccountMenu;
