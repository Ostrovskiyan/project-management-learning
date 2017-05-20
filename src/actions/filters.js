export const FILTER_ISSUES_BY_STATUS_PROJECT_VIEW = "FILTER_ISSUES_BY_STATUS_PROJECT_VIEW";
export const FILTER_ISSUES_BY_EXECUTOR_PROJECT_VIEW = "FILTER_ISSUES_BY_EXECUTOR_PROJECT_VIEW";

export const filterIssuesByStatus = (filter) => {
    return {
        type: FILTER_ISSUES_BY_STATUS_PROJECT_VIEW,
        filter
    }
};

export const filterIssuesByExecutor = (userId) => {
    return {
        type: FILTER_ISSUES_BY_EXECUTOR_PROJECT_VIEW,
        userId,
    }
};