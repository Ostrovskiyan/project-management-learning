import {LOGIN, LOGOUT, SUCCESS_LOGIN, UNSUCCESSFUL_LOGIN, USER_INFO} from "../actions/profile";

const profile = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                logining: true,
            };
        case SUCCESS_LOGIN:
            return {
                token: action.token,
            };
        case UNSUCCESSFUL_LOGIN:
            return {
                login: action.login,
                password: action.password,
            };
        case LOGOUT:
            return {};
        case USER_INFO:
            return {
                token: state.token,
                user: action.user,
            };
        default:
            return state;
    }
};

export default profile;