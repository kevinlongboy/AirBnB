// libraries
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// local files
import ReviewCreate from "../ReviewCreate/ReviewCreate.js";
import { thunkReadSingleSpotDetails, thunkReadSingleSpotReviews } from "../../store/spots";
import { convertDate, addPlaceholderImages } from "../../component-resources";
import './SpotPage.css';


function SpotPage() {

  /******************************** state ********************************/
  const sessionState = useSelector(state => state.session);
  const spotsState = useSelector(state => state.spots);

  /******************************** params ********************************/
  const { spotId } = useParams()

  /********************** reducer/API communication ***********************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadSingleSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(thunkReadSingleSpotReviews(spotId));
  }, [dispatch, spotId]);

  /********************** key into pertinent values ***********************/
  const userId = sessionState.user.id;
  const spot = spotsState.singleSpotDetails;
  const spotReviews = spotsState.singleSpotReviews;
  const reviews = Object.values(spotReviews)
  const spotImgs = spotsState.singleSpotDetails.SpotImages
  const images = Object.values(spotImgs)

  // const spotImagesRaw = spot.SpotImages // array of objects
  // const spotImagesArr = []
  // spotImagesRaw.forEach((img) => spotImagesArr.push(img.url))
  // spotImagesArr = addPlaceholderImages(spotImagesArr) // add filler images, if min not met

  /*********************** conditional components *************************/
  let reviewComponent
  if ((userId >= 1) && (userId != spot.OwnerId)) {
    reviewComponent = (
    <ReviewCreate />
    )
  } else {
    reviewComponent = (
    <>
    </>
    )
  }

  if (images.length < 5) {
    addPlaceholderImages(images)
  } else if (images.length > 5) {
    images.splice(5, images.length - 1)
  }

  /*************************** render component ****************************/
  return (

    <div className="spot-page">

        <h1 id="spot-page-name">{spot.name}</h1>

        <div className="spot-page-overview">
          <p className="spot-page-rating">{`★ ${spot.avgStarRating}`}</p>
          <p> · </p>
          <p className="spot-page-review-count">2 Reviews</p>
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
              {/* <p className="spot-page-host-creation-date">Since {convertDate(spot.createdAt)}</p> */}
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
          <h2 className="review-data">{`★ ${spot.avgStarRating} · ${spot.numReviews} Reviews`}</h2>

          {reviews.map((review, index) => (
            <div>
              <div className="review-username">{review.User.firstName}</div>
                <div className="review-date">{convertDate(review.createdAt)}</div>
                <div className="review-content">{review.review}</div>
              </div>
          ))}


        </div>


    </div>
  )
}

export default SpotPage
