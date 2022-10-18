/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// local files
import './index.css';


/******************************* COMPONENT *******************************/
function HostingButton() {

    /**************** render component *****************/
    return (
        <div style={{justifyContent:"end"}}>
            <NavLink to={"/hosting"}>
                <button className="hosting-button" type="submit">
                    Become a Host
                </button>
            </NavLink>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default HostingButton;
