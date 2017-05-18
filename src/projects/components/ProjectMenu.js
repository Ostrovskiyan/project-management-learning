import React from "react";
import UnderlineMenu from "../../general/underline-menu/UnderlineMenu";
import {Menu} from "../constants/constants";
import styles from "../Projects.css";

export default function ProjectMenu(props) {
    let {
        basePath,
        selectedItem,
        floatRight,
    } = props;

    let menuOptions = [
        {
            key: Menu.LIST,
            text: "СПИСОК",
            to: basePath,
        },
        {
            key: Menu.TABLE,
            text: "ТАБЛИЦА",
            to: basePath + "/table",
        },
        {
            key: Menu.TIMELINE,
            text: "ВРЕМЕННАЯ ШКАЛА",
            to: basePath + "/timeline",
        }
    ];

    return (
        <UnderlineMenu options={menuOptions} selected={selectedItem} withoutClickHandling menuStyle={floatRight ? styles.FloatRightMenu : ""}/>
    );
}