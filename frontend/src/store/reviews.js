/***************************** IMPORTS *****************************/
import { csrfFetch } from "./csrf";
import { normalizeArray } from "../../src/component-resources/index";


/****************************** TYPES ******************************/
const REVIEWS_READ = 'reviews/READ';
const REVIEWS_CREATE = 'reviews/CREATE';


/************************* ACTION CREATORS *************************/
export const actionReadUserReviews = (reviews) => ({
    type: REVIEWS_READ,
    payload: reviews // Users: [array of objects]
});

// export const actionCreate = () => ({
//     type: CREATE,
//     payload: newSpot
// })

// export const actionDelete = (spot) => ({
//     type: DELETE,
//     payload: spot
// });


/*************************** THUNKS (API) ***************************/
export const thunkReadUserReviews = () => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/current`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(actionReadUserReviews(reviews.Reviews))
        return response;
    }
}

// export const thunkCreate = (data) => async (dispatch) => {

//     const response = await fetch(`api/spots`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json'} ,
//         body: JSON.stringify(data)
//     });

//     if (response.ok) {
//         const newSpot = await response.json();
//         dispatch(actionCreate(newSpot));
//     }
// }

// export const thunkDelete = (spotId) => async (dispatch) => {

//     const response = await fetch(`api/spots/${spotId}`);

//     if (response.ok) {
//         const spot = await response.json();
//         dispatch(actionDelete(spot))
//     }
// }


/*************************** STATE SHAPE ****************************/
const initialState = {
    reviews: {}
}


/***************************** REDUCER ******************************/
const reviewsReducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

        case REVIEWS_READ:
            newState = {... normalizeArray(action.payload)}
            return newState

        // case CREATE:
        //     return {
        //         ...state,
        //         spots: action.payload
        //     }

        // case DELETE:
        //     delete newState[spot.id]
        //     return newState

        default:
            return state
    }
}


/***************************** EXPORTS *****************************/
export default reviewsReducer;
