/******************************** IMPORTS ********************************/
// local files
import { csrfFetch } from "./csrf";
import { normalizeArray } from "../component-resources/index";


/********************************* TYPES *********************************/
// "booking" - for guest(s) of a spot
// "reservation" - for host(s) of a spot
const BOOKINGS_CREATE_SINGLE_BOOKING = 'bookings/CREATE_SINGLE_BOOKING';
const BOOKINGS_READ_USER_BOOKINGS = 'bookings/READ_USER_BOOKINGS';
const BOOKINGS_READ_USER_RESERVATIONS = 'bookings/READ_USER_RESERVATIONS';
const BOOKINGS_READ_SPOT_RESERVATIONS = 'bookings/READ_SPOT_RESERVATIONS';
const BOOKINGS_UPDATE_SPOT_BOOKING = 'bookings/UPDATE_SPOT_BOOKING';
const BOOKINGS_DELETE_SPOT_BOOKING = 'bookings/DELETE_SPOT_BOOKING';


/**************************** ACTION CREATORS ****************************/
export const actionCreateSingleBooking = (newBooking) => ({
    type: BOOKINGS_CREATE_SINGLE_BOOKING,
    payload: newBooking
});

export const actionReadUserBookings = (userBookings) => ({
    type: BOOKINGS_READ_USER_BOOKINGS,
    payload: userBookings
});

export const actionReadUserReservations = (userReservations) => ({
    type: BOOKINGS_READ_USER_RESERVATIONS,
    payload: userReservations
})

export const actionReadSpotReservations = (spotReservations) => ({
    type: BOOKINGS_READ_SPOT_RESERVATIONS,
    payload: spotReservations
});

export const actionUpdateSpotBooking = (updateBooking) => ({
    type: BOOKINGS_UPDATE_SPOT_BOOKING,
    payload: updateBooking
});

export const actionDeleteSpotBooking = (bookingId) => ({
    type: BOOKINGS_DELETE_SPOT_BOOKING,
    payload: bookingId
});


/***************************** THUNKS (API) ******************************/
export const thunkCreateSingleBooking = (spotId, createBookingData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(createBookingData)
    });
    if (response.ok) {
        const newBooking = await response.json();
        dispatch(actionCreateSingleBooking(newBooking));
        return newBooking;
    };
};

export const thunkReadUserBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok) {
        const userBookings = await response.json();
        dispatch(actionReadUserBookings(userBookings));
        return userBookings;
    };
};

export const thunkReadUserReservations = () => async (dispatch) => {
    console.log("reach")
    const response = await csrfFetch(`/api/reservations`);
    if (response.ok) {
        const userReservations = await response.json();
        console.log("userReservations", userReservations)
        dispatch(actionReadUserBookings(userReservations));
        return userReservations;
    };
};

export const thunkReadSpotReservations = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (response.ok) {
        const spotReservations = await response.json();
        dispatch(actionReadSpotReservations(spotReservations));
        return spotReservations;
    };
};

export const thunkUpdateSpotBooking = (bookingId, updateBookingData) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(updateBookingData)
    });
    if (response.ok) {
        const updateBooking = await response.json();
        dispatch(actionUpdateSpotBooking(updateBooking));
        return updateBooking;
    }
}

export const thunkDeleteSpotBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSpotBooking(bookingId));
        return;
    };
};


/***************************** STATE SHAPE *******************************/
const initialState = {
    userBookings: {},
    userReservations: {},
    spotReservations: {},
}


/******************************* REDUCER *********************************/
const bookingsReducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

        case BOOKINGS_CREATE_SINGLE_BOOKING:
            // add new booking to User's existing bookings
            newState.userBookings = { ...state.userBookings };
            newState.userBookings[action.payload.id] = { ...action.payload };
            newState.userReservations = { ...state.userReservations };
            // add new booking to Spots's existing reservations
            newState.spotReservations = { ...state.spotReservations };
            newState.spotReservations[action.payload.id] = { ...action.payload }
            return newState

        case BOOKINGS_READ_USER_BOOKINGS:
            newState.userBookings = normalizeArray(action.payload.Bookings);
            newState.userReservations = { ...state.userReservations }
            newState.spotReservations = { ...state.spotReservations };
            return newState

        case BOOKINGS_READ_SPOT_RESERVATIONS:
            newState.userBookings = { ...state.userBookings };
            newState.userReservations = { ...state.userReservations }
            newState.spotReservations = normalizeArray(action.payload.Bookings);
            return newState

        case BOOKINGS_UPDATE_SPOT_BOOKING:
            // add updated booking to User's existing bookings
            newState.userBookings = { ...state.userBookings };
            newState.userBookings[action.payload.id] = {...action.payload};
            newState.userReservations = { ...state.userReservations }
            // add updated booking to Spots's existing reservations
            newState.spotReservations = { ...state.spotReservations };
            newState.spotReservations[action.payload.id] = { ...action.payload }
            return newState

        case BOOKINGS_DELETE_SPOT_BOOKING:
            // add updated booking to User's existing bookings
            newState.userBookings = {...state.userBookings};
            delete newState.userBookings[action.payload]
            newState.userReservations = {...state.userReservations};
            // deleting from spotReservations is not necessary
            // since delete happens on a different page that does not util this thunk
            // spotReservations will update when that page is revisited
            newState.spotReservations = {...state.spotReservations};
            return newState

        default:
            return state
    }
}


/******************************** EXPORTS ********************************/
export default bookingsReducer;
