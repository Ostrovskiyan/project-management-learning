import {ADD_ISSUE, UPDATE_ISSUE} from "../actions/issues";
import moment from "moment";

let initialIssueId = 0;

const issues = (state = {list: []}, action) => {
    switch (action.type) {
        case ADD_ISSUE:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: initialIssueId++,
                        name: action.issueName,
                        startDate: moment().startOf("day"),
                        endDate: moment().startOf("day"),
                        creatingDate: moment(),
                        author: action.author,
                        assigned: action.assigned,
                        subtasks: [],
                    }
                ]
            };
        case UPDATE_ISSUE:
            let newList = state.list.map(issue => issue.id === action.issue.id ? action.issue : issue);
            return {
                ...state,
                list: newList
            };
        default:
            return state;
    }
};

export default issues;