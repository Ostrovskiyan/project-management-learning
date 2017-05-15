import {idGenerator} from "../util/generators";
export const CREATE_PROJECT = "CREATE_PROJECT";

let gen = idGenerator();

const createProjectAction = (id, name) => {
    return {
        type: CREATE_PROJECT,
        id,
        name
    }
};

export function createProject(name) {
    return dispatch => {
        dispatch(createProjectAction(gen.next().value, name));
    }
}