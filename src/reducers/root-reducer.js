import {combineReducers} from "redux";
import profile from "./profile";
import issues from "./issues";
import users from "./users";
import projects from "./projects";
import filters from "./filters";

const rootReducer = combineReducers({
    profile,
    issues,
    users,
    projects,
    filters,
});

export default rootReducer;
