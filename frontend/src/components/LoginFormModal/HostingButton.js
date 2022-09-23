import React from "react";
import { NavLink, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function HostingButton() {
    return (

        <div>
            <NavLink to={"/hosting"}>
                <button className="hosting-button" type="submit">
                    Switch to Hosting
                </button>
            </NavLink>
        </div>
    )
}

export default HostingButton;
