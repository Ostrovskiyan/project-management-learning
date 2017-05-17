import {CREATE_PROJECT, UPDATE_PROJECT} from "../actions/projects";
const projects = (state = {list: []}, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: action.id,
                        name: action.name,
                        status: action.status,
                    }
                ]
            };
        case UPDATE_PROJECT:
            let newList = state.list.map(project => project.id === action.project.id ? action.project : project);
            return {
                ...state,
                list: newList
            };
        default:
            return state;
    }
};

export default projects;