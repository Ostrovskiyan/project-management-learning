import {combineReducers} from "redux";
import profile from "./profile";
import issues from "./issues";
import users from "./users";
import projects from "./projects";

const rootReducer = combineReducers({
    profile,
    issues,
    users,
    projects
});

export default rootReducer;
