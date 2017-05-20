import {GET_USERS} from "../actions/users";

const users = (state = {list:[]}, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                list: action.users
            };
        default:
            return state;
    }
};

export default users;