import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    FIND_ALL_COMMENTS,
    FIND_COMMENT_BY_ID
} from "../actions/comment-actions.js";
import initialState from "../initialState";

const commentsReducer = (state = initialState.comments, action) => {
    switch (action.type) {
        case CREATE_COMMENT:
            return [
                ...state,
                action.comment
            ];
        case FIND_ALL_COMMENTS:
            return action;
        case FIND_COMMENT_BY_ID:
            return action.comment;
        case DELETE_COMMENT:
            return state.filter(
                comment => comment._id !== action.comment._id);
        case UPDATE_COMMENT:
            return state.map(
                comment => comment._id === action.comment._id ?
                    action.comment : comment);
        default: {
            return state.comments || initialState.comments;
        }
    }
}
export default commentsReducer;