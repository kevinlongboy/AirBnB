/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
// import '../../Navigation/Navigation.css'
import menuBars from '../../../assets/fontawesome/bars-solid.png'
import userIcon from '../../../assets/fontawesome/circle-user-solid.png'
import './MenuButton.css'


/******************************* COMPONENT *******************************/
function MenuButton() {

  /**************** render component *****************/
  return (
    <>
        <img id='menu-icon' src={menuBars} alt="menu icon"></img>
        <img id='user-icon' src={userIcon} alt = "user icon"></img>
    </>
    )
}


/******************************** EXPORTS ********************************/
export default MenuButton;
