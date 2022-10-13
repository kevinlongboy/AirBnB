/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import ReviewCreate from "../ReviewCreate/ReviewCreate.js";
import { thunkReadAllSpots, thunkReadSingleSpotDetails, thunkReadSingleSpotReviews } from "../../store/spotsReducer";
import { thunkCreateSingleReview } from "../../store/reviewsReducer.js";
import { convertDate, addPlaceholderImages } from "../../component-resources";
import './SpotPage.css';


/******************************* COMPONENT *******************************/
function SpotPage() {

  /****************** access store *******************/
  const sessionState = useSelector(state => state.session);
  const spotsState = useSelector(state => state.spots);

  /************ key into pertinent values ************/
  // user
  const userId = sessionState.user.id;
  // spots
  const spot = spotsState.singleSpotDetails;
  // reviews
  const spotReviews = spotsState.singleSpotReviews;
  const reviews = Object.values(spotReviews);
  // images
  const spotImgs = spotsState.singleSpotDetails.SpotImages;
  const images = Object.values(spotImgs);
  // params
  const { spotId } = useParams()

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadSingleSpotDetails(spotId));
  }, []);

  useEffect(() => {
    dispatch(thunkReadSingleSpotReviews(spotId));
  }, [spotReviews]);

  useEffect(() => {
    dispatch(thunkCreateSingleReview());
  }, [spotReviews]);

  /************* conditional components **************/
  // images
  if (images.length < 5) {
    addPlaceholderImages(images)
  } else if (images.length > 5) {
    images.splice(5, images.length - 1)
  }

  let reviewComponent = (
    <></>
  )

  // reviews
  if (userId && (userId !== spot.ownerId)) {
    reviewComponent = (
    <ReviewCreate />
    )
  }

  const userAlreadyReviewedSpot = reviews.filter(obj => obj.User.id === userId)
  if (userAlreadyReviewedSpot.length > 0) {
    reviewComponent = (
      <>
      </>
    )
  }

  /**************** render component *****************/
  return (

    <div className="spot-page">

        <h1 id="spot-page-name">{spot.name}</h1>

        <div className="spot-page-overview">
          <p className="spot-page-rating">{`★ ${spot.avgStarRating}`}</p>
          <p> · </p>
          <p className="spot-page-review-count">{spot.numReviews} Review<span>{spot.numReviews === 1 ? '' : 's'}</span></p>
          <p> · </p>
          <p className="spot-page-location"> {`${spot.city}, ${spot.state}, ${spot.country}`}</p>
        </div>

        <div className="spot-page-images-cover">

          {
          images.map((image, index) => (
          <img key={index + 1} className={`img${index + 1}`} src={image.url}></img>
          ))
          }
        </div>

        <div className="spot-page-middle">

          <div className="spot-page-middle-left">
            <div className="spot-page-host-info">
              <h2 className="spot-page-host-name">{`Hosted by ${spot.Owner.firstName}`}</h2>
              <p className="spot-page-host-creation-date">Since {spot.createdAt && convertDate(spot.createdAt)}</p>
            </div>

            <div className="spot-page-description">
              <p>{`${spot.description}`}</p>
            </div>

          </div>

          <div className="spot-page-middle-right">
            <div>
              {reviewComponent}
            </div>
          </div>

        </div>

        <div className="reviews">
          <h2 className="review-data">★ {spot.avgStarRating} · {spot.numReviews} Review<span>{spot.numReviews === 1 ? '' : 's'}</span></h2>

          {reviews.map((review, index) => (
            <div>
              <div className="review-username">{review.User.firstName}</div>
                <div className="review-date">{review.createdAt && convertDate(review.createdAt)}</div>
                <div className="review-content">{review.review}</div>
              </div>
          ))}


        </div>


    </div>
  )
}


/******************************** EXPORTS ********************************/
export default SpotPage
