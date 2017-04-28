import {ADD_ISSUE, ADD_ISSUE_END, CLICK_ADD_ISSUE, DESELECT_ISSUE, SELECT_ISSUE} from "../actions/issues";

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
                        creatingDate: new Date(),
                        author: action.author,
                        assigned: action.assigned,

                    }
                ]
            };
        case SELECT_ISSUE:
            return {
                ...state,
                selectedIssue : action.id
            };
        case DESELECT_ISSUE:
            return {
                ...state,
                selectedIssue : null
            };
        default:
            return state;
    }
};

export default issues;