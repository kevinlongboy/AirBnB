/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadSingleSpotReviews } from "../../../store/spotsReducer";
import { convertDate } from "../../../component-resources";
import './SpotReviews.css'


/******************************* COMPONENT *******************************/
function SpotReviews() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const spotsState = useSelector(state => state.spots);

    /************ key into pertinent values ************/
    // spots
    const spot = spotsState.singleSpotDetails;
    // reviews
    const spotReviews = spotsState.singleSpotReviews;
    const reviews = Object.values(spotReviews);
    // params
    const { spotId } = useParams()

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadSingleSpotReviews(spotId));
    }, [dispatch, spotReviews]);


    /**************** render component *****************/
    return (

        <div className="reviews">
          <h2 className="review-data">★ {spot.avgStarRating} · {spot.numReviews} Review<span>{spot.numReviews === 1 ? '' : 's'}</span></h2>

          {reviews && reviews.map((review, index) => (
            <div>
              <div className="review-username">{review.User.firstName}</div>
                <div className="review-date">{review.createdAt && convertDate(review.createdAt)}</div>
                <div className="review-content">{review.review}</div>
              </div>
          ))}


        </div>
    )

}


/******************************** EXPORTS ********************************/
export default SpotReviews
