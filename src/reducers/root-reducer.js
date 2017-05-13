import {combineReducers} from "redux";
import profile from "./profile";
import issues from "./issues";

const rootReducer = combineReducers({
    profile,
    issues
});

export default rootReducer;
