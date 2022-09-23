import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './HostingButton.css';

function HostingButton() {
    return (

        <div style={{justifyContent:"end"}}>
            <NavLink to={"/hosting"}>
                <button className="hosting-button" type="submit">
                    Switch to Hosting
                </button>
            </NavLink>
        </div>
    )
}

export default HostingButton;
