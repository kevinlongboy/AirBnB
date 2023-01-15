/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  StarRatings from 'react-star-ratings';
// local files
import { thunkCreateSingleReview, thunkUpdateSingleReview } from "../../../store/reviewsReducer";
import { convertInformalDate } from "../../../component-resources";

/******************************* COMPONENT *******************************/
function ReviewForm({reviewFormAction, spot, userReview, modalFunc}) {

    // console.log("reviewFormAction", reviewFormAction)
    // console.log("userReview", userReview)

    /************* conditional components **************/
    const dispatch = useDispatch()

    /****************** manage state *******************/
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(5);
    const [validationErrors, setValidationErrors] = useState([]);


    // set initial input field values as current spot values
    useEffect(() => {
        setReview(userReview ? userReview.review : '')
        setStars(userReview ? userReview.stars : 5)
    }, [userReview]);

    /***************** handle events *******************/
    // submit form
    const handleSubmit = (e) => {

        e.preventDefault();

        /******** Check for errors ********/
        let errors = [];
        setValidationErrors(errors);

        if (review.length > 0 && review.length < 5) {
            errors.push("Please write a longer review.")
        } else if (review.length > 500) {
            errors.push("Please write a shorter review.")
        }

        if (stars < 1 || stars > 5) {
          errors.push("Please enter a rating.")
        }

        setValidationErrors(errors);
        if (errors.length) return;


        /******** Parse form data ********/
        let reviewData = {
            review: review,
            stars: stars
        }

        let spotId
        reviewFormAction == "Create" ? spotId = spot.Spot.id : spotId = spot.id


        if (reviewFormAction == "Create") {

            console.log("spotId", spotId)
            console.log("reviewData", reviewData)

            dispatch(thunkCreateSingleReview(spotId, reviewData)).catch(
                async (res) => {

                    const data = await res.json();

                    if (data && data.errors) {
                        data.errors.forEach(message => errors.push(message));
                        setValidationErrors(errors);
                    }
                }
            );
            
            modalFunc(false)

        } else if (reviewFormAction == "Update") {
            let reviewId = userReview.id


            dispatch(thunkUpdateSingleReview(reviewId, reviewData)).catch(
                async (res) => {

                    const data = await res.json();

                    if (data && data.errors) {
                        data.errors.forEach(message => errors.push(message));
                        setValidationErrors(errors);
                    }
                }
            )

            modalFunc(false)
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
                    <h2>{reviewFormAction == "Create" ? spot.Spot.name : spot.name}</h2>
                    <p>Hosted by {reviewFormAction == "Create" ? spot.Spot.ownerName : spot.ownerName}</p>
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

                <div className="errors">
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
