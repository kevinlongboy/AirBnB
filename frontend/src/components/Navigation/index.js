import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import cranebnbLogo from "../../assets/branding/cranebnb-logo-3.png";
import './Navigation.css';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;

  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // }
  // else {
  //   sessionLinks = (
  //     <>
  //       <NavLink to="/signup">Sign Up</NavLink>
  //       <LoginFormModal />
  //     </>
  //   );
  // }

  return (
    <div className="nav-bar">
        <NavLink exact to="/">
          <img className="logo" src={cranebnbLogo}></img>
        </NavLink>
        {/* {isLoaded && sessionLinks} */}
        <LoginFormModal />
    </div>

  );
}

export default Navigation;
