import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import UnderlineMenu from "../general/underline-menu/UnderlineMenu";
import AddIssue from "../components/new-issue/AddIssue";
import WrappedContainer from "../general/wrapped-container/WrappedContainer";
import IssueItem from "../components/issue-item/IssueItem";
import {forLater, forNextWeek, forThisWeek, forToday} from "../util/filters";
import IssueStatusDropdown from "../components/issue-status-dropdown/IssueStatusDropdown";

const Menu = {
    LIST: "LIST",
    TABLE: "TABLE",
    TIMELINE: "TIMELINE",
};

class GeneralProjectsView extends Component {

    toIssueItemList(issues, filterFunction) {
        let {
            selectedIssueId,
        } = this.props;
        return filterFunction(issues).map(issue => <IssueItem issue={issue}
                                                              key={issue.id}
                                                              to={`/projects/issues/${issue.id}`}
                                                              selected={selectedIssueId === issue.id.toString()}
                                                              projectView/>);
    }

    render() {
        let {
            issues,
            headerText,
            fullContent,
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
                                      content={this.toIssueItemList(issues, forToday)}
                                      open/>
        }

        if (forThisWeek(issues).length > 0) {
            thisWeek = <WrappedContainer headerText="Эта неделя"
                                         content={this.toIssueItemList(issues, forThisWeek)}
                                         open/>
        }

        if (forNextWeek(issues).length > 0) {
            nextWeek = <WrappedContainer headerText="Следующая неделя"
                                         content={this.toIssueItemList(issues, forNextWeek)}
                                         open/>
        }

        if (forLater(issues).length > 0) {
            later = <WrappedContainer headerText="Позже"
                                      content={this.toIssueItemList(issues, forLater)}
                                      open/>
        }

        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${fullContent ? mainStyles.FullContent : mainStyles.HalfContent} ${styles.GeneralView} col-xs-5`}>
                <div className={styles.GeneralHeader}>
                    {headerText ? headerText : "Проекты"}
                </div>
                <UnderlineMenu options={menuOptions} selected={Menu.LIST}/>
                <div className={styles.FilterHeader}>
                    <IssueStatusDropdown id="filter-status-dropdown"
                                         wrapperStyle={styles.FilterDropdown}
                                         button={() => (
                                             <div className={styles.FilterText}>
                                                 СТАТУС: Любой
                                             </div>
                                         )}/>
                    <div className={styles.FilterText}>
                        ИСПОЛНИТЕЛЬ: Все
                    </div>
                </div>
                <AddIssue inactiveStyle={styles.InactiveAddIssue} activeStyle={styles.ActiveAddIssue}/>
                <div className={styles.Wrappers}>
                    {today}
                    {thisWeek}
                    {nextWeek}
                    {later}
                </div>
            </div>
        );
    }
}

export default GeneralProjectsView;