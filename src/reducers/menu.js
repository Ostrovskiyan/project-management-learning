import {CLICK_MENU_ITEM} from "../actions/menu";

const menu = (state = {}, action) => {
    switch (action.type) {
        case CLICK_MENU_ITEM:
            return {
                selectedItemId: action.selectedItemId
            };
        default:
            return state;
    }
};

export default menu;