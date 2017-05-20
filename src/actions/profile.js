import {getByToken, loginViaApi} from "../api/api";
export const LOGIN = 'LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const USER_INFO = 'USER_INFO';
export const UNSUCCESSFUL_LOGIN = 'UNSUCCESSFUL_LOGIN';
export const LOGOUT = 'LOGOUT';

const login = () => {
    return {
        type: LOGIN,
    }
};

const successLogin = (token) => {
    return {
        type: SUCCESS_LOGIN,
        token
    }
};

export const logout = () => {
    localStorage.setItem("authToken", undefined);
    return {
        type: LOGOUT
    }
};

export function processLogining(loginValue, passwordValue) {
    return dispatch => {
        dispatch(login());
        new Promise((resolve, reject) => {
            let token = loginViaApi(loginValue, passwordValue);
            if (token) {
                localStorage.setItem("authToken", token);
                resolve(token);
            } else {
                reject();
            }
        }).then(token => dispatch(successLogin(token)))
            .catch(error => dispatch({
                type: UNSUCCESSFUL_LOGIN,
                login: loginValue,
                password: passwordValue,
            }));
    }
}

export function getUser(token) {
    return dispatch => {
        new Promise((resolve, reject) => {
            let user = getByToken(token);
            if(user) {
                resolve(user);
            } else {
                reject();
            }
        }).then(user => dispatch({
            type: USER_INFO,
            user,
        })).catch(error => dispatch(logout()));
    }
}