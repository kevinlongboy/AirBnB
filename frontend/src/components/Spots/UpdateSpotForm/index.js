/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState} from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkReadSingleSpotDetails, thunkUpdateSingleSpot } from "../../../store/spotsReducer";
// local files
import { states } from '../../../component-resources/index.js';
import './UpdateSpotForm.css';


/******************************* COMPONENT *******************************/
function UpdateSpotForm() {

    /****************** access store *******************/
    const sessionState = useSelector((state) => state.session);
    const spotsState = useSelector(state => state.spots.singleSpotDetails);

    /************ key into pertinent values ************/
    // params
    const { spotId } = useParams()

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadSingleSpotDetails(parseInt(spotId)));
    }, [])

    /****************** manage state *******************/
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(125);
    const [validationErrors, setValidationErrors] = useState([]);

    // set initial input field values as current spot values
    useEffect(() => {
        setAddress(spotsState.address)
        setCity(spotsState.city)
        setState(spotsState.state)
        setCountry(spotsState.country)
        setName(spotsState.name)
        setDescription(spotsState.description)
        setPrice(spotsState.price)
    }, [spotsState]);

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

        if (!address){
            errors.push("Address is required.")
        } else if (address && address.length < 2) {
            errors.push("Address is required.")
        } else if (address && address.length > 50) {
            errors.push("Please enter a valid address.")
        }

        if (!city){
            errors.push("City is required.")
        } else if (city && city.length < 2) {
            errors.push("City is required.")
        } else if (city &&  city.length > 50) {
            errors.push("Please enter a valid city.")
        }

        if (!state){
            errors.push("State is required.")
        } else if (state === "State") {
            errors.push("State is required.")
        }

        if (!country){
            errors.push("Country is required.")
        } else if (country === "Country") {
            errors.push("Country is required.")
        }

        if (!name){
            errors.push("Title is required.")
        } else if (name && name.length < 2) {
            errors.push("Title is required.")
        } else if (name && name.length > 50) {
            errors.push("Please create a shorter title.")
        }

        if (!description) {
            errors.push("Description is required.")
        } else if (description && description.length >= 1 && description.length < 5) {
            errors.push("Please write a longer description.")
        } else if (description && description.length > 50) {
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

        if (state === "" ) {
            errors.push("State is required.")
        }
        if (country === "") {
            errors.push("Country is required.")
        }
        setValidationErrors(errors)

        let updateSpotData = {
            address: address,
            city: city,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price
        }

        dispatch(thunkUpdateSingleSpot(parseInt(spotId), updateSpotData)).catch(
            async (res) => {

                const data = await res.json();
                // console.log("data", data)

                if (data && data.errors) {
                    data.errors.forEach(message => errors.push(message));
                    setValidationErrors(errors);
                }
            });

        history.push(`/spots/${spotId}`)
    }

    /**************** render component *****************/
    if (!sessionState.user.id) return <Redirect to="/" />;

    return (

        <div className="spot-create-page">
            <div className="banner">
                <h1 className="spot-create-title">Update your listing</h1>
            </div>

            <form
                className="create-spot-form"
                onSubmit={handleSubmit}
                >

            <label>
                <p className="input-field-text-prompt">Change your address</p>
                {/* <p className="input-field-text-subtitle">Make it clear to guests where your place is located. We'll only share your address after they've made a reservation. Learn more</p> */}
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
                {/* <p className="input-field-text-subtitle">Your listing title should highlight what makes your place special. Review listing title guidelines.</p> */}
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
                // style={{
                //     textIndent:"10px",
                //     alignContent:"start",
                //     textAlign:"start",
                //     verticalAlign:"start"
                // }}
                type="textarea"
                name="description"
                minLength={5}

                placeholder="You'll have a great time at this comfortable place to stay."
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
            <p className="input-field-text-subtitle">per night</p>
            {/* <p className="input-field-text-prompt">Places like yours in your area usually range from $86 to $144</p> */}

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


/******************************** EXPORTS ********************************/
export default UpdateSpotForm
