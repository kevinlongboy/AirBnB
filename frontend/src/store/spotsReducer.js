/***************************** IMPORTS *****************************/
import { csrfFetch } from "./csrf";
import { normalizeArray } from "../component-resources/index";
import { img, addPlaceholderImages } from "../component-resources/index";


/****************************** TYPES ******************************/
const SPOTS_CREATE_SINGLE_SPOT = 'spots/CREATE_SINGLE_SPOT';
const SPOTS_READ_ALL_SPOTS = 'spots/READ_ALL_SPOTS';
const SPOTS_READ_SINGLE_SPOT_DETAILS = 'spots/READ_SINGLE_SPOT_DETAILS';
const SPOTS_READ_SINGLE_SPOT_REVIEWS = 'spots/READ_SINGLE_SPOT_REVIEWS';
const SPOTS_UPDATE_SINGLE_SPOT = 'spots/UPDATE_SINGLE_SPOT'
const SPOTS_DELETE_SINGLE_SPOT = 'spots/DELETE_SINGLE_SPOT';


/************************* ACTION CREATORS *************************/
export const actionCreateSingleSpot = (newSpot) => ({
    type: SPOTS_CREATE_SINGLE_SPOT,
    payload: newSpot
})

export const actionReadAllSpots = (spots) => ({
    type: SPOTS_READ_ALL_SPOTS,
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

export const actionUpdateSingleSpot = (updateSpot) => ({
    type: SPOTS_UPDATE_SINGLE_SPOT,
    payload: updateSpot
})

export const actionDeleteSingleSpot = (spotId) => ({
    type: SPOTS_DELETE_SINGLE_SPOT,
    payload: spotId
});


/*************************** THUNKS (API) ***************************/
export const thunkCreateSingleSpot = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const newSpot = await response.json();
        console.log("newSpot", newSpot)
        // okay to dispatch read all spots instead?
        dispatch(actionCreateSingleSpot(newSpot));
        // dispatch(thunkReadSingleSpotDetails(newSpot.id))
        // dispatch(thunkReadAllSpots())
        // console.log("newSpot", newSpot)

        // dispatch(actionReadAllSpots())
        // dispatch(actionReadSingleSpotDetails(newSpot.id))
        return newSpot
    }
}

export const thunkReadAllSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);
    console.log("response thunkReadAllSpots body", response)
    if (response.ok) {
        const spots = await response.json();
        console.log("response thunkReadAllSpots spots", spots)
        dispatch(actionReadAllSpots(spots.Spots))
        return spots
    }
}

export const thunkReadSingleSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const singleSpotDetails = await response.json(); // .json() === JSON -> POJO
        dispatch(actionReadSingleSpotDetails(singleSpotDetails))
        return singleSpotDetails; // ?
    }
}

export const thunkReadSingleSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const singleSpotReviews = await response.json();
        dispatch(actionReadSingleSpotReviews(singleSpotReviews.Reviews)) // sends array of objects to payload
        return singleSpotReviews; // ?
    }
}

export const thunkUpdateSingleSpot = (spotId, updateSpotData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(updateSpotData)
    });
    if (response.ok) {
        const updateSpot = await response.json()
        dispatch(actionUpdateSingleSpot(updateSpot))
        return updateSpot;
    }
}

export const thunkDeleteSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSingleSpot(spotId))
        return
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

        case SPOTS_CREATE_SINGLE_SPOT:
            newState.allSpots = {...state.allSpots}
            newState.allSpots[action.payload.id] = {...action.payload}
            // newState.singleSpotDetails = {...state.singleSpotDetails}
                // create shallow copies of nested structures
                // newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                // newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            // override existing data with newly created spot; use this branch from slice of state to redirect to new spot page
            newState.singleSpotDetails = {...action.payload}
            let singleSpotImages = []
            newState.singleSpotDetails.SpotImages = addPlaceholderImages(singleSpotImages)
            newState.singleSpotDetails.Owner = {}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

        case SPOTS_READ_ALL_SPOTS:
            newState.allSpots = {...state.allSpots}
            newState.allSpots = normalizeArray(action.payload)
            newState.singleSpotDetails = {...state.singleSpotDetails}
                // create shallow copies of nested structures
                newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState // does it return the variable along with what its pointing to

        case SPOTS_READ_SINGLE_SPOT_DETAILS:
            newState.allSpots = {...state.allSpots}
            newState.singleSpotDetails = {...action.payload};
                // create shallow copies of nested structures
                let singleSpotDetailsImages = [];
                action.payload.SpotImages.forEach(obj => singleSpotDetailsImages.push({...obj}));
                newState.singleSpotDetails.SpotImages = singleSpotDetailsImages;
                newState.singleSpotDetails.Owner = {...action.payload.Owner}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

        case SPOTS_READ_SINGLE_SPOT_REVIEWS:
            newState.allSpots = {...state.allSpots}
            newState.singleSpotDetails = {...state.singleSpotDetails};
                // create shallow copies of nested structures
                let singleSpotReviewImages = [];
                newState.singleSpotDetails.SpotImages.forEach(obj => singleSpotReviewImages.push({...obj}))
                newState.singleSpotDetails.SpotImages = singleSpotReviewImages;
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            // // first: create shallow copies of nested structures
            // // STILL ARRAY OF OBJECTS ATM, NOT OBJECT OF OBJECTS
            // newState.singleSpotReviews.forEach((obj, index) => obj.User = {...action.payload[index].User})
            // let singleSpotReviewImages = [];
            // action.payload.ReviewImages.forEach(obj => singleSpotReviewImages.push({...obj}));
            // newState.singleSpotReviews.ReviewImages = singleSpotReviewImages;
            // // second: normalize object
            const copyArr = []
            action.payload.forEach(obj => {
                const copyObj = {...obj}
                copyObj.User = {...obj.User};
                let reviewImages = []
                obj.ReviewImages.length && obj.ReviewImages.forEach(imgObj => reviewImages.push({...imgObj}))
                copyObj.ReviewImages = reviewImages
                copyArr.push(copyObj)
            })
            newState.singleSpotReviews = normalizeArray(copyArr);
            // for (const obj of newState.singleSpotReviews) {
            //     console.log(obj)
            // }
            // console.log(newState)
            return newState

        case SPOTS_UPDATE_SINGLE_SPOT:
            newState.allSpots = {...state.allSpots}
            // add updated spot to allSpots branch
            newState.allSpots[action.payload.id] = {...action.payload}
            newState.singleSpotDetails = {...state.singleSpotDetails}
                // create shallow copies of nested structures
                newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

        case SPOTS_DELETE_SINGLE_SPOT:
            newState.allSpots = {...state.allSpots}
            newState.singleSpotDetails = {...state.singleSpotDetails}
                // create shallow copies of nested structures
                newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            newState.singleSpotReviews = {...state.singleSpotReviews}
            delete newState.allSpots.spotId
            return newState

        default:
            return state
    }
}


/***************************** EXPORTS *****************************/
export default spotsReducer;
