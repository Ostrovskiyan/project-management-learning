import {getUser} from "../api/api";
export const LOGIN = 'LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const UNSUCCESS_LOGIN = 'UNSUCCESS_LOGIN';
export const LOGOUT = 'LOGOUT';

const login = (login, password) => {
    return {
        type: LOGIN,
        login,
        password
    }
};

const successLogin = ({name, surname, avatar, email}) => {
    return {
        type: SUCCESS_LOGIN,
        name,
        surname,
        avatar,
        email
    }
};

const unsuccessLogin = () => {
    return {
        type: UNSUCCESS_LOGIN
    }
};

export const logout = () => {
    localStorage.clear();
    return {
        type: LOGOUT
    }
};

export function proccessLogining(loginValue, passwordValue) {
    return dispatch => {
        dispatch(login(loginValue, passwordValue));
        setTimeout(() => {
            if (loginValue === "alik" && passwordValue === "1234") {
                localStorage.setItem("authToken", "sometoken");
                let user = getUser();
                dispatch(successLogin(user));
            } else {
                dispatch(unsuccessLogin());
            }
        }, 500);
    }
}