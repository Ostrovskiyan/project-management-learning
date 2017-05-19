import {ADD_ISSUE, REMOVE_ISSUE, UPDATE_ISSUE} from "../actions/issues";

const issues = (state = {list: []}, action) => {
    switch (action.type) {
        case ADD_ISSUE:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        ...action.issue,
                    }
                ]
            };
        case UPDATE_ISSUE:
            let newList = state.list.map(issue => issue.id === action.issue.id ? action.issue : issue);
            return {
                ...state,
                list: newList
            };
        case REMOVE_ISSUE:
            return {
                ...state,
                list: state.list.filter(issue => issue.id !== action.id),
            };
        default:
            return state;
    }
};

export default issues;