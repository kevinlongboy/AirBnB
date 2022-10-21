/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// local files
import ProfileButton from './Session/ToggleAccountMenu';
import HostingButton from './HostingButton';
import LoginOrSignUpModal from './NoSession/LoginOrSignUpModal/index';
import cranebnbLogo from "../../assets/branding/cranebnb-logo-3.png";
import cranebnbLogoOnly from "../../assets/branding/cranebnb-logo-only/cranebnb-logo-only-3.png";
import './index.css';


/******************************* COMPONENT *******************************/
function Navigation({ isLoaded }){

  /****************** access store *******************/
  const sessionUser = useSelector(state => state.session.user);

  /************ key into pertinent values ************/
  let userId
  if (sessionUser) userId = sessionUser.id

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
      <div className="nav-bar-right">
        <HostingButton />
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-bar-right">
        <LoginOrSignUpModal />
      </div>
    );
  }

  /**************** render component *****************/
  return (
    <div className="nav-bar">

        <NavLink exact to="/">
          <img
            className="nav-bar-left"
            id={desktop === true ? "cranebnbLogoText" : "cranebnbLogoOnly"}
            src={desktop === true ? cranebnbLogo : cranebnbLogoOnly }
            alt="CraneBnB Logo"
          >
          </img>
        </NavLink>

        {isLoaded && sessionLinks}

    </div>
  );
}


/******************************** EXPORTS ********************************/
export default Navigation;
