/***************************** IMPORTS *****************************/
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

export const actionDeleteSingleSpot = (spotId) => ({
    type: SPOTS_DELETE,
    payload: spotId
});


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
        return response; // ?
    }
}

export const thunkReadSingleSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const singleSpotReviews = await response.json();
        dispatch(actionReadSingleSpotReviews(singleSpotReviews.Reviews)) // sends array of objects to payload
        return response; // ?
    }
}

export const thunkDeleteSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSingleSpot(spotId))
    }
}

// REFACTOR THIS ↴
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
            newState.allSpots = normalizeArray(action.payload)
            newState.singleSpotDetails = {...state.singleSpotDetails}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState // does it return the variable along with what its pointing to

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


        case SPOTS_DELETE:
            newState.allSpots = normalizeArray(action.payload)
            newState.singleSpotDetails = {...state.singleSpotDetails}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            delete newState.allSpots.spotId
            return newState

        default:
            return state
    }
}


/***************************** EXPORTS *****************************/
export default spotsReducer;
