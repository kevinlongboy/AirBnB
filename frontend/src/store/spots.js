import { csrfFetch } from "./csrf";

/************************* TYPES *************************/
const SPOTS_READ = 'spots/READ';
const SPOTS_READ_SINGLE_SPOT_DETAILS = 'spots/READ_SINGLE_SPOT_DETAILS'
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

export const actionSpotsCreate = (newSpot) => ({
    type: SPOTS_CREATE,
    payload: newSpot
})

// export const actionDelete = (spot) => ({
//     type: DELETE,
//     payload: spot
// });


/************************* THUNKS (API) *************************/
export const thunkReadAllSpots = () => async (dispatch) => {

    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        dispatch(actionReadAllSpots(spots.Spots))
    }
}

export const thunkReadSingleSpotDetails = (spotId) => async (dispatch) => {

    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const singleSpotDetails = await response.json(); // .json() === JSON -> POJO
        dispatch(actionReadSingleSpotDetails(singleSpotDetails))
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

/************************ HELPER FUNCTIONS ************************/
// normalize functions to turn array or object into object with contents:
// {1: {1: ...}, 2: {2: ...}, 3: {3: ...}}

function normalizeArray(arr) {
    let obj = {}
    arr.forEach(el => obj[el.id] = el);
    return obj;
};


/************************* REDUCER *************************/
const spotsReducer = (state = {}, action) => {

    let newState = {...state}

    switch (action.type) {

        case SPOTS_READ:
            let spots = normalizeArray(action.payload)
            return newState.allSpots = spots // returns normalized object of spot-objects

        case SPOTS_READ_SINGLE_SPOT_DETAILS:
            // newState.allSpots = [...state.allSpots]
            newState[action.singleSpotDetails.id] = action.singleSpotDetails
            return newState


        case SPOTS_CREATE:
            const newSpot = {...state};
            newSpot[action.payload.id] = action.payload;
            return newSpot

        default:
            return state
    }
}




export default spotsReducer;
