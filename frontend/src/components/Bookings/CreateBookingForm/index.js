/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadAllSpots, thunkReadSingleSpotDetails } from "../../../store/spotsReducer";
import MainFooter from '../../Footer/MainFooter';
import './CreateBookingForm.css';


/******************************* COMPONENT *******************************/
function CreateBookingForm({spot}) {


    /****************** access store *******************/
    const spotsState = useSelector(state => state.spots)
    console.log("spot", spot)

    /************ key into pertinent values ************/
    // const allSpots = spotsState.allSpots;
    // let allSpotsArr = Object.values(allSpots);

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(thunkReadSingleSpotDetails(spotId));
    // }, [dispatch])

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

    /**************** render component *****************/
    return (
        <div className="CreateBookingForm-component">
            <div className="CreateBookingForm-overview-container">

                <div className="CreateBookingForm-spot-price">${spot.price} <span>night</span></div>

                <div className="CreateBookingForm-spot-rating">
                    ★ {spot.avgStarRating}<span>{' '} · {' '}</span><u>{spot.numReviews} reviews</u>
                </div>
            </div>

            <div className="CreateBookingForm-form-container">
                <form className="CreateBookingForm-form">

                    <div className="CreateBookingForm-date-field-container">
                        <input
                            type="date"
                            id="CreateBookingForm-date-field-start"
                        >
                        </input>

                        <input
                            type="date"
                            id="CreateBookingForm-date-field-end"
                        >
                        </input>
                    </div>

                    <select
                        id="CreateBookingForm-select-field"
                    >
                        <option>1 guest</option>
                        <option>2 guests</option>
                    </select>

                    <button className="CreateBookingForm-reserve-button">
                        Reserve
                    </button>

                    <p>You won't be charged yet</p>
                </form>
            </div>

            <div className="CreateBookingForm-itemization-container">
                <div className="CreateBookingForm-itemization-subtotal-container">
                    <div className="CreateBookingForm-subtotal-item">
                        <p><u>Cleaning fee</u></p>
                        <p>$0</p>
                    </div>
                    <div className="CreateBookingForm-subtotal-item">
                        <p><u>Service fee</u></p>
                        <p>$0</p>
                    </div>
                </div>

                <div className="CreateBookingForm-itemization-total-container">
                    <p>Total before taxes</p>
                    <p>$0</p>
                </div>
            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default CreateBookingForm
