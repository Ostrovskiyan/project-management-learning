import {ADD_ISSUE_END, CLICK_ADD_ISSUE} from "../actions/issues";

const issues = (state = {}, action) => {
    switch (action.type) {
        case CLICK_ADD_ISSUE:
            return {
                addingIssue: true
            };
        case ADD_ISSUE_END:
            return {
                addingIssue: false
            };
        default:
            return state;
    }
};

export default issues;