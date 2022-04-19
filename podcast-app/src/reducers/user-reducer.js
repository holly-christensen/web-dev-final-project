import {
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
    FIND_ALL_USERS,
    FIND_USER_BY_ID
} from "../actions/user-actions.js";
import initialState from "../initialState";

const usersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case CREATE_USER:
            console.log('user state: '+JSON.stringify(state))
            console.log('user to add: '+JSON.stringify(action.user))
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
            return state.map(
                user => user._id === action.user._id ?
                    action.user : user);
        default: {
            console.log('user state in default: '+JSON.stringify(state))

            return state.users || initialState.users;
        }
    }
}
export default usersReducer;