import { csrfFetch } from "./csrf";



/****************************** TYPES ******************************/
const REVIEWS_READ = 'reviews/READ';
const REVIEWS_CREATE = 'reviews/CREATE';


/************************* ACTION CREATORS *************************/
export const actionReviewsRead = (reviews) => ({
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
export const thunkReviewsRead = () => async (dispatch) => {

    const response = await fetch(`api/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        console.log("FROM STORE/REVIEWS.JS, THIS IS REVIEWS: ", reviews)
        dispatch(actionReviewsRead(reviews))
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

const initialState = {
    reviews: []
}

/***************************** REDUCER ******************************/
const reviewsReducer = (state = initialState, action) => {

    const newState = {...state};

    switch (action.type) {

        case REVIEWS_READ:
            const normalize = {}; // object of objects >> {1: {object}, 2: {object}}
            action.payload.Reviews.forEach(obj => {
                normalize[obj.id] = obj
            });

            // action.payload.
            return normalize

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

export default reviewsReducer;
