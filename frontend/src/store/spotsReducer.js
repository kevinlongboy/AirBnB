/******************************** IMPORTS ********************************/
// local files
import { csrfFetch } from "./csrf";
import { normalizeArray } from "../component-resources/index";
import { addPlaceholderImages } from "../component-resources/index";


/********************************* TYPES *********************************/
const SPOTS_CREATE_SINGLE_SPOT = 'spots/CREATE_SINGLE_SPOT';
const SPOTS_READ_ALL_SPOTS = 'spots/READ_ALL_SPOTS';
const SPOTS_READ_SINGLE_SPOT_DETAILS = 'spots/READ_SINGLE_SPOT_DETAILS';
const SPOTS_READ_SINGLE_SPOT_REVIEWS = 'spots/READ_SINGLE_SPOT_REVIEWS';
const SPOTS_UPDATE_SINGLE_SPOT = 'spots/UPDATE_SINGLE_SPOT'
const SPOTS_DELETE_SINGLE_SPOT = 'spots/DELETE_SINGLE_SPOT';
const SPOTS_SEARCH_ALL_SPOTS = 'spots/SEARCH_ALL_SPOTS';


/**************************** ACTION CREATORS ****************************/
export const actionCreateSingleSpot = (newSpot) => ({
    type: SPOTS_CREATE_SINGLE_SPOT,
    payload: newSpot
});

export const actionReadAllSpots = (spots) => ({
    type: SPOTS_READ_ALL_SPOTS,
    payload: spots
});

export const actionReadSingleSpotDetails = (singleSpotDetails) => ({
    type: SPOTS_READ_SINGLE_SPOT_DETAILS,
    payload: singleSpotDetails
});

export const actionReadSingleSpotReviews = (singleSpotReviews) => ({
    type: SPOTS_READ_SINGLE_SPOT_REVIEWS,
    payload: singleSpotReviews
});

export const actionUpdateSingleSpot = (updateSpot) => ({
    type: SPOTS_UPDATE_SINGLE_SPOT,
    payload: updateSpot
});

export const actionDeleteSingleSpot = (spotId) => ({
    type: SPOTS_DELETE_SINGLE_SPOT,
    payload: spotId
});

export const actionSearchAllSpots = (searchSpots) => ({
    type: SPOTS_SEARCH_ALL_SPOTS,
    payload: searchSpots
});


/***************************** THUNKS (API) ******************************/
export const thunkCreateSingleSpot = (createSpotData, url) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(createSpotData)
    });
    if (response.ok) {
        const newSpot = await response.json();
        const response2 = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' } ,
            body: JSON.stringify(url)
        });
        if (response2.ok) {
            const newSpotImage = await response2.json();
            dispatch(actionCreateSingleSpot(newSpot));
            return newSpot
        }
        return newSpot
    }
}

export const thunkReadAllSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);
    if (response.ok) {
        const spots = await response.json();
        dispatch(actionReadAllSpots(spots.Spots))
        return spots
    }
}

// export const thunkReadAllSpots = (minPrice) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots?minPrice=${minPrice}`);
//     if (response.ok) {
//         const spots = await response.json();
//         dispatch(actionReadAllSpots(spots.Spots))
//         return spots
//     }
// }

export const thunkReadSingleSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const singleSpotDetails = await response.json();
        dispatch(actionReadSingleSpotDetails(singleSpotDetails))
        return singleSpotDetails;
    }
}

export const thunkReadSingleSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const singleSpotReviews = await response.json();
        dispatch(actionReadSingleSpotReviews(singleSpotReviews.Reviews))
        return singleSpotReviews;
    }
}

export const thunkUpdateSingleSpot = (spotId, updateSpotData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
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

export const thunkSearchAllSpots = (searchData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/search`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(searchData)
    });
    if (response.ok) {
        const searchSpots = await response.json();
        dispatch(actionSearchAllSpots(searchSpots.Spots))
        return searchSpots.Spots
    }}


/***************************** STATE SHAPE *******************************/
const initialState = {
    allSpots: {},
    singleSpotDetails: {
        SpotImages: [],
        Owner: {}
    },
    singleSpotReviews: {},
}


/******************************* REDUCER *********************************/
const spotsReducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

        case SPOTS_CREATE_SINGLE_SPOT:
            // copy newState.allSpots
            newState.allSpots = {...state.allSpots}
            newState.allSpots[action.payload.id] = {...action.payload}
            // copy newState.singleSpotDetails
            newState.singleSpotDetails = {...action.payload}
                let singleSpotImages = []
                newState.singleSpotDetails.SpotImages = addPlaceholderImages(singleSpotImages)
                newState.singleSpotDetails.Owner = {}
            // copy newState.singleSpotReviews
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

            // alt:
            // return {
            //     ...state,

            //     allSpots: {...state.allSpots},
            //     allSpots[action.payload.id]: {...action.payload},

            //     singleSpotDetails: {...action.payload},
            //     singleSpotDetails.SpotImages = addPlaceholderImages([]),
            //     singleSpotDetails.Owner = {},
            //     singleSpotReviews = {...state.singleSpotReviews}
            // }

        case SPOTS_READ_ALL_SPOTS:
            // copy newState.allSpots
            newState.allSpots = {...state.allSpots}
            newState.allSpots = normalizeArray(action.payload)
            // copy newState.singleSpotDetails
            newState.singleSpotDetails = {...state.singleSpotDetails}
                newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            // copy newState.singleSpotReviews
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

        case SPOTS_READ_SINGLE_SPOT_DETAILS:
            // copy newState.allSpots
            newState.allSpots = {...state.allSpots}
            // copy newState.singleSpotDetails
            newState.singleSpotDetails = {...action.payload};
                newState.singleSpotDetails.Owner = {...action.payload.Owner}
                let singleSpotDetailsImages = [];
                action.payload.SpotImages.forEach(obj => singleSpotDetailsImages.push({...obj}));
                newState.singleSpotDetails.SpotImages = singleSpotDetailsImages;
            // copy newState.singleSpotReviews
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

        case SPOTS_READ_SINGLE_SPOT_REVIEWS:
            // copy newState.allSpots
            newState.allSpots = {...state.allSpots}
            // copy newState.singleSpotDetails
            newState.singleSpotDetails = {...state.singleSpotDetails};
                let singleSpotReviewImages = [];
                newState.singleSpotDetails.SpotImages.forEach(obj => singleSpotReviewImages.push({...obj}))
                newState.singleSpotDetails.SpotImages = singleSpotReviewImages;
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
                const copyArr = []
                action.payload.forEach(obj => {
                    const copyObj = {...obj}
                    copyObj.User = {...obj.User};
                    let reviewImages = []
                    obj.ReviewImages.length && obj.ReviewImages.forEach(imgObj => reviewImages.push({...imgObj}))
                    copyObj.ReviewImages = reviewImages
                    copyArr.push(copyObj)
                })
            // copy newState.singleSpotReviews
            newState.singleSpotReviews = normalizeArray(copyArr);
            return newState

        case SPOTS_UPDATE_SINGLE_SPOT:
            // copy newState.allSpots
            newState.allSpots = {...state.allSpots}
            newState.allSpots[action.payload.id] = {...action.payload}
            // copy newState.singleSpotDetails
            newState.singleSpotDetails = {...state.singleSpotDetails}
                newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            // copy newState.singleSpotReviews
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState

        case SPOTS_DELETE_SINGLE_SPOT:
            // copy newState.allSpots
            newState.allSpots = {...state.allSpots}
            // copy newState.singleSpotDetails
            newState.singleSpotDetails = {...state.singleSpotDetails}
                newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            // copy newState.singleSpotReviews
            newState.singleSpotReviews = {...state.singleSpotReviews}
            delete newState.allSpots.spotId
            return newState

        case SPOTS_SEARCH_ALL_SPOTS:
            // copy newState.allSpots
            newState.allSpots = {...state.allSpots}
            newState.allSpots = normalizeArray(action.payload)
            // copy newState.singleSpotDetails
            newState.singleSpotDetails = {...state.singleSpotDetails}
                newState.singleSpotDetails.SpotImages = [...state.singleSpotDetails.SpotImages]
                newState.singleSpotDetails.Owner = {...state.singleSpotDetails.Owner}
            // copy newState.singleSpotReviews
            newState.singleSpotReviews = {...state.singleSpotReviews}
            return newState


        default:
            return state
    }
}


/******************************** EXPORTS ********************************/
export default spotsReducer;
