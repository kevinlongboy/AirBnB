import React, {useState, useEffect} from "react";
import {useHistory, useParams} from 'react-router-dom';
import './ReviewCreate.css'

function ReviewCreate() {

    const history = useHistory();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);

    let incrementCounter = () => {
        if (stars < 5) setStars(stars + 1);
    }
    let decrementCounter = () => {
        if (stars > 1) setStars(stars - 1);
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

        // let createReview = {review, stars}
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
                    <h2>Leave a public review</h2>
                    <p>Write a fair, honest review about your stay so future hosts know what to expect.</p>
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


            <label>
                <div>
                    <h2>Rating</h2>
                    <p>Share your overall rating</p>
                </div>

                <button
                    type="button"
                    name="stars"
                    min="1"
                    onClick={decrementCounter}
                >
                -
                </button>

                <output>{` ★ ${stars} `}</output>

                <button
                    type="button"
                    name="stars"
                    max="5"
                    onClick={incrementCounter}
                >
                +
                </button>
            </label>


           { <div className="errors">
                {validationErrors.length > 0 &&
                validationErrors.map((error) =>
                <p key={error}>{error}</p>)}
            </div>}

            <button
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
