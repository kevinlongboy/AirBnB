/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// local files
import './SearchBar.css';
import { thunkSearchAllSpots } from '../../../store/spotsReducer';


/******************************* COMPONENT *******************************/
function SearchBar(){

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [displaySearchForm, setDisplaySearchForm] = useState(false);
    const [location, setLocation] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [name, setName] = useState();
    const [validationErrors, setValidationErrors] = useState([]);

    /***************** handle events *******************/

    // useEffect(() => {
    //     if (!displaySearchForm) return;
    //     const closeMenu = () => setDisplaySearchForm(false);
    //     document.addEventListener('click', closeMenu);
    //     return () => document.removeEventListener("click", closeMenu);
    //   }, [displaySearchForm]);

    // useEffect(() => {
    //     window.addEventListener("mouseover", setDisplaySearchForm(false))
    // })


    // submit form
    const history = useHistory();

    const handleSubmit = async (e) => {

        e.preventDefault();

        /******** Check for errors ********/
        let errors = [];
        setValidationErrors(errors);

        // errors for fields inputs go here, if any

        setValidationErrors(errors);
        if (errors.length) return;

        /******** Parse form data ********/
        let searchData = {};
        if (location) searchData.location = location
        if (minPrice) searchData.minPrice = minPrice
        if (maxPrice) searchData.maxPrice = maxPrice
        if (name) searchData.name = name

        console.log("searchData", searchData)

        const searchResults = await dispatch(thunkSearchAllSpots(searchData)).catch(

            async (res) => {
                const data = await res.json();

                if (data && data.errors) {
                    errors.push(data.message);
                    setValidationErrors([...errors]);
                }
            }
        )
        // e.target.reset();
        history.push(`/search`)

        // if (searchResults) {
        //     // key into raw db data, since unable to add keys in backend for whatever reason
        // }

    }

    /************* conditional components **************/
    let searchComponent;

    if (displaySearchForm) {
        searchComponent = (
            <div className='SearchBar-search-form-container'>
                <form className='SearchBar-search-form'>
                    <label htmlFor='location' className='search-form-label'>
                        <input
                            type='text'
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            placeholder="Where"
                            className='search-form-text-input'
                        >
                        </input>
                    </label>

                    <label htmlFor='minPrice'>
                        <input
                            type='text'
                            value={minPrice}
                            onChange={e => setMinPrice(e.target.value)}
                            placeholder="Min price"
                            className='search-form-text-input'
                        >
                        </input>
                    </label>

                    <label htmlFor='maxPrice'>
                        <input
                            type='text'
                            value={maxPrice}
                            onChange={e => setMaxPrice(e.target.value)}
                            placeholder="Max price"
                            className='search-form-text-input'
                        >
                        </input>
                    </label>

                    <label htmlFor='spot'>
                        <input
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='search-form-text-input'
                            placeholder='Name'
                        >
                        </input>
                    </label>

                    {/* <div className="errors">
                        {validationErrors.length > 0 && validationErrors.map(err => (
                            <p className="error-item" key={err}>{err}</p>
                        ))}
                    </div> */}

                    <button
                        type="submit"
                        disabled={!!validationErrors.length}
                        onClick={handleSubmit}
                        className='search-form-button'
                    >
                            <i class="fa-solid fa-magnifying-glass" id='search-form-icon'></i> Search
                    </button>

                </form>

                {/* <div onClick={(e) => displaySearchForm ? setDisplaySearchForm(false) : setDisplaySearchForm(true)}>close</div> */}
            </div>
        )

    } else {
        searchComponent = (
            <button
                onClick={(e) => displaySearchForm ? setDisplaySearchForm(false) : setDisplaySearchForm(true)}
                className="SearchBar-start-button"
            >
                Start your search
                <div className='search-button-icon-container'>
                    <i class="fa-solid fa-magnifying-glass" id='search-button-icon'></i>
                </div>
            </button>
        )
    }


    /**************** render component *****************/
    return (
        <div className="SearchBar-component">
            {searchComponent}
        </div>
    );
}


/******************************** EXPORTS ********************************/
export default SearchBar;
