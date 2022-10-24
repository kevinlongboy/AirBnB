/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import './SpotPageFooter.css'


/******************************* COMPONENT *******************************/
function SpotPageFooter() {

    /**************** render component *****************/
    return (
        <div className="spotPageFooterWrapperContainer">

            <div className="spotPageFooterContainer">

                <div className="spotPageFooterContainerLeft">
                    <div className="footerText">© 2022 Cranebnb, Inc.</div>
                    <span className="footerText">·</span>
                    <a href="https://www.airbnb.com/help/article/2855/airbnb-privacy" className="footerText" >Privacy</a>
                    <span className="footerText">·</span>
                    <a href="https://www.airbnb.com/help/article/2908" className="footerText">Terms</a>
                    <span className="footerText">·</span>
                    <a href="https://www.airbnb.com/sitemaps/v2" className="footerText">Sitemap</a>
                </div>


                <div className="spotPageFooterContainerRight">
                    <a href="https://www.linkedin.com/in/kevinlongboy/"><i class="fa-brands fa-linkedin" id="spotPageFooterSocialMediaIcon"></i></a>
                    <a href="https://github.com/kevinlongboy"><i class="fa-brands fa-github" id="spotPageFooterSocialMediaIcon"></i></a>
                </div>

            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default SpotPageFooter
