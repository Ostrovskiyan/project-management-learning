import {ADD_ISSUE, ADD_ISSUE_END, CLICK_ADD_ISSUE} from "../actions/issues";

let initialIssueId = 0;

const issues = (state = {list: []}, action) => {
    switch (action.type) {
        case CLICK_ADD_ISSUE:
            return {
                ...state,
                addingIssue: true
            };
        case ADD_ISSUE_END:
            return {
                ...state,
                addingIssue: false
            };
        case ADD_ISSUE:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: initialIssueId++,
                        name: action.issueName,
                        startDate: new Date(),
                        endDate: new Date(),
                        authorAvatar: action.authorAvatar,
                        assignedAvatar: action.assignedAvatar
                    }
                ]
            };
        default:
            return state;
    }
};

export default issues;