import {SELECT_MY_WORK, SELECT_PROJECTS_TAB} from "../actions/menu";

const menu = (state = {}, action) => {
    switch (action.type) {
        case SELECT_MY_WORK:
            return {
                myWorkSelected: true
            };
        case SELECT_PROJECTS_TAB:
            return {
                projectsTabSelected: true
            };
        default:
            return state;
    }
};

export default menu;