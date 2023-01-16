/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import './MainFooter.css'
import marketLogo from "../../../assets/social-media-branding/market-logo-black.png";
import klLogo from "../../../assets/social-media-branding/kl-logo.png";


/******************************* COMPONENT *******************************/
function MainFooter() {

    /**************** render component *****************/
    return (
        <div className="MainFooter-component">
            <div className="MainFooter-left-container">
                <div className="footerText">© 2022 Cranebnb, Inc.</div>

                <span className="footerText">·</span>

                <span className="footerText">Privacy</span>
                {/* <a href="https://www.airbnb.com/help/article/2855/airbnb-privacy" className="footerText" >Privacy</a> */}

                <span className="footerText">·</span>

                <span className="footerText">Terms</span>
                {/* <a href="https://www.airbnb.com/help/article/2908" className="footerText">Terms</a> */}

                <span className="footerText">·</span>

                <span className="footerText">Sitemap</span>
                {/* <a href="https://www.airbnb.com/sitemaps/v2" className="footerText">Sitemap</a> */}
            </div>

            <div className="MainFooter-right-container">

                <a
                    href="http://kevinlongboy.com"
                    target='_blank'
                    className="MainFooter-right-link"
                >
                    <img src={klLogo}></img>
                </a>

                <a
                    href="https://www.linkedin.com/in/kevinlongboy/"
                    target='_blank'
                    className="MainFooter-right-link"
                >
                    <i class="fa-brands fa-linkedin"></i>
                </a>

                <a
                    href="https://github.com/kevinlongboy"
                    target='_blank'
                    className="MainFooter-right-link"
                >
                    <i class="fa-brands fa-github"></i>
                </a>

                <a
                    href="https://kl-market.herokuapp.com"
                    target='_blank'
                    className="MainFooter-right-link"
                >
                    <img src={marketLogo}></img>
                </a>
            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default MainFooter
