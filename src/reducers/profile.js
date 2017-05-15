import {LOGIN, LOGOUT, SUCCESS_LOGIN, UNSUCCESS_LOGIN} from "../actions/profile";
import {getUser} from "../api/api";

const profile = (state = {}, action) => {
    let authorized = !!localStorage.getItem("authToken");
    let user = {};
    if (authorized) {
        user = getUser();
    }
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: action.login,
                password: action.password,
                logining: true,
                authorized: false
            };
        case SUCCESS_LOGIN:
            return {
                login: state.login,
                password: state.password,
                logining: false,
                authorized: true,
                name: action.name,
                surname: action.surname,
                avatar: action.avatar,
                email: action.email,
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
                ...user,
                authorized
            };
    }
};

export default profile;