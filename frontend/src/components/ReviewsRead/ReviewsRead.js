// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkDeleteSingleReview, thunkReadUserReviews } from "../../store/reviewsReducer";
import { convertDate } from "../../component-resources";
import chevronRight from '../../assets/fontawesome/chevron-right.svg'
import './ReviewsRead.css'


function Reviews() {

    /******************************** state ********************************/
    const sessionState = useSelector(state => state.session);
    const reviewsState = useSelector(state => state.reviews);

    /********************** reducer/API communication ***********************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadUserReviews())
    }, [reviewsState]);

    /********************** key into pertinent values ***********************/
    let reviewsArr = Object.values(reviewsState)
    console.log("reviewsArr", reviewsArr)

    /******************************* events ********************************/
    const handleDelete = (reviewId) => {
        console.log("reviewId", reviewId)
        dispatch(thunkDeleteSingleReview(reviewId))
    }

    /*********************** conditional components *************************/
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
                    <td>
                        {/* <p id="review-table-body-title">Review for {review.Spot.name}</p> */}
                        <p id="review-table-body-data">{review.review}</p>
                        {/* <p id="review-table-body-date-created">{convertDate(review.createdAt)}</p> */}
                        <button id="review-table-button" type="submit" onClick={(e) => handleDelete(review.id)}>Delete</button>
                    </td>
                </tr>
            )
        )
    }

    /*************************** render component ****************************/
    return(
        <div className="review-page">

            <div className="review-page-header">
                <div>
                    <p className="review-page-navigation">Profile <img id="review-chevron-right" src={chevronRight} style={{maxHeight:'10px', paddingLeft:'8px', paddingRight:'8px'}}></img> Reviews</p>
                </div>
                <div>
                    <h1 id="reviews-title">Reviews by you</h1>
                </div>
                <div id="reviews-subtitle">
                    <p>Reviews by you</p>
                </div>
            </div>

            <div className="review-page-body">
                <table id="review-table">
                    <thead id='review-table-head'>
                        <tr>
                            <th>Reviews to write</th>
                        </tr>
                    </thead>

                    <tbody id='review-table-body'>
                        <tr>
                            <td id="review-table-head-data">Nobody to review right now. Looks like it’s time for another trip!</td>
                        </tr>
                    </tbody>
                </table>

                <table id="review-table">
                    <thead id='review-table-head'>
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

export default Reviews;
