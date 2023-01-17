/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './SpotPage.css';
import { thunkReadSingleSpotDetails, thunkReadSingleSpotReviews } from "../../../store/spotsReducer";
import { thunkCreateSingleReview } from "../../../store/reviewsReducer.js";
import SpotReviews from "../../Reviews/SpotReviews/index.js";
import SpotPageFooter from "../../Footer/SpotPageFooter";
import { convertDate, addPlaceholderImages } from "../../../component-resources";
import CreateBookingForm from "../../Bookings/CreateBookingForm";
import SpotPageOwnerPanel from "./SpotPageOwnerPanel";


/******************************* COMPONENT *******************************/
function SpotPage() {

  /****************** access store *******************/
  const sessionState = useSelector(state => state.session);
  const spotsState = useSelector(state => state.spots);

  /************ key into pertinent values ************/
  // user
  const userId = sessionState.user.id;
  // spot
  const spot = spotsState.singleSpotDetails;
  // spot reviews
  const spotReviews = spotsState.singleSpotReviews;
  const reviews = Object.values(spotReviews);
  // user's review
  const userAlreadyReviewedSpot = reviews.filter(obj => obj.User.id === userId)
  const userReview = userAlreadyReviewedSpot[0]
  // images
  const spotImgs = spotsState.singleSpotDetails.SpotImages;
  const images = Object.values(spotImgs);
  // params
  let { spotId } = useParams()
  spotId = parseInt(spotId)

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadSingleSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(thunkReadSingleSpotReviews(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunkCreateSingleReview());
  }, [dispatch]);

  /****************** manage state *******************/
  let [reviewFormAction, setReviewFormAction] = useState();


  /************* conditional components **************/
  // images
  if (images.length) {
    if (images.length < 5) {
      addPlaceholderImages(images)
    } else if (images.length > 5) {
      images.splice(5, images.length - 1)
    }
  }

  // Booking
  let panel;
  if (userId && (userId !== spot.ownerId)) {
    panel = (
    <CreateBookingForm spot={spot}/>
    )
  } else {
    panel = (
      <SpotPageOwnerPanel spot={spot} spotId={spotId}/>
    )
  }

  /**************** render component *****************/
  return (
    <>
      <div className="SpotPage-wrapper-container">
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
                <div className="SpotPage-panel-container">
                  {panel}
                </div>
              </div>

            </div>

            <SpotReviews />
        </div>
      </div>
    <SpotPageFooter />
    </>
  )
}


/******************************** EXPORTS ********************************/
export default SpotPage
