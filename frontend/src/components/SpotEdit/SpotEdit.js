import React, {useState, useEffect} from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { actionSpotsCreate, thunkSpotsCreate } from "../../store/spots";

import './SpotEdit.css'


const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CZ', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];


function SpotEdit() {

    // util use params to send spotId in POST API request in thunk
    // let { spotId } = useParams();
    // spotId = Number.parseInt(spotId)


    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();

    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(125);
    const [validationErrors, setValidationErrors] = useState([]);

    let incrementCounter = () => {
        if (price < 10000) setPrice(price + 1);
    }
    let decrementCounter = () => {
        if (price >10) setPrice(price - 1);
    }


    useEffect(() => {
        const errors = [];

        if (address.length < 2) {
            errors.push("Address is required")
        } else if (address.length > 50) {
            errors.push("Please enter a valid address")
        }

        if (city.length < 2) {
            errors.push("City is required")
        } else if (city.length > 50) {
            errors.push("Please enter a valid city")
        }

        if (state === "State") {
            errors.push("State is required")
        }

        if (country === "Country") {
            errors.push("Country is required")
        }

        if (name.length < 2) {
          errors.push("Title is required")
        } else if (name.length > 50) {
          errors.push("Please create a shorter title")
        }

        if (description.length === 0) {
            errors.push("Description is required")
        } else if (description.length >= 1 && description.length < 5) {
            errors.push("Please create a longer description")
        } else if (description.length > 50) {
            errors.push("Please create a shorter description")
        }

        if (!price) {
            errors.push("Price per night is required")
        }

        setValidationErrors(errors)
      }, [address, city, state, country, name, description, price])


    const submitHandler = (e) => {
    e.preventDefault();

    let createSpotData = {address, city, state, country, name, description, price}
    console.log("createSpotData: ", createSpotData)

    let newSpot = dispatch(thunkSpotsCreate(createSpotData));
    console.log("NEW SPOT: ", newSpot)

    history.push(`/spots`) // CHANGE TO REDIRECT TO SPECIFIC SPOT ROUTE!
    }


    return (

        <div className="spot-create-page">
            <div className="banner">
                <h1 className="spot-create-title">Update your listing</h1>
            </div>

            <form
                className="create-spot-form"
                onSubmit={submitHandler}
                >

            <label>
                <input
                className="input-field"
                type="text"
                name="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />
            </label>

            <label>
                <input
                className="input-field"
                type="text"
                name="city"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
            />
            </label>


            <label>
                <select className="input-field-select"
                onChange={(e) => setState(e.target.value)}
                value={state}
                >
                    <option>State</option>
                    {states.map(state => (
                    <option key={state} required="true"
                    >
                    {state}
                    </option>
                    ))}
                </select>
            </label>

            <label>
                <select className="input-field-select"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                >
                    <option>Country</option>
                    <option>United States of America</option>
                </select>
            </label>

            <label>
                <p className="input-field-text-prompt">Change your title</p>
                <input
                className="input-field"
                type="text"
                name="name"
                placeholder="Lovely space in Seattle"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            </label>

            <label>
                <p className="input-field-text-prompt">Change your description</p>
                <input
                className="input-field-textarea"
                id="spot-edit-input-field-textarea-placeholder"
                style={{
                    textIndent:"10px",
                    alignContent:"start",
                    textAlign:"start",
                    verticalAlign:"start"
                }}
                type="textarea"
                name="description"
                minLength={5}

                placeholder="You'll have a great time at this comfortable place to stay."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            </label>

            {/* <label>
                <output placeholder="0">${price}</output>
                <input
                type="range"
                name="price"
                min="10"
                max="10000"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                />
                per night
            </label> */}

            <label>
                <div className="price">

                    <div>
                        <button
                            id="price-button"
                            type="button"
                            name="price"
                            min="10"
                            onClick={decrementCounter}
                            >
                            <i class="fa-solid fa-minus"></i>
                        </button>
                    </div>


                    <div className="output-field-price" style={{color:"black"}}>
                        <output className="output-display-price">${`${price}`}</output>
                    </div>

                    <div>
                        <button
                            id="price-button"
                            type="button"
                            name="price"
                            max="10000"
                            onClick={incrementCounter}
                            >
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </label>

            <div className="errors">
                {validationErrors.length > 0 &&
                validationErrors.map((error) =>
                <p className="error-item" key={error}>{error}</p>)}
            </div>

            <button
            className="spot-submit-button"
            type="submit"
            disabled={!!validationErrors.length}
            >
            Looks good
            </button>

            </form>
        </div>
    )
}

export default SpotEdit
