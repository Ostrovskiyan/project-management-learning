export const SELECT_MY_WORK = "SELECT_MY_WORK";
export const SELECT_PROJECTS_TAB = "SELECT_PROJECTS_TAB";
export const SELECT_PROJECT = "SELECT_PROJECT";

export const selectMyWork = () => {
    return {
        type: SELECT_MY_WORK
    }
};

export const selectProjectsTab = () => {
    return {
        type: SELECT_PROJECTS_TAB
    }
};

export const selectProject = (id) => {
    return {
        type: SELECT_PROJECT,
        selectedItemId: id
    }
};
