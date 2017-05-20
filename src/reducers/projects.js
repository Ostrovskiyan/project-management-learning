import {CREATE_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT} from "../actions/projects";
const projects = (state = {list: []}, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.project,
                ]
            };
        case UPDATE_PROJECT:
            return {
                ...state,
                list: state.list.map(project => project.id === action.project.id ? action.project : project),
            };
        case REMOVE_PROJECT:
            return {
                ...state,
                list: state.list.filter(project => project.id !== action.id),
            };
        default:
            return state;
    }
};

export default projects;