import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import {Route, Switch} from "react-router-dom";
import UnderlineMenu from "../general/underline-menu/UnderlineMenu";
import AddIssue from "../components/new-issue/AddIssue";
import WrappedContainer from "../general/wrapped-container/WrappedContainer";

const Menu = {
  LIST:"LIST",
  TABLE:"TABLE",
  TIMELINE:"TIMELINE",
};

class GeneralProjectsView extends Component {

    render() {

        let menuOptions = [
            {
                key: Menu.LIST,
                text: "СПИСОК",
            },
            {
                key: Menu.TABLE,
                text: "ТАБЛИЦА",
            },
            {
                key: Menu.TIMELINE,
                text: "ВРЕМЕННАЯ ШКАЛА",
            }
        ];
        return (<div className={mainStyles.FullHeight}>
                    <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} ${styles.GeneralView} col-xs-5`}>
                        <div className={styles.GeneralHeader}>Проекты</div>
                        <UnderlineMenu options={menuOptions} selected={Menu.LIST}/>
                        <div className={styles.FilterHeader}>
                            <div>СТАТУС: Любой</div>
                            <div>ИСПОЛНИТЕЛЬ: Все</div>
                        </div>
                        <AddIssue inactiveStyle={styles.InactiveAddIssue} activeStyle={styles.ActiveAddIssue}/>
                        <WrappedContainer headerText="Завтра" open/>
                    </div>
                </div>);
    }
}

export default GeneralProjectsView;