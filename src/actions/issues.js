import {createProject, getUser} from "../api/api";
import {createProjectAction} from "./projects";
export const ADD_ISSUE = "ADD_ISSUE";
export const UPDATE_ISSUE = "UPDATE_ISSUE";

const addIssue = (issueName) => {
    let user = getUser();
    let author = {
        ...user
    };
    let assigned = {
        ...user
    };
    return {
        type: ADD_ISSUE,
        issueName,
        author,
        assigned
    }
};

export function processAddIssue(issueName) {
    return dispatch => {
        if (issueName !== "") {
            dispatch(addIssue(issueName));
        }
    }
}

export const updateIssue = (issue) => {
    return {
        type: UPDATE_ISSUE,
        issue
    }
};

export const addIssueToNewProject = (issue, projectName) => {
    return dispatch => {
        new Promise((resolve) => resolve(createProject(projectName)))
            .then(project => {
                dispatch(createProjectAction(project));
                return project;
            })
            .then(project => {
                let newIssue = {
                    ...issue,
                    projectId: project.id,
                };
                dispatch(updateIssue(newIssue));
            });
    }
};