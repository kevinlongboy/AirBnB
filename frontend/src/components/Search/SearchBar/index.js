/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// local files
import './SearchBar.css';


/******************************* COMPONENT *******************************/
function SearchBar(){

    /****************** access store *******************/
    const sessionUser = useSelector(state => state.session.user);

    /************ key into pertinent values ************/
    let userId
    if (sessionUser) userId = sessionUser.id

    /****************** manage state *******************/
    const [displaySearchPanel, setDisplaySearchPanel] = useState(false);
    const [location, setLocation] = useState();

    /************* conditional components **************/
    let searchPanel = (
        <div>
            Search panel
        </div>
    )


    /**************** render component *****************/
    return (
        <div className="SearchBar-component">

                <button
                    onClick={(e) => displaySearchPanel ? setDisplaySearchPanel(false) : setDisplaySearchPanel(true)}
                    className="SearchBar-start-button"
                >
                    Start your search
                    <div className='SearchBar-icon-container'>
                        <i class="fa-solid fa-magnifying-glass" id='SearchBar-icon'></i>
                    </div>
                </button>

            {displaySearchPanel && searchPanel}
        </div>
    );
}


/******************************** EXPORTS ********************************/
export default SearchBar;
