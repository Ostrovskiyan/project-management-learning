import {createIssueViaApi, createProject, getByToken} from "../api/api";
import {createProjectAction} from "./projects";
export const ADD_ISSUE = "ADD_ISSUE";
export const UPDATE_ISSUE = "UPDATE_ISSUE";
export const REMOVE_ISSUE = "REMOVE_ISSUE";

const addIssue = (issue) => {
    return {
        type: ADD_ISSUE,
        issue,
    }
};


export function createIssue(name, token) {
    return dispatch => {
        new Promise((resolve) => resolve(getByToken(token)))
            .then(user => createIssueViaApi(name, user))
            .then(issue => dispatch(addIssue(issue)));
    }
}

export const updateIssue = (issue) => {
    return {
        type: UPDATE_ISSUE,
        issue,
    }
};

export const addIssueToNewProject = (issue, projectName, token) => {
    return dispatch => {
        new Promise((resolve) => resolve(createProject(projectName, token)))
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

export const removeIssue = (id) => {
    return {
        type: REMOVE_ISSUE,
        id,
    }
};