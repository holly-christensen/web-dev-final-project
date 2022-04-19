import {
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
    FIND_ALL_USERS,
    FIND_USER_BY_ID
} from "../actions/user-actions.js";

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_USER:
            console.log(state);
            return [
                ...state,
                action.user,
            ];
        case FIND_ALL_USERS:
            return action.users;
        case FIND_USER_BY_ID:
            return action.user;
        case DELETE_USER:
            return state.filter(
                user => user._id !== action.user._id);
        case UPDATE_USER:
            return state.map(
                user => user._id === action.user._id ?
                    action.user : user);
        default: {
            return {
                ...state
            }
        }
    }
}
export default usersReducer;