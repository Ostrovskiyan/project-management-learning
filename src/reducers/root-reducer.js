import {combineReducers} from "redux";
import profile from "./profile";
import menu from "./menu";

const rootReducer = combineReducers({
    profile,
    menu
});

export default rootReducer;
