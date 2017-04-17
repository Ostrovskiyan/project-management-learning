export const CLICK_MENU_ITEM = "CLICK_MENU_ITEM";

export const clickMenuItem = (id) => {
    return {
        type: CLICK_MENU_ITEM,
        selectedItemId: id
    }
};