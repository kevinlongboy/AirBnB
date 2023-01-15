/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './CreateReviewForm.css';

/******************************* COMPONENT *******************************/
function CreateReviewForm({reviewFormAction, review}) {

    console.log("reviewFormAction", reviewFormAction)

    /***************** handle events *******************/
    const dispatch = useDispatch()

    if (reviewFormAction == "create") {

    } else {

    }


    /************* conditional components **************/



    /**************** render component *****************/
    return (
        <div className="CreateReviewForm-component">

            
            <button>
                {reviewFormAction}
            </button>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default CreateReviewForm
