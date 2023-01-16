/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import './AccountFooter.css'
import footerLogo from "../../../assets/branding/cranebnb-logo-footer/cranebnb-logo-account-footer.png"
import marketLogo from "../../../assets/social-media-branding/market-logo-767676.png";
import klLogo from "../../../assets/social-media-branding/kl-logo-767676.png";

/******************************* COMPONENT *******************************/
function AccountFooter () {

    /**************** render component *****************/
    return (
        <div className="AccountFooter-page-wrapper-container">

            <div className="AccountFooter-component">

                <div className="AccountFooter-left-container">
                    <div><img src={footerLogo} alt="KL logo" className="footerLogo"></img></div>
                    <div className="accountFooterText">© 2022 Cranebnb, Inc. All rights reserved.</div>
                </div>

                <div className="AccountFooter-right-container">
                    <a
                        href="http://kevinlongboy.com"
                        target='_blank'
                        className="AccountFooter-right-link"
                    >
                        <img src={klLogo}></img>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/kevinlongboy/"
                        target='_blank'
                        className="AccountFooter-right-link"
                    >
                        <i class="fa-brands fa-linkedin"></i>
                    </a>

                    <a
                        href="https://github.com/kevinlongboy"
                        target='_blank'
                        className="AccountFooter-right-link"
                    >
                        <i class="fa-brands fa-github"></i>
                    </a>

                    <a
                        href="https://kl-market.herokuapp.com"
                        target='_blank'
                        className="AccountFooter-right-link"
                    >
                        <img src={marketLogo} alt="Market logo"></img>
                    </a>
                </div>

            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default AccountFooter
