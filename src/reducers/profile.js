import {LOGIN, LOGOUT, SUCCESS_LOGIN, UNSUCCESS_LOGIN} from "../actions/profile";

const profile = (state = {}, action) => {
    let authorized = !!localStorage.getItem("authToken");
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: action.login,
                password: action.password,
                logining: true,
                authorized : false
            };
        case SUCCESS_LOGIN:
            return {
                login: state.login,
                password: state.password,
                logining: false,
                authorized: true,
            };
        case UNSUCCESS_LOGIN:
            return {
                login: state.login,
                password: state.password,
                loginFailMessage: "Введите действующий адрес эл. почты.",
                logining: false,
                authorized: false
            };
        case LOGOUT:
            return {
                ...state,
                authorized: false
            };
        default:
            return {
                ...state,
                authorized
            };
    }
};

export default profile;