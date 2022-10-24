/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import footerLogo from "../../../assets/branding/cranebnb-logo-footer/cranebnb-logo-account-footer.png"
import './AccountFooter.css'


/******************************* COMPONENT *******************************/
function AccountFooter () {

    /**************** render component *****************/
    return (
        <div className="accountFooterWrapperContainer">

            <div className="accountFooterContainer">

                <div className="accountFooterContainerLeft">
                    <div><img src={footerLogo} className="footerLogo"></img></div>
                    <div className="accountFooterText">© 2022 Cranebnb, Inc. All rights reserved.</div>
                </div>

            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default AccountFooter
