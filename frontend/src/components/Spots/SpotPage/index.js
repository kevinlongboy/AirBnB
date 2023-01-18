/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageGallery from 'react-image-gallery';
// local files
import './SpotPage.css';
import { thunkReadSingleSpotDetails, thunkReadSingleSpotReviews } from "../../../store/spotsReducer";
import { thunkCreateSingleReview } from "../../../store/reviewsReducer.js";
import SpotReviews from "../../Reviews/SpotReviews/index.js";
import SpotPageFooter from "../../Footer/SpotPageFooter";
import { convertDate, addPlaceholderImages } from "../../../component-resources";
import CreateBookingForm from "../../Bookings/CreateBookingForm";
import SpotPageOwnerPanel from "./SpotPageOwnerPanel";
import { Modal } from "../../../context/Modal";
import SpotPageNullUserPanel from "./SpotPageNullUserPanel";


/******************************* COMPONENT *******************************/
function SpotPage() {

  /****************** access store *******************/
  const sessionState = useSelector(state => state.session);
  const spotsState = useSelector(state => state.spots);

  /************ key into pertinent values ************/
  // spot
  const spot = spotsState.singleSpotDetails;
  // spot reviews
  const spotReviews = spotsState.singleSpotReviews;
  const reviews = Object.values(spotReviews);
  // images
  const spotImgs = spotsState.singleSpotDetails.SpotImages;
  const images = Object.values(spotImgs);
  // params
  let { spotId } = useParams()
  spotId = parseInt(spotId)

  const modalImages = []
  images && images.forEach(img => modalImages.push({original: img.url, thumbnail: img.url}))

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
  const [showModal, setShowModal] = useState(false);
  console.log(sessionState.user)
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
  // no user
  if (sessionState.user.id == undefined) {
    panel = (
      <SpotPageNullUserPanel spot={spot}/>
    )
  }
  // user owns spots
  else if (sessionState.user.id && (sessionState.user.id === spot.ownerId)) {
      panel = (
      <SpotPageOwnerPanel spot={spot} spotId={spotId}/>
    )
  // user does not own spot
  } else {
    panel = (
      <CreateBookingForm spot={spot} />
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
                  <img
                    src={image.url}
                    key={index + 1}
                    className="SpotPage-image"
                    id={`img${index + 1}`}
                    onClick={()=> setShowModal(true)}
                    >
                  </img>
                  ))
                }

                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <ImageGallery items={modalImages} showPlayButton={false} showThumbnails={false} onClick={(e) => setShowModal(false)}/>
                  </Modal>
                )}
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


// {
//   images.map((image, index) => {

//     if (showModal) return (
//         <>
//           <img
//             src={image.url}
//             key={index + 1}
//             className="SpotPage-image"
//             id={`img${index + 1}`}
//             onClick={()=> setShowModal(true)}
//           >
//           </img>
//           <Modal onClose={() => setShowModal(false)}>
//             <ImageGallery items={modalImages} showPlayButton={false} showThumbnails={false} onClick={(e) => setShowModal(false)} startIndex={index}/>
//           </Modal>
//         </>
//     );
//     if (!showModal) return (
//       <img
//       src={image.url}
//       key={index + 1}
//       className="SpotPage-image"
//       id={`img${index + 1}`}
//       onClick={()=> setShowModal(true)}
//     >
//     </img>
//     )
// })}
