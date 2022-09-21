/************************* TYPES *************************/
const READ = 'reviews/READ';
const CREATE = 'reviews/CREATE';
const DELETE = 'reviews/DELETE';


/************************* ACTION CREATORS *************************/
export const actionRead = (reviews) => ({
    type: READ,
    payload: reviews
});

export const actionCreate = () => ({
    type: CREATE,
    payload: newReview
})

export const actionDelete = (review) => ({
    type: DELETE,
    payload: review
});


/************************* THUNKS (API) *************************/
export const thunkRead = () => async (dispatch) => {

    const response = await fetch(`api/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(actionRead(reviews))
    }
}

export const thunkCreate = (data) => async (dispatch) => {

    const response = await fetch(`api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(actionCreate(newReview));
    }
}

export const thunkDelete = (reviewId) => async (dispatch) => {

    const response = await fetch(`api/reviews/${reviewId}`);

    if (response.ok) {
        const review = await response.json();
        dispatch(actionDelete(review))
    }
}

const initialState = {
    reviews: []
}
/************************* REDUCER *************************/
const reviewsReducer = (state = initialState, action) => {

    const newState = {...state};

    switch (action.type) {

        case READ:
            return {
                ...state,
                reviews: action.payload
            }

        case CREATE:
            return {
                ...state,
                reviews: action.payload
            }

        case DELETE:
            delete newState[review.id]
            return newState
    }
}

export default reviewsReducer;
