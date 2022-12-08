/******************************** IMPORTS ********************************/
// local files
import { csrfFetch } from './csrf';


/********************************* TYPES *********************************/
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


/**************************** ACTION CREATORS ****************************/
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};


/***************************** THUNKS (API) ******************************/
export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, username, password, email } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

  export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};


/***************************** STATE SHAPE *******************************/
const initialState = { user: null };


/******************************* REDUCER *********************************/
const sessionReducer = (state = initialState, action) => {

  let newState;

  switch (action.type) {

    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;

    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;

    default:
      return state;
  }
};


/******************************** EXPORTS ********************************/
export default sessionReducer;
