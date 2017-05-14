import {getUsers as getUsersApi} from "../api/api";
export const GET_USERS = "GET_USERS";

const getUsersAction = () => {
    let users = getUsersApi();
    return {
        type: GET_USERS,
        users
    }
};

export function getUsers() {
    return dispatch => {
        dispatch(getUsersAction());
    }
}