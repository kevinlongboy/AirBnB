// libraries
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkCreateSingleReview } from "../../store/reviewsReducer";
import './ReviewCreate.css'


function ReviewCreate() {

    /******************************** state ********************************/
    const sessionState = useSelector(state => state.session);
    const reviewsState = useSelector(state => state.reviews);

    /********************** reducer/API communication ***********************/
    const dispatch = useDispatch();

    /********************** key into pertinent values ***********************/
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("★★★★★");
    const [validationErrors, setValidationErrors] = useState([]);

    /*********************** conditional components *************************/
    // change star-value
    let incrementCounter = () => {
        if (stars.length < 5) setStars(stars.concat("★"));
    }
    let decrementCounter = () => {
        if (stars.length > 1) setStars(stars.slice(0, stars.length-1));
    }

    // render errors
    useEffect(() => {
        const errors = [];

        if (review.length < 5) {
            errors.push("Please write a longer review.")
        } else if (review.length > 500) {
            errors.push("Please write a shorter review.")
        }

        if (stars < 1 || stars > 5) {
          errors.push("Please enter a rating.")
        }

        let displayErrors;
        if (errors.length) {
            displayErrors = (
                <div className="errors">
                {validationErrors.length > 0 &&
                validationErrors.map((error) =>
                <p key={error}>{error}</p>)}
                </div>
            )
        } else {
            displayErrors = (
                <div className="errors">
                </div>
            )
        }

        setValidationErrors(errors)
      }, [review, stars])

    /******************************** events *********************************/
    const history = useHistory();
    const { spotId } = useParams()
    const handleSubmit = (e) => {

        e.preventDefault();

        let errors = [];
        setValidationErrors(errors);

        let createReviewData = {
            review: review,
            stars: stars.length
        }

        dispatch(thunkCreateSingleReview(parseInt(spotId), createReviewData)).catch(
            async (res) => {

                const data = await res.json();
                console.l0g("datatatatatadatatatatatadatatatatatadatatatatatadatatatatatadatatatatatadatatatatatadatatatatatadatatatatata", data);

                if (data && data.errors) {
                    data.errors.forEach(message => errors.push(message));
                    setValidationErrors(errors);
                    return
                }
            });
    }


    /*************************** render component ****************************/
    return (

        <div className="review-create-panel">
            <form
                className="create-review-form"
                onSubmit={handleSubmit}
            >

            <label>
                <div>
                    <h2 className="review-create-prompt">Leave a public review</h2>
                    <p className="review-create-subtitle">Write a fair, honest review about your stay so future hosts know what to expect.</p>
                </div>
                <textarea
                    className="textarea-field"
                    type="textarea"
                    name="review"
                    minLength={5}
                    placeholder="Say a few words about your stay"
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                >
                </textarea>
            </label>

                <div>
                    <h2 className="review-create-prompt">Rating</h2>
                    <p className="review-create-subtitle">Share your overall rating</p>
                </div>

            <label>
                <div className="stars">
                    <div>
                        <button
                            id="stars-button"
                            type="button"
                            name="stars"
                            min="1"
                            onClick={decrementCounter}
                            >
                            <i class="fa-solid fa-minus"></i>
                        </button>
                    </div>

                    <div className="output-field-stars">
                        <output>{stars}</output>
                    </div>

                    <div>

                        <button
                            id="stars-button"
                            type="button"
                            name="stars"
                            max="5"
                            onClick={incrementCounter}
                            >
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </label>


           {/* { <div className="errors">
                {validationErrors.length > 0 &&
                validationErrors.map((error) =>
                <p className="error-item" key={error}>{error}</p>)}
            </div>} */}

            {validationErrors.map((error, idx) => (
                <p className="error-item" key={idx}>{error}</p>
            ))}

            <button
            id="review-submit-button"
            type="submit"
            disabled={!!validationErrors.length}
            >
            Submit review
            </button>

            </form>
        </div>
    )
}

export default ReviewCreate
