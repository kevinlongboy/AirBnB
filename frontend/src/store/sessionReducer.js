import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

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

// Phase 2: Signup action
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
    console.log("REACH FROM LOGIN SESSION")
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    console.log("data from session/login:", data)
    dispatch(setUser(data));
  return response;
};

// Phase 1: Restore the session user
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  };

// Phase 3: Logout action
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

const initialState = { user: null };

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

export default sessionReducer;