import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

function ReviewCreate() {

    const history = useHistory();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    let star
    let showStars = () => {
        if (stars == 1) {
            star = <i class="fa-solid fa-star"></i>
        } else if (stars == 2) {
            star = <>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            </>
        } else if (stars == 3) {
            star = <>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            </>
        } else if (stars == 4) {
            star = <>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            </>
        } else if (stars == 5) {
            star = <>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            </>
        }
        return star
    }


    const submitHandler = (e) => {
        e.preventDefault();

        // let createSpotData = {address, city, state, country, name, description, price}
        // console.log("createSpotData: ", createSpotData)

        // let newSpot = dispatch(thunkSpotsCreate(createSpotData));
        // console.log("NEW SPOT: ", newSpot)

        history.push(`/reviews`) // CHANGE TO REDIRECT TO SPECIFIC SPOT ROUTE!
    }

    return (
        <div>
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
                <output>{star}</output>
                <input
                    type="range"
                    name="stars"
                    min={1}
                    max={5}
                    onChange={(e) => setStars(e.target.value)}
                    value={stars}
                >
                </input>
            </label>


            <ul className="errors">
            {validationErrors.length > 0 &&
            validationErrors.map((error) =>
            <p key={error}>{error}</p>)}
            </ul>

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
