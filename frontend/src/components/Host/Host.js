import React from "react";
import {NavLink, Link} from "react-router-dom";
import "./Host.css"

function Host() {

    return (
        <div className="full-page">

            <div className="left">
                <p className="host-welcome-message" style={{display:"flex", flexDirection:"column", justifyContent:"center", verticalAlign:"center"}}>Welcome</p>
            </div>

            <div className="right">

                <div>
                    <NavLink to={"/"}>
                    <button className="hosting-exit-button">Exit</button>
                    </NavLink>
                </div>

                <div>
                    <NavLink to={"/hosting/create"}>
                        <button
                        className="hosting-manage-button"
                        type="submit"
                        style={{display:"flex", flexDirection:"row", justifyContent:"space-between", verticalAlign:"center", textDecoration:"none"}}
                        >
                            <p className="fa-thin fa-plus" style={{fontSize:"60px"}}></p>
                            Create a new listing
                            <p className="fa-chevron-right"></p>
                        </button>
                    </NavLink>
                </div>

                <div>
                    <NavLink to={"/hosting/listings"}>
                        <button
                        className="hosting-manage-button"
                        type="submit"
                        >
                            Manage an existing listing
                        </button>
                    </NavLink>
                </div>

            </div>
        </div>
    )
}

export default Host;
