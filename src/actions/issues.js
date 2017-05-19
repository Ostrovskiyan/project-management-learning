import {createIssueViaApi, createProject, getUser} from "../api/api";
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


export function createIssue(name) {
    return dispatch => {
        new Promise((resolve) => resolve(getUser()))
            .then(user => {
                return [
                    {
                        ...user
                    },
                    {
                        ...user
                    },
                ]
            }).then(users => createIssueViaApi(name, users[0], users[1]))
            .then(issue => dispatch(addIssue(issue)));
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

export const removeIssue = (id) => {
    return {
        type: REMOVE_ISSUE,
        id,
    }
};