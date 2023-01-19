/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// local files
import './Navigation.css';
import ProfileButton from './Session/ToggleAccountMenu';
import HostingButton from './HostingButton';
import LoginOrSignUpModal from './NoSession/LoginOrSignUpModal/index';
import cranebnbLogo from "../../assets/branding/cranebnb-logo-3.png";
import cranebnbLogoOnly from "../../assets/branding/cranebnb-logo-only/cranebnb-logo-only-3.png";
import SearchBar from '../Search/SearchBar';


/******************************* COMPONENT *******************************/
function Navigation({ isLoaded }){

  /****************** access store *******************/
  const sessionUser = useSelector(state => state.session.user);
  console.log("isLoaded", isLoaded)

  /************ key into pertinent values ************/
  let userId
  if (sessionUser) userId = sessionUser.id
  console.log("userId", userId)

  /****************** manage state *******************/
  const [desktop, setDesktop] = useState(true);

  const resize = () => {
    if (window.innerWidth > 1100) {
      setDesktop(true)
    } else {
      setDesktop(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
  })

  /************* conditional components **************/
  let sessionLinks;
  if (userId) { // prev: if (sessionUser)
    sessionLinks = (
      <>
        <HostingButton />
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
        <LoginOrSignUpModal />
    );
  }

  /**************** render component *****************/
  return (
    <div className="nav-bar">

      <div className="nav-bar-left-container">
        <NavLink exact to="/">
          <img
            className="nav-bar-left"
            id={desktop === true ? "cranebnbLogoText" : "cranebnbLogoOnly"}
            src={desktop === true ? cranebnbLogo : cranebnbLogoOnly }
            alt="CraneBnB Logo"
          >
          </img>
        </NavLink>
      </div>

      <div className="nav-bar-middle-container">
        <SearchBar />
      </div>

      <div className="nav-bar-right-container">
        {isLoaded && sessionLinks}
      </div>

    </div>
  );
}


/******************************** EXPORTS ********************************/
export default Navigation;
