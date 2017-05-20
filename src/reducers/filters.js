import {FILTER_ISSUES_BY_EXECUTOR_PROJECT_VIEW, FILTER_ISSUES_BY_STATUS_PROJECT_VIEW} from "../actions/filters";
const filters = (state = {}, action) => {
    switch (action.type) {
        case FILTER_ISSUES_BY_STATUS_PROJECT_VIEW:
            return {
                ...state,
                issueStatusFilterProjectView: action.filter,
            };
        case FILTER_ISSUES_BY_EXECUTOR_PROJECT_VIEW:
            return {
                ...state,
                issueExecutorFilterProjectView: action.userId,
            };
        default:
            return state;
    }
};

export default filters;