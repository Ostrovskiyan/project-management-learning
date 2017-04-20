import {ADD_ISSUE, ADD_ISSUE_END, CLICK_ADD_ISSUE} from "../actions/issues";

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
        case ADD_ISSUE:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        name: action.issueName,
                        startDate: new Date(),
                        endDate: new Date()
                    }
                ]
            };
        default:
            return state;
    }
};

export default issues;