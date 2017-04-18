import {combineReducers} from "redux";
import profile from "./profile";
import menu from "./menu";
import issues from "./issues";

const rootReducer = combineReducers({
    profile,
    menu,
    issues
});

export default rootReducer;
