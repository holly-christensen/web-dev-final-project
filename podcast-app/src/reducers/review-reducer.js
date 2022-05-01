import {
    CREATE_REVIEW,
    DELETE_REVIEW,
    UPDATE_REVIEW,
    FIND_ALL_REVIEWS,
    FIND_REVIEW_BY_ID
} from "../actions/review-actions.js";
import initialState from "../initialState";

const reviewsReducer = (state = initialState.reviews, action) => {
    let result;
    switch (action.type) {
        case CREATE_REVIEW:
            result =  [
                ...state,
                action.review
            ];
            return result;
        case FIND_ALL_REVIEWS:
            return action;
        case FIND_REVIEW_BY_ID:
            return action.review;
        case DELETE_REVIEW:
            result =  state.filter(
                review => review._id !== action.review._id);
            return result;
        case UPDATE_REVIEW:
            result = state.map(
                review => review._id === action.review._id ?
                    action.review : review);
            return result;
        default: {
            return state.reviews || initialState.reviews;
        }
    }
}
export default reviewsReducer;