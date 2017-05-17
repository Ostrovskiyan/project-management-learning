import {idGenerator} from "../util/generators";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";

let gen = idGenerator();

const createProjectAction = (id, name) => {
    return {
        type: CREATE_PROJECT,
        id,
        name,
        status: "YELLOW",
    }
};

export function createProject(name) {
    return dispatch => {
        dispatch(createProjectAction(gen.next().value, name));
    }
}

export const updateProject = (project) => {
    return {
        type: UPDATE_PROJECT,
        project,
    }
};