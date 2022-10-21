/******************************** IMPORTS ********************************/
// libraries
import { useDispatch } from "react-redux";
// local files
import { thunkDeleteSingleReview } from "../../../store/reviewsReducer";
import './DeleteReview.css'


/******************************* COMPONENT *******************************/
function DeleteReview({id}) {

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /***************** handle events *******************/
    const handleDelete = (reviewId) => {
        dispatch(thunkDeleteSingleReview(reviewId))
    }

    /**************** render component *****************/
    return (
        <button id="reviewTableDeleteButton" type="submit" onClick={(e) => handleDelete(id)}>Delete</button>
    )
}


/******************************** EXPORTS ********************************/
export default DeleteReview
