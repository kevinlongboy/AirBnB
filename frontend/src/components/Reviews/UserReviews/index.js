/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadUserReviews } from "../../../store/reviewsReducer";
import DeleteReview from "../DeleteReview";
import AccountFooter from "../../Footer/AccountFooter";
import { convertDate, convertInformalDate } from "../../../component-resources";
import chevronRight from '../../../assets/fontawesome/chevron-right.svg'
import './UserReviews.css'
import { thunkReadUserBookings } from "../../../store/bookingsReducer";
import ReviewFormModal from "../ReviewFormModal";


/******************************* COMPONENT *******************************/
function UserReviews() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const reviewsState = useSelector(state => state.reviews);
    const bookingsState = useSelector(state => state.bookings)

    /************ key into pertinent values ************/
    let bookingsArr = Object.values(bookingsState.userBookings)
    let spotsVisited = []
    bookingsArr.forEach(obj => spotsVisited.push(obj.spotId))

    let reviewsArr = Object.values(reviewsState)
    let spotsReviewed = []
    reviewsArr.forEach(obj => spotsReviewed.push(obj.spotId))

    let spotsToBeReviewed = bookingsArr.filter(obj => !spotsReviewed.includes(obj.spotId))
    console.log("spotsToBeReviewed", spotsToBeReviewed)
    // let spotsToBeReviewed= [] // uncomment to test for no new reviews


    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadUserReviews())
    }, [dispatch]);

    useEffect(() => {
        dispatch(thunkReadUserBookings())
    }, [dispatch]);

    /************* conditional components **************/
    let newReviewsTable
    if (!spotsToBeReviewed.length) {
        newReviewsTable = (
            <tr id="reviewsToWriteTableBodyRow">
                <td id="reviewsToWriteTableBodyData">Nobody to review right now. Looks like it’s time for another trip!</td>
            </tr>
        )
    } else {
        newReviewsTable = (
            spotsToBeReviewed.map(spot => (
                <tr>
                    <td className="reviews-table-body-data">
                        <h1>{spot.Spot.name}</h1>
                        <p>Hosted by {spot.Spot.ownerName}</p>
                        <span>{`${convertInformalDate(spot.startDate)} - ${convertInformalDate(spot.endDate)}`}</span>
                        <div className="reviews-table-buttons-container">
                            <ReviewFormModal
                                reviewFormAction={'Create'}
                                spot={spot}
                            />
                        </div>
                    </td>
                </tr>
            ))
        )
    }


    let pastReviewsTable
    if (!reviewsArr.length) {
        pastReviewsTable = (
            <>
                <tr className="reviews-table-body-row">
                    <td className="reviews-table-body-data">
                    </td>
                </tr>
            </>
        )
    } else {
        pastReviewsTable =
            reviewsArr.map(review => (
                <tr key={review.id}>
                    <td className="reviews-table-body-data">
                        <h1>Review for {review.Spot && review.Spot.name}</h1>
                        <p id="pastReviewText">{review.review}</p>
                        <span id="pastReviewDateCreated">{review.createdAt && convertDate(review.createdAt)}</span>
                        <div className="reviews-table-buttons-container">
                            <ReviewFormModal
                                reviewFormAction={'Update'}
                                spot={review.Spot}
                                userReview={review}
                                />
                            <DeleteReview id={review.id}/>
                        </div>
                    </td>
                </tr>
            )
        )
    }

    /**************** render component *****************/
    if (!sessionState.user.id) return <Redirect to="/" />;

    else return (

    <>
        <div className="pageWrapperContainer">
            <div className="review-page">

                <div className="review-page-header">
                    <div>
                        <p className="review-page-navigation">Profile <img id="review-chevron-right" src={chevronRight} style={{maxHeight:'10px', paddingLeft:'8px', paddingRight:'8px'}}></img> Reviews</p>
                    </div>
                    <div>
                        <h1 id="UserReviewsPageTitle">Reviews by you</h1>
                    </div>
                    <div id="reviews-subtitle">
                        <p>Reviews by you</p>
                    </div>
                </div>

                <div className="review-page-body">
                    <table id="UserReviewsTablePending">
                        <thead id='UserReviewsTableHead'>
                            <tr>
                                <th>Reviews to write</th>
                            </tr>
                        </thead>

                        <tbody id='review-table-body'>
                            {newReviewsTable}
                        </tbody>
                    </table>

                    <table id="UserReviewsTablePast">
                        <thead id='UserReviewsTableHead'>
                            <tr>
                                <th>Past reviews you've written</th>
                            </tr>
                        </thead>

                        <tbody id='review-table-body'>
                        {pastReviewsTable}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <AccountFooter />
    </>
    )
}


/******************************** EXPORTS ********************************/
export default UserReviews;
