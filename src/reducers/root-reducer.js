import {combineReducers} from "redux";
import profile from "./profile";
import issues from "./issues";
import users from "./users";

const rootReducer = combineReducers({
    profile,
    issues,
    users
});

export default rootReducer;
