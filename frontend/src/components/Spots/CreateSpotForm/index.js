/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkCreateSingleSpot, thunkReadAllSpots } from "../../../store/spotsReducer";
import { states } from "../../../component-resources";
import './CreateSpotForm.css'


/******************************* COMPONENT *******************************/
function CreateSpotForm() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const spotsState = useSelector(state => state.spots);
    const singleSpot = spotsState.singleSpotDetails

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(125);
    const [validationErrors, setValidationErrors] = useState([]);

    // change price value
    let incrementCounter = () => {
        if (price < 10000) setPrice(price + 1);
    }
    let decrementCounter = () => {
        if (price > 10) setPrice(price - 1);
    }

    // render errors
    useEffect(() => {
        const errors = [];

        if (address.length > 0 && address.length < 2) {
            errors.push("Address is required.")
        } else if (address.length > 50) {
            errors.push("Please enter a valid address.")
        }

        if (city.length > 0 && city.length < 2) {
            errors.push("City is required.")
        } else if (city.length > 50) {
            errors.push("Please enter a valid city.")
        }

        if (state === "State") {
            errors.push("State is required.")
        }

        if (country === "Country") {
            errors.push("Country is required.")
        }

        if (name.length > 0 && name.length < 2) {
            errors.push("Title is required.")
        } else if (name.length > 50) {
            errors.push("Please create a shorter title.")
        }

        if (description.length >= 1 && description.length < 5) {
            errors.push("Please write a longer description.")
        } else if (description.length > 50) {
            errors.push("Please write a shorter description.")
        }

        if (!price) {
            errors.push("Price per night is required.")
        }

        setValidationErrors(errors)
    }, [address, city, state, country, name, description, price])

    /***************** handle events *******************/
    // submit form
    const history = useHistory();
    const handleSubmit = (e) => {

        e.preventDefault();

        let errors = [];
        setValidationErrors(errors);


        let createSpotData = {
            address: address,
            city: city,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price
        }

        const attempt = dispatch(thunkCreateSingleSpot(createSpotData)).catch(
            async (res) => {

                const data = await res.json();

                if (data && data.errors) {
                    data.errors.forEach(message => errors.push(message));
                    setValidationErrors(errors);
                    return
                }

            }
        )

        attempt.then(console.log("hello"))
    }

    /**************** render component *****************/
    if (!sessionState.user.id) return <Redirect to="/" />;

    return (

        <div className="spot-create-page">
            <div className="banner">
                <h1 className="spot-create-title">Create a new listing</h1>
            </div>

            <form
                className="create-spot-form"
                onSubmit={handleSubmit}
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
                    <option>United States</option>
                </select>
            </label>

            <label>
                <p className="input-field-text-prompt">Create your title</p>
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
                <p className="input-field-text-prompt">Create your description</p>
                <textarea
                className="input-field-textarea"
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

                {/* {validationErrors.length &&
                validationErrors.map((error) =>
                <p className="error-item" key={error}>{error}</p>)} */}

                {validationErrors.length > 0 && validationErrors.map((error, idx) => (
                    <p className="error-item" key={error}>{error}</p>
                ))}


            </div>

            <button
            className="spot-submit-button"
            type="submit"
            // onSubmit={handleSubmit}
            disabled={!!validationErrors.length}
            >
            Looks good
            </button>

            </form>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default CreateSpotForm
