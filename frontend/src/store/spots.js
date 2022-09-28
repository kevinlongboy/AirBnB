import { csrfFetch } from "./csrf";
import { normalizeArray } from "../../src/component-resources/index";


/****************************** TYPES ******************************/
const SPOTS_READ = 'spots/READ';
const SPOTS_READ_SINGLE_SPOT_DETAILS = 'spots/READ_SINGLE_SPOT_DETAILS';
const SPOTS_READ_SINGLE_SPOT_REVIEWS = 'spots/READ_SINGLE_SPOT_REVIEWS';
const SPOTS_CREATE = 'spots/CREATE';
const SPOTS_DELETE = 'spots/DELETE';


/************************* ACTION CREATORS *************************/
export const actionReadAllSpots = (spots) => ({
    type: SPOTS_READ,
    payload: spots // Spots: [array of objects]
});

export const actionReadSingleSpotDetails = (singleSpotDetails) => ({
    type: SPOTS_READ_SINGLE_SPOT_DETAILS,
    payload: singleSpotDetails
})

export const actionReadSingleSpotReviews = (singleSpotReviews) => ({
    type: SPOTS_READ_SINGLE_SPOT_REVIEWS,
    payload: singleSpotReviews
})


export const actionSpotsCreate = (newSpot) => ({
    type: SPOTS_CREATE,
    payload: newSpot
})

// export const actionDelete = (spot) => ({
//     type: DELETE,
//     payload: spot
// });


/*************************** THUNKS (API) ***************************/
export const thunkReadAllSpots = () => async (dispatch) => {

    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        dispatch(actionReadAllSpots(spots.Spots))
    }
}

export const thunkReadSingleSpotDetails = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const singleSpotDetails = await response.json(); // .json() === JSON -> POJO
        dispatch(actionReadSingleSpotDetails(singleSpotDetails))
    }
}

export const thunkReadSingleSpotReviews = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const singleSpotReviews = await response.json();
        dispatch(actionReadSingleSpotReviews(singleSpotReviews.Reviews)) // sends array of objects to payload
    }
}



export const thunkSpotsCreate = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const newSpot = await response.json();
        dispatch(actionSpotsCreate(newSpot));
        return newSpot
    }
}

// export const thunkDelete = (spotId) => async (dispatch) => {
//     const response = await fetch(`api/spots/${spotId}`);
//     if (response.ok) {
//         const spot = await response.json();
//         dispatch(actionDelete(spot))
//     }
// }

/*************************** STATE SHAPE ****************************/
const initialState = {
    allSpots: {},
    singleSpotDetails: {
        SpotImages: [],
        Owner: {}
    },
    singleSpotReviews: {},
}


/***************************** REDUCER ******************************/
const spotsReducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

        case SPOTS_READ:
            let normalizedSpots = normalizeArray(action.payload)
            newState.allSpots = normalizedSpots // returns normalized object of spot-objects
            newState.singleSpotDetails = {...state.singleSpotDetails}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

        case SPOTS_READ_SINGLE_SPOT_DETAILS:
            newState.singleSpotDetails = {...action.payload};
            newState.singleSpotDetails.Owner = {...action.payload.Owner}
            // create shallow copies of nested structures
            let singleSpotImages = [];
            action.payload.SpotImages.forEach(obj => singleSpotImages.push({...obj}));
            newState.singleSpotDetails.SpotImages = singleSpotImages;
            return newState

        case SPOTS_READ_SINGLE_SPOT_REVIEWS:
            // // first: create shallow copies of nested structures
            // // STILL ARRAY OF OBJECTS ATM, NOT OBJECT OF OBJECTS
            // newState.singleSpotReviews.forEach((obj, index) => obj.User = {...action.payload[index].User})
            // let singleSpotReviewImages = [];
            // action.payload.ReviewImages.forEach(obj => singleSpotReviewImages.push({...obj}));
            // newState.singleSpotReviews.ReviewImages = singleSpotReviewImages;
            // // second: normalize object

            newState.singleSpotReviews = normalizeArray(action.payload);

            // for (const obj of newState.singleSpotReviews) {
            //     console.log(obj)
            // }
            // console.log(newState)
            return newState

        default:
            return state
    }
}




export default spotsReducer;
