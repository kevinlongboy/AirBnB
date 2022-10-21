/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import './Footer.css'


/******************************* COMPONENT *******************************/
function Footer() {

    /**************** render component *****************/
    return (
        <div className="footerContainer">
            <div className="footerText">© 2022 Cranebnb, Inc.</div>
            <span className="footerText">·</span>
            <div className="footerText"><a href="https://www.airbnb.com/help/article/2855/airbnb-privacy" className="footerText" >Privacy</a></div>
            <span className="footerText">·</span>
            <div className="footerText"><a href="https://www.airbnb.com/help/article/2908" className="footerText">Terms</a></div>
            <span className="footerText">·</span>
            <div className="footerText"><a href="https://www.airbnb.com/sitemaps/v2" className="footerText">Sitemap</a></div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default Footer
