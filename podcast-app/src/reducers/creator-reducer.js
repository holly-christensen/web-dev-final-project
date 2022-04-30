import {
    CREATE_CREATOR,
    DELETE_CREATOR,
    UPDATE_CREATOR,
    FIND_ALL_CREATORS,
    FIND_CREATOR_BY_ID, FIND_CREATOR_BY_USERID
} from "../actions/creator-actions.js";
import initialState from "../initialState";

const creatorsReducer = (state = initialState.creators, action) => {
    switch (action.type) {
        case CREATE_CREATOR:
            return [
                ...state,
                action.creator,
            ];
        case FIND_ALL_CREATORS:
            return action.creators;
        case FIND_CREATOR_BY_ID:
            return action.creator
        case FIND_CREATOR_BY_USERID:
            return action.creator
        case DELETE_CREATOR:
            return state.filter(
                creator => creator._id !== action.creator._id);
        case UPDATE_CREATOR:
            return state.map(
                creator => creator._id === action.creator._id ?
                    action.creator : creator);
        default: {
            return state.creators || initialState.creators;
        }
    }
}
export default creatorsReducer;