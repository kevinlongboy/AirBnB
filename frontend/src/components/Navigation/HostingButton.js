import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './Navigation.css';

function HostingButton() {
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

export default HostingButton;
