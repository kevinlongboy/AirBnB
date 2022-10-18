/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { NavLink, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// local files
import * as sessionActions from '../../../store/sessionReducer';
import '../../Navigation/Navigation.css'
import menuBars from '../../../assets/fontawesome/bars-solid.png'
import userIcon from '../../../assets/fontawesome/circle-user-solid.png'
import MenuButton from "../MenuButton";


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
      <button className='account-button' onClick={openMenu}>
        <MenuButton />
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


/******************************** EXPORTS ********************************/
export default ToggleAccountMenu;
