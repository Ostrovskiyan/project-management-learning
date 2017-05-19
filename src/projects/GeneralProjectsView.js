import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import AddIssue from "../components/new-issue/AddIssue";
import WrappedContainer from "../general/wrapped-container/WrappedContainer";
import IssueItem from "../components/issue-item/IssueItem";
import {forLater, forNextWeek, forThisWeek, forToday} from "../util/filters";
import ProjectMenu from "./components/ProjectMenu";
import FilterPanel from "./components/FilterPanel";

class GeneralProjectsView extends Component {

    toIssueItemList(issues, filterFunction) {
        let {
            selectedIssueId,
            projects,
            project,
            currentPath,
        } = this.props;
        return filterFunction(issues).map(issue => {
            let projectName = project ? project.name : undefined;
            if(!projectName && issue.projectId !== undefined) {
                projectName = projects.filter(project => project.id === issue.projectId)[0].name;
            }
            return (<IssueItem issue={issue}
                               projectName={projectName}
                               key={issue.id}
                               to={`${currentPath}/issues/${issue.id}`}
                               selected={selectedIssueId === issue.id.toString()}
                               projectView/>);
        })
    }

    render() {
        let {
            issues,
            headerText,
            fullContent,
            currentPath,
            selectedProjectMenuItem,
        } = this.props;

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
                <ProjectMenu basePath={currentPath} selectedItem={selectedProjectMenuItem}/>
                <FilterPanel/>
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

export
default
GeneralProjectsView;