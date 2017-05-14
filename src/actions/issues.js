import {getUser} from "../api/api";
export const ADD_ISSUE = "ADD_ISSUE";
export const UPDATE_ISSUE = "UPDATE_ISSUE";

const addIssue = (issueName) => {
    let user = getUser();
    let author = {
        ...user
    };
    let assigned = {
        ...user
    };
    return {
        type: ADD_ISSUE,
        issueName,
        author,
        assigned
    }
};

export function processAddIssue(issueName) {
    return dispatch => {
        if (issueName !== "") {
            dispatch(addIssue(issueName));
        }
    }
}

export const updateIssue = (issue) => {
    return {
        type: UPDATE_ISSUE,
        issue
    }
};