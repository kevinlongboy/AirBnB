import React, {useState, useEffect} from "react";
import {useHistory, useParams} from 'react-router-dom';
import './ReviewCreate.css'

function ReviewCreate() {

    const history = useHistory();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("★★★★★");
    const [validationErrors, setValidationErrors] = useState([]);

    let incrementCounter = () => {
        if (stars.length < 5) setStars(stars.concat("★"));
    }
    let decrementCounter = () => {
        if (stars.length > 1) setStars(stars.slice(0, stars.length-1));
    }

    useEffect(() => {
        const errors = [];

        if (review.length < 5) {
            errors.push("Please enter a longer review")
        }

        if (stars < 1 || stars > 5) {
          errors.push("Please enter a rating")
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



    const { spotId } = useParams()
    const submitHandler = (e) => {

        e.preventDefault();

        // let createReview = {review, stars.length} //MAKE SURE TO SUBMIT STARS.length!!!
        // let newSpot = dispatch(thunkReviewsCreate(createReview));





        history.push(`/spots/${spotId}`) // CHANGE TO REDIRECT TO SPECIFIC SPOT ROUTE!
    }

    return (
        <div className="review-create-panel">
            <form
                className="create-review-form"
                onSubmit={submitHandler}
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


           { <div className="errors">
                {validationErrors.length > 0 &&
                validationErrors.map((error) =>
                <p className="error-item" key={error}>{error}</p>)}
            </div>}

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
