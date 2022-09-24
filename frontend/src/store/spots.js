import { csrfFetch } from "./csrf";

/************************* TYPES *************************/
const SPOTS_READ = 'spots/READ';
const SPOTS_CREATE = 'spots/CREATE';
const SPOTS_DELETE = 'spots/DELETE';


/************************* ACTION CREATORS *************************/
export const actionSpotsRead = (spots) => ({
    type: SPOTS_READ,
    payload: spots // Spots: [array of objects]
});

export const actionSpotsCreate = (newSpot) => ({
    type: SPOTS_CREATE,
    payload: newSpot
})

// export const actionDelete = (spot) => ({
//     type: DELETE,
//     payload: spot
// });


/************************* THUNKS (API) *************************/
export const thunkSpotsRead = () => async (dispatch) => {

    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        dispatch(actionSpotsRead(spots))
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
    let newObj = {};
    arr.forEach(el => newObj[el.id] = el);
    return newObj;
  };


// const initialState = {
//     allSpots: [],
// }


/************************* REDUCER *************************/
const spotsReducer = (state = {}, action) => {

    switch (action.type) {

        case SPOTS_READ:
            let allSpots = normalizeArray(action.payload.Spots)
            return allSpots

        case SPOTS_CREATE:
            console.log("ACTION IN REDUCER: ", action)
            console.log("STATE IN REDUCER: ", state)
            console.log("payload IN REDUCER: ", action.payload)

            const newSpot = {...state};
            newSpot[action.payload.id] = action.payload;
            return newSpot

        default:
            return state
    }
}




export default spotsReducer;
