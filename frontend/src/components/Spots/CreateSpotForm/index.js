/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkCreateSingleSpot } from "../../../store/spotsReducer";
import { states } from "../../../component-resources";
import './CreateSpotForm.css'


/******************************* COMPONENT *******************************/
function CreateSpotForm() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const spotsState = useSelector(state => state.spots);

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(125);
    const [validationErrors, setValidationErrors] = useState([]);

    // change price value
    let incrementCounter = () => {
        if (price < 10000) {
            let newPrice = parseInt(price)
            newPrice = newPrice + 1
            setPrice(newPrice);
        }
    }
    let decrementCounter = () => {
        if (price > 10) {
            let newPrice = parseInt(price)
            newPrice = newPrice - 1
            setPrice(newPrice);
        }
    }
    let changePriceViaType = (e) => {
        let rawPrice = e.target.value;
        if (rawPrice.length < 1 ) return;
        else if (rawPrice.length > 5) return;

        let parsedPrice = parseInt(e.target.value)
        if (Number.isNaN(parsedPrice)) return;
        else setPrice(parsedPrice);
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

        if (state === "State" ) {
            errors.push("State is required.")
        }

        if (country === "Country") {
            errors.push("Country is required.")
        }

        if (url.length > 0 && url.length < 5) {
            errors.push("Photo is required.")
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
            errors.push("Price per night is required.");
        } else if (price < 10 || price > 10000) {
            errors.push("Please enter a base price between $10 and $10,000.");
        } else if (typeof price !== 'number') {
            errors.push("Please enter a valid rate.");
        }

        setValidationErrors(errors)
    }, [address, city, state, country, url, name, description, price])

    /***************** handle events *******************/
    // submit form
    const history = useHistory();
    const handleSubmit = async (e) => {

        e.preventDefault();

        let errors = [];
        setValidationErrors(errors);

        if (address === "" ) {
            errors.push("Address is required.")
        }
        if (city === "" ) {
            errors.push("City is required.")
        }
        if (state === "" ) {
            errors.push("State is required.")
        }
        if (country === "") {
            errors.push("Country is required.")
        }
        if (url === "") {
            errors.push("Photo is required.")
        }
        if (name === "" ) {
            errors.push("Title is required.")
        }
        if (description === "" ) {
            errors.push("Description is required.")
        }
        if (price === "") {
            errors.push("Price is required.")
        }
        setValidationErrors(errors)
        if (errors.length) return


        let createSpotData = {
            address: address,
            city: city,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price
        }

        let createSpotImage = {
            url: url
        }

        const newSpot = await dispatch(thunkCreateSingleSpot(createSpotData, createSpotImage)).catch(
            async (res) => {

                const data = await res.json();

                if (data && data.errors) {
                    data.errors.forEach(message => errors.push(message));
                    setValidationErrors(errors);
                }
            }
        )

        if (newSpot) {
            history.push(`/spots/${newSpot.id}`)
        }
    }

    /**************** render component *****************/
    if (!sessionState.user.id) return <Redirect to="/" />;

    return (


        <div className="spot-create-page">
            <div className="banner">
                <h1 className="spot-create-title">Create a new listing</h1>
            </div>

            <div className="spotFormContainer">
                <form
                    className="create-spot-form"
                    onSubmit={handleSubmit}
                    >


                <div className="spotFormSection">
                    <h2 className="spotFormSectionPrompt">Enter your address</h2>

                    <label>
                        <input
                        className="inputFieldTypeText"
                        id="spotFormInputFieldStreet"
                        type="text"
                        name="address"
                        placeholder="Street"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        />
                    </label>

                    <label>
                        <input
                        className="inputFieldTypeText"
                        id="spotFormInputFieldCity"
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        />
                    </label>

                    <label>
                        <select
                        className="inputFieldTypeSelect"
                        id="spotFormInputFieldState"
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
                        className="inputFieldTypeSelect"
                        id="spotFormInputFieldCountry"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        >
                            <option>Country / Region</option>
                            <option>United States</option>
                        </select>
                        <p className="spotFormSectionText">Share your specific location</p>
                        <p className="spotFormSectionSubtext">Make it clear to guests where your place is located. We'll only share your address after they've made a reservation. <a href="https://www.airbnb.com/help/article/2855/privacy-policy?locale=en&country_override=US" className="spotFormFieldLink">Learn more</a></p>
                    </label>
                    {/* <div id="spotFormSectionTextContainer">
                    </div> */}
                </div>


                <div className="spotFormSection">
                    <h2 className="spotFormSectionPrompt">Add a photo of your place</h2>
                    <label>
                        <input
                        className="inputFieldTypeText"
                        type="text"
                        name="url"
                        placeholder="Enter your photo URL here"
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                        />
                    {/* <p className="spotFormSectionText">Add at least 1 photo</p> */}
                    <p className="spotFormSectionSubtext">Let's put your best photo first.</p>
                    </label>
                </div>


                <div className="spotFormSection">
                    <h2 className="spotFormSectionPrompt">Create your title</h2>
                    <label>
                        <textarea
                        className="inputFieldTypeTextarea"
                        id="spotFormInputFieldTitle"
                        type="textarea"
                        name="name"
                        placeholder="Lovely space in Seattle"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <p className="spotFormSectionSubtext">Your listing title should highlight what makes your place special. <a href="https://www.airbnb.com/resources/hosting-homes/a/new-guidelines-for-writing-your-listing-title-533" className="spotFormFieldLink">Review listing title guidelines.</a></p>
                    </label>
                </div>


                <div className="spotFormSection">
                    <h2 className="spotFormSectionPrompt">Create your description</h2>
                    <label>
                        <textarea
                        className="inputFieldTypeTextarea"
                        id="spotFormInputFieldDescription"
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
                </div>


                <div className="spotFormSection">

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

                            <div className="outputFieldPrice">
                                <span>$</span>
                                <div>
                                    <label>
                                    <input
                                    className="inputFieldPrice"
                                    type="text"
                                    name="price"
                                    onChange={changePriceViaType}
                                    style={{width:"fit"}}
                                    value={price}
                                    />
                                    </label>
                                </div>
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

                    <p id="perNightText">per night</p>
                    <div id="priceRangeSuggestionContainer">
                    <p id="priceRangeSuggestionText">Places like yours in your area usually range from $86 to $144</p>
                    </div>
                </div>


                <div className="errors">
                    {validationErrors.map((error, idx) => (
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
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default CreateSpotForm
