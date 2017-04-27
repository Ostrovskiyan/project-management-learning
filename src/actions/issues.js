import {getUser} from "../api/api";
export const CLICK_ADD_ISSUE = "CLICK_ADD_ISSUE";
export const ADD_ISSUE = "ADD_ISSUE";
export const ADD_ISSUE_END = "ADD_ISSUE_END";
export const SELECT_ISSUE = "SELECT_ISSUE";

export const clickAddIssue = () => {
    return {
        type: CLICK_ADD_ISSUE
    }
};

const addIssue = (issueName) => {
    let user = getUser();
    let authorAvatar = user.avatar;
    let assignedAvatar = user.avatar;
    return {
        type: ADD_ISSUE,
        issueName,
        authorAvatar,
        assignedAvatar
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

export const selectIssuue = (id) => {
    return {
        type: SELECT_ISSUE,
        id
    }
};