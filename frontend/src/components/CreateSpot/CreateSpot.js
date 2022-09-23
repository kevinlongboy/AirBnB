import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { actionSpotsCreate, thunkSpotsCreate } from "../../store/spots";



const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CZ', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];


function CreateSpot() {

    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();

    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

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
        let createSpotData = {address, city, state, country, name, price}
        console.log("createSpotData: ", createSpotData)

        let newSpot = dispatch(thunkSpotsCreate(createSpotData));
        console.log("NEW SPOT: ", newSpot)
        console.log(newSpot)
        history.push(`/spots/`)
      }

    return (
        <div>

            <form
                className="create-spot-form"
                onSubmit={submitHandler}
                >

            <h1>Create a New Listing</h1>

            <ul className="errors">
            {validationErrors.length > 0 &&
            validationErrors.map((error) =>
            <p key={error}>{error}</p>)}
            </ul>

            <label>
                <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />
            </label>

            <label>
                <input
                type="text"
                name="city"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
            />
            </label>


            <label>
                <select
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
                <select
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                >
                    <option>Country</option>
                    <option>United States of America</option>
                </select>
            </label>

            <label>
                Create your title
                <input
                type="text"
                name="name"
                placeholder="Lovely space in Seattle"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            </label>

            <label>
                Create your description
                <input
                type="textarea"
                name="description"
                minLength={5}
                placeholder="You'll have a great time at this comfortable place to stay."
                // rows="5"
                // cols="20"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            </label>

            <label>
                <output>${price}</output>
                <input
                type="range"
                name="price"
                min="10"
                max="10000"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                />
                per night
            </label>

            <button
            type="submit"
            disabled={!!validationErrors.length}
            >
            Looks good
            </button>

            </form>
        </div>
    )
}

export default CreateSpot
