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

const successLogin = (name, surname, avatar) => {
    return {
        type: SUCCESS_LOGIN,
        name,
        surname,
        avatar
    }
};

const unsuccessLogin = () => {
    return {
        type: UNSUCCESS_LOGIN
    }
};

export const logout = () => {
    localStorage.removeItem("authToken");
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
                let name = "johan";
                let surname = "doe";
                let avatar = "/images/avatars/example.jpg";
                dispatch(successLogin(name, surname, avatar));
            } else {
                dispatch(unsuccessLogin());
            }
        }, 500);
    }
}