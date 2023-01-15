/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  StarRatings from 'react-star-ratings';
// local files
import { thunkCreateSingleReview } from "../../../store/reviewsReducer";
import { convertInformalDate } from "../../../component-resources";

/******************************* COMPONENT *******************************/
function ReviewForm({reviewFormAction, spot, userReview, modalFunc}) {

    // console.log("reviewFormAction", reviewFormAction)
    // console.log("userReview", userReview)
    // console.log("spotId", spotId)
    console.log("spot", spot)

    /************* conditional components **************/
    const dispatch = useDispatch()

    /****************** manage state *******************/
    const [review, setReview] = useState("");
    const [stars, setStars] = useState();
    const [validationErrors, setValidationErrors] = useState([]);

    /***************** handle events *******************/
    const handleSubmit = (e) => {

        e.preventDefault();

        let errors = [];
        setValidationErrors(errors);

        let reviewData = {
            review: review,
            stars: stars
        }

        if (reviewFormAction == "Create") {
            // return dispatch(thunkCreateSingleReview(spotId, createReviewData)).catch(
            //     async (res) => {

            //         const data = await res.json();

            //         if (data && data.errors) {
            //             data.errors.forEach(message => errors.push(message));
            //             setValidationErrors(errors);
            //         }
            //     });

        } else if (reviewFormAction == "Update") {
            // dispatch(thunkUpdateSingleReview())
        }
    }


    /**************** render component *****************/
    return (
        <div className="ReviewForm-component">
            <div className="ReviewForm-close-header-container">
                <div  className="ReviewForm-close-button-container">
                    <button
                        onClick={(e) => modalFunc(false)}
                        className="ReviewForm-close-button"
                        >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="ReviewForm-close-header-text-container">
                    <p>{reviewFormAction} review</p>
                </div>
            </div>

            <form
                className="ReviewForm-form"
                onSubmit={handleSubmit}
            >
                <div className="ReviewForm-input-section">
                    <h2>{spot.Spot.name}</h2>
                    <p>Hosted by {spot.Spot.ownerName}</p>
                    {/* <p>{convertInformalDate(spot.startDate)} - {convertInformalDate(spot.endDate)}</p> */}
                </div>

                <div className="ReviewForm-input-section">
                    <h2 >Leave a public review</h2>
                    <p >Write a fair, honest review about your stay so future hosts know what to expect.</p>
                    <label for="review">
                        <textarea
                            type="textarea"
                            name="review"
                            minLength={5}
                            placeholder="Say a few words about your stay"
                            onChange={(e) => setReview(e.target.value)}
                            value={review}
                            className="ReviewForm-textarea-field"
                            >
                        </textarea>
                    </label>
                </div>


                <div className="ReviewForm-input-section">
                    <h2 >Rating</h2>
                    <p >Share your overall rating</p>
                    <label for="stars">
                        <StarRatings
                            isSelectable={true}
                            rating={stars}
                            changeRating={(stars) => setStars(stars)}
                            starRatedColor="#ffd700"
                            starHoverColor="#ffd700"
                            numberOfStars={5}
                            name='stars'
                            starDimension='32px'
                            starSpacing='0'
                        />
                    </label>
                </div>

                <div>
                    {validationErrors.map((error, idx) => (
                        <p className="error-item" key={idx}>{error}</p>
                    ))}
                </div>

            <button
                type="submit"
                disabled={!!validationErrors.length}
                className="ReviewForm-submit-button"
            >
                Post
            </button>

            </form>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default ReviewForm
