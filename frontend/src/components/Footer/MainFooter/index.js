/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import './MainFooter.css'


/******************************* COMPONENT *******************************/
function MainFooter() {

    /**************** render component *****************/
    return (
        <div className="footerContainer">
            <div className="footerText">© 2022 Cranebnb, Inc.</div>
            <span className="footerText">·</span>
            <a href="https://www.airbnb.com/help/article/2855/airbnb-privacy" className="footerText" >Privacy</a>
            <span className="footerText">·</span>
            <a href="https://www.airbnb.com/help/article/2908" className="footerText">Terms</a>
            <span className="footerText">·</span>
            <a href="https://www.airbnb.com/sitemaps/v2" className="footerText">Sitemap</a>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default MainFooter
