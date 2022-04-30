import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    FIND_ALL_COMMENTS,
    FIND_COMMENT_BY_ID
} from "../actions/comment-actions.js";
import initialState from "../initialState";

const commentsReducer = (state = initialState.comments, action) => {
    let result;
    switch (action.type) {
        case CREATE_COMMENT:
            result =  [
                ...state,
                action.comment
            ];
            return result;
        case FIND_ALL_COMMENTS:
            return action;
        case FIND_COMMENT_BY_ID:
            return action.comment;
        case DELETE_COMMENT:
            result =  state.filter(
                comment => comment._id !== action.comment._id);
            return result;
        case UPDATE_COMMENT:
            result = state.map(
                comment => comment._id === action.comment._id ?
                    action.comment : comment);
            return result;
        default: {
            return state.comments || initialState.comments;
        }
    }
}
export default commentsReducer;