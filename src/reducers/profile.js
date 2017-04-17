import {LOGIN, LOGOUT, SUCCESS_LOGIN, UNSUCCESS_LOGIN} from "../actions/profile";

const profile = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: action.login,
                password: action.password,
                logining: true
            };
        case SUCCESS_LOGIN:
            return {
                login: state.login,
                password: state.password,
                authorized: true,
                logining: false
            };
        case UNSUCCESS_LOGIN:
            return {
                login: state.login,
                password: state.password,
                loginFailMessage: "Введите действующий адрес эл. почты.",
                logining: false
            };
        case LOGOUT:
            return {
              authorized: false
            };
        default:
            return state;
    }
};

export default profile;