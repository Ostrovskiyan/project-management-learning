import {getUser} from "../api/api";
export const CLICK_ADD_ISSUE = "CLICK_ADD_ISSUE";
export const ADD_ISSUE = "ADD_ISSUE";
export const ADD_ISSUE_END = "ADD_ISSUE_END";
export const UPDATE_ISSUE = "UPDATE_ISSUE";

export const clickAddIssue = () => {
    return {
        type: CLICK_ADD_ISSUE
    }
};

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

export const addIssueEnd = () => {
    return {
        type: ADD_ISSUE_END
    }
};

export function processAddIssue(issueName) {
    return dispatch => {
        if (issueName !== "") {
            dispatch(addIssue(issueName));
        }
        dispatch(addIssueEnd());
    }
}

export const updateIssue = (issue) => {
    return {
        type: UPDATE_ISSUE,
        issue
    }
};