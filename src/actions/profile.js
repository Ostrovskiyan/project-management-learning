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

const successLogin = () => {
    return {
        type: SUCCESS_LOGIN
    }
};

const unsuccessLogin = () => {
    return {
        type: UNSUCCESS_LOGIN
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export function proccessLogining(loginValue, passwordValue) {
    return dispatch => {
        dispatch(login(loginValue, passwordValue));
        setTimeout(() => {
            if (loginValue === "alik" && passwordValue === "1234") {
                dispatch(successLogin());
            } else {
                dispatch(unsuccessLogin());
            }
        }, 500);
    }
}