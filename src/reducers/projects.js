import {CREATE_PROJECT} from "../actions/projects";
const projects = (state = {list:[]}, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: action.id,
                        name: action.name
                    }
                ]
            };
        default:
            return state;
    }
};

export default projects;