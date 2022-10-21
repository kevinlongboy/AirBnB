/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadUserReviews } from "../../../store/reviewsReducer";
import DeleteReview from "../DeleteReview";
import { convertDate } from "../../../component-resources";
import chevronRight from '../../../assets/fontawesome/chevron-right.svg'
import './UserReviews.css'


/******************************* COMPONENT *******************************/
function UserReviews() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const reviewsState = useSelector(state => state.reviews);

    /************ key into pertinent values ************/
    let reviewsArr = Object.values(reviewsState)

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadUserReviews())
    }, [reviewsState]);

    /************* conditional components **************/
    let reviewComponent
    if (!reviewsArr.length) {
        reviewComponent = (
            <>
                <tr>
                    <td>
                    </td>
                </tr>
            </>
        )
    } else {
        reviewComponent =
            reviewsArr.map(review => (
                <tr key={review.id}>
                    <td id="pastReviewsTableBodyData">
                        <p id="pastReviewSpotName">Review for {review.Spot && review.Spot.name}</p>
                        <p id="pastReviewText">{review.review}</p>
                        <p id="pastReviewDateCreated">{review.createdAt && convertDate(review.createdAt)}</p>
                        <DeleteReview id={review.id}/>
                    </td>
                </tr>
            )
        )
    }

    /**************** render component *****************/
    if (!sessionState.user.id) return <Redirect to="/" />;

    else return(
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
                <table id="UserReviewsTable">
                    <thead id='UserReviewsTableHead'>
                        <tr>
                            <th>Reviews to write</th>
                        </tr>
                    </thead>

                    <tbody id='review-table-body'>
                        <tr>
                            <td id="reviewsToWriteTableBodyData">Nobody to review right now. Looks like it’s time for another trip!</td>
                        </tr>
                    </tbody>
                </table>

                <table id="UserReviewsTable">
                    <thead id='UserReviewsTableHead'>
                        <tr>
                            <th>Past reviews you've written</th>
                        </tr>
                    </thead>

                    <tbody id='review-table-body'>
                    {reviewComponent}
                    </tbody>
                </table>
            </div>

        </div>
    )
}


/******************************** EXPORTS ********************************/
export default UserReviews;
