/***************************** IMPORTS *****************************/
import { csrfFetch } from "./csrf";
import { normalizeArray } from "../component-resources/index";


/****************************** TYPES ******************************/
const REVIEWS_CREATE_SINGLE_REVIEW = 'reviews/CREATE_SINGLE_REVIEW';
const REVIEWS_READ_USER_REVIEWS = 'reviews/READ_USER_REVIEWS';
const REVIEWS_DELETE_SINGLE_REVIEW = 'reviews/DELETE_SINGLE_REVIEW';


/************************* ACTION CREATORS *************************/
export const actionCreateSingleReview = (newReview) => ({
    type: REVIEWS_CREATE_SINGLE_REVIEW,
    payload: newReview
})

export const actionReadUserReviews = (reviews) => ({
    type: REVIEWS_READ_USER_REVIEWS,
    payload: reviews // Users: [array of objects]
});

export const actionDeleteSingleReview = (reviewId) => ({
    type: REVIEWS_DELETE_SINGLE_REVIEW,
    payload: reviewId
});


/*************************** THUNKS (API) ***************************/
export const thunkCreateSingleReview = (spotId, data) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(actionCreateSingleReview(newReview));
    }
}

export const thunkReadUserReviews = () => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/current`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(actionReadUserReviews(reviews.Reviews))
        return response;
    }
}

export const thunkDeleteSingleReview = (reviewId) => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete',
    });

    if (response.ok) {
        dispatch(actionDeleteSingleReview(reviewId))
        return
    }
}


/*************************** STATE SHAPE ****************************/
const initialState = {
    reviews: {}
}


/***************************** REDUCER ******************************/
const reviewsReducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

        case REVIEWS_CREATE_SINGLE_REVIEW:
            newState[action.payload.id] = {...action.payload.id}
            return newState

        case REVIEWS_READ_USER_REVIEWS:
            let reviewsRaw = action.payload
            reviewsRaw.forEach(reviewObj => {
                    reviewObj.User = { ...reviewObj.User };
                    reviewObj.Spot = { ...reviewObj.Spot };
                    const images = []
                    reviewObj.ReviewImages.forEach(obj => images.push({...obj}))
                    reviewObj.ReviewImages = images
            })
            newState = normalizeArray(reviewsRaw)
            return newState

        case REVIEWS_DELETE_SINGLE_REVIEW:
            // copy nested structures??
            delete newState.reviews.reviewId
            return newState

        default:
            return state
    }
}


/***************************** EXPORTS *****************************/
export default reviewsReducer;
