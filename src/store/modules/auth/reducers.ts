import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, User} from "store/modules/auth/types";
import {USER_STORAGE_KEY} from "common/constants/userConstants";

const storageUser = localStorage.getItem(USER_STORAGE_KEY);

const user: User = storageUser ? JSON.parse(storageUser) : null;

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

function authReducers(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(payload));
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            localStorage.removeItem(USER_STORAGE_KEY);
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

export default authReducers;