import {createProject as createProjectApi} from "../api/api";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";

export const createProjectAction = ({id, name, status}) => {
    return {
        type: CREATE_PROJECT,
        id,
        name,
        status,
    }
};

export function createProject(name) {
    return dispatch => {
        new Promise((resolve) => resolve(createProjectApi(name)))
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