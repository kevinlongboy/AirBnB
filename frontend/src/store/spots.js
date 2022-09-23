/************************* TYPES *************************/
const SPOTS_READ = 'spots/READ';
const SPOTS_CREATE = 'spots/CREATE';
const SPOTS_DELETE = 'spots/DELETE';


/************************* ACTION CREATORS *************************/
export const actionSpotsRead = (spots) => ({
    type: SPOTS_READ,
    payload: spots // Spots: [array of objects]
});

// export const actionCreate = () => ({
//     type: CREATE,
//     payload: newSpot
// })

// export const actionDelete = (spot) => ({
//     type: DELETE,
//     payload: spot
// });


/************************* THUNKS (API) *************************/
export const thunkSpotsRead = () => async (dispatch) => {

    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        console.log("this is spots: ", spots)
        dispatch(actionSpotsRead(spots))
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
    allSpots: [],
}
/************************* REDUCER *************************/
const spotsReducer = (state = initialState, action) => {

    const newState = {...state};

    switch (action.type) {

        case SPOTS_READ:
            const normalize = {}; // object of objects >> {1: {object}, 2: {object}}
            action.payload.Spots.forEach(obj => {
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

export default spotsReducer;
