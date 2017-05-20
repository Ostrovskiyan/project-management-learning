import {createProject as createProjectApi} from "../api/api";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";

export const createProjectAction = (project) => {
    return {
        type: CREATE_PROJECT,
        project,
    }
};

export function createProject(name, token) {
    return dispatch => {
        new Promise((resolve) => resolve(createProjectApi(name, token)))
            .then(project => dispatch(createProjectAction(project)));
    }
}

export const updateProject = (project) => {
    return {
        type: UPDATE_PROJECT,
        project,
    }
};

export const removeProject = (id) => {
    return {
        type: REMOVE_PROJECT,
        id,
    }
};