/************************* TYPES *************************/
const READ = 'spots/READ';
const CREATE = 'spots/CREATE';
const DELETE = 'spots/DELETE';


/************************* ACTION CREATORS *************************/
export const actionRead = (spots) => ({
    type: READ,
    payload: spots
});

export const actionCreate = () => ({
    type: CREATE,
    payload: newSpot
})

export const actionDelete = (spot) => ({
    type: DELETE,
    payload: spot
});


/************************* THUNKS (API) *************************/
export const thunkRead = () => async (dispatch) => {

    const response = await fetch(`api/spots`);

    if (response.ok) {
        const spots = await response.json();
        dispatch(actionRead(spots))
    }
}

export const thunkCreate = (data) => async (dispatch) => {

    const response = await fetch(`api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(actionCreate(newSpot));
    }
}

export const thunkDelete = (spotId) => async (dispatch) => {

    const response = await fetch(`api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(actionDelete(spot))
    }
}

const initialState = {
    spots: []
}
/************************* REDUCER *************************/
const spotsReducer = (state = initialState, action) => {

    const newState = {...state};

    switch (action.type) {

        case READ:
            return {
                ...state,
                spots: action.payload
            }

        case CREATE:
            return {
                ...state,
                spots: action.payload
            }

        case DELETE:
            delete newState[spot.id]
            return newState
    }
}

export default spotsReducer;
