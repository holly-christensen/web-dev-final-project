import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    FIND_ALL_COMMENTS,
    FIND_COMMENT_BY_ID
} from "../actions/comment-actions.js";
const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_COMMENT:
            const newComment = {
                episodeId: action.episodeId,
                userId: action.userId,
                body: action.comment,
                datePosted: new Date().toLocaleString() + "",
                likes: {
                    count: 0,
                    likedBy: []
                },
                dislikes: 0
            }
            return [
                ...state,
                newComment
            ];
        case FIND_ALL_COMMENTS:
            return action.comments;
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
            return {
                ...state
            }
        }
    }
}
export default commentsReducer;