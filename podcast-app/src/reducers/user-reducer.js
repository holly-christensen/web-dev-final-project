import {
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
    FIND_ALL_USERS,
    FIND_USER_BY_ID, SIGNUP_USER
} from "../actions/user-actions.js";
import initialState from "../initialState";

const usersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case CREATE_USER:
            return [
                ...state,
                action.user,
            ];
        case SIGNUP_USER:
            return [
                ...state,
                action.user,
            ];
        case FIND_ALL_USERS:
            return action;
        case FIND_USER_BY_ID:
            return action.user;
        case DELETE_USER:
            return state.filter(
                user => user._id !== action.user._id);
        case UPDATE_USER:
            const result = state.map(
                user => user._id === action.user._id ?
                    action.user : user);
            return result;
        default: {
            return state.users || initialState.users;
        }
    }
}
export default usersReducer;