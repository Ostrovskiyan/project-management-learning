export const CLICK_ADD_ISSUE = "CLICK_ADD_ISSUE";
export const ADD_ISSUE = "ADD_ISSUE";
export const ADD_ISSUE_END = "ADD_ISSUE_END";

export const clickAddIssue = () => {
    return {
        type: CLICK_ADD_ISSUE
    }
};

const addIssue = (issueName) => {
    return {
        type: ADD_ISSUE,
        issueName
    }
};

export const addIssueEnd = () => {
    return {
        type: ADD_ISSUE_END
    }
};

export function processAddIssue(issueName) {
    return dispatch => {
        dispatch(addIssueEnd());
        if (issueName !== "") {
            console.log(issueName);
            dispatch(addIssue(issueName));
        }
    }
}