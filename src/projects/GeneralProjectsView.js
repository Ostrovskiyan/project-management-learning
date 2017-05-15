import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import {Route, Switch} from "react-router-dom";
import UnderlineMenu from "../general/underline-menu/UnderlineMenu";
import AddIssue from "../components/new-issue/AddIssue";
import WrappedContainer from "../general/wrapped-container/WrappedContainer";
import {connect} from "react-redux";
import IssueItem from "../issues/issue-item/IssueItem";
import {forLater, forNextWeek, forThisWeek, forToday} from "../util/issue-filters";

const Menu = {
    LIST: "LIST",
    TABLE: "TABLE",
    TIMELINE: "TIMELINE",
};

class GeneralProjectsView extends Component {

    static toIssueItemList(issues, filterFunction) {
        return filterFunction(issues).map(issue => <IssueItem issue={issue} key={issue.id} projectView/>);
    }

    render() {
        let {
            issues,
        } = this.props;
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

        let today = null;
        let thisWeek = null;
        let nextWeek = null;
        let later = null;

        if (forToday(issues).length > 0) {
            today = <WrappedContainer headerText="Сегодня"
                                      content={GeneralProjectsView.toIssueItemList(issues, forToday)}
                                      open/>
        }

        if (forThisWeek(issues).length > 0) {
            thisWeek = <WrappedContainer headerText="Эта неделя"
                                         content={GeneralProjectsView.toIssueItemList(issues, forThisWeek)}
                                         open/>
        }

        if (forNextWeek(issues).length > 0) {
            nextWeek = <WrappedContainer headerText="Следующая неделя"
                                         content={GeneralProjectsView.toIssueItemList(issues, forNextWeek)}
                                         open/>
        }

        if (forLater(issues).length > 0) {
            later = <WrappedContainer headerText="Позже"
                                         content={GeneralProjectsView.toIssueItemList(issues, forLater)}
                                         open/>
        }

        return (
            <div className={mainStyles.FullHeight}>
                <div
                    className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} ${styles.GeneralView} col-xs-5`}>
                    <div className={styles.GeneralHeader}>Проекты</div>
                    <UnderlineMenu options={menuOptions} selected={Menu.LIST}/>
                    <div className={styles.FilterHeader}>
                        <div>СТАТУС: Любой</div>
                        <div>ИСПОЛНИТЕЛЬ: Все</div>
                    </div>
                    <AddIssue inactiveStyle={styles.InactiveAddIssue} activeStyle={styles.ActiveAddIssue}/>
                    <div className={styles.Wrappers}>
                        {today}
                        {thisWeek}
                        {nextWeek}
                        {later}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        issues: state.issues.list,
    };
}

export default connect(mapStateToProps)(GeneralProjectsView);