import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import AddIssue from "../components/new-issue/AddIssue";
import WrappedContainer from "../general/wrapped-container/WrappedContainer";
import IssueItem from "../components/issue-item/IssueItem";
import {forLater, forNextWeek, forThisWeek, forTodayOrEarly, issuesWithExecutor, issuesWithStatus} from "../util/filters";
import ProjectMenu from "./components/ProjectMenu";
import FilterPanel from "./components/FilterPanel";
import {connect} from "react-redux";

class ListView extends Component {

    constructor(props) {
        super(props);
    }

    toIssueItemList(issues, filterFunction) {
        let {
            selectedIssueId,
            projects,
            project,
            currentPath,
            users,
        } = this.props;

        return filterFunction(issues).map(issue => {
            let projectName = project ? project.name : undefined;
            if (!projectName && issue.projectId !== undefined) {
                projectName = projects.filter(project => project.id === issue.projectId)[0].name;
            }
            return (<IssueItem issue={issue}
                               projectName={projectName}
                               key={issue.id}
                               to={`${currentPath}/issues/${issue.id}`}
                               selected={selectedIssueId === issue.id.toString()}
                               users={users}
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
            statusFilter,
            executorFilter,
            users,
        } = this.props;

        if (statusFilter) {
            issues = issuesWithStatus(issues, statusFilter);
        }
        if(executorFilter) {
            issues = issuesWithExecutor(issues, executorFilter);
        }

        let today = null;
        let thisWeek = null;
        let nextWeek = null;
        let later = null;

        if (forTodayOrEarly(issues).length > 0) {
            today = <WrappedContainer headerText="Сегодня или раньше"
                                      content={this.toIssueItemList(issues, forTodayOrEarly)}
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
                <FilterPanel onStatusFilterChange={this.handleChangeStatusFilter}
                             selectedStatusFilter={statusFilter}
                             users={users}/>
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

function mapStateToProps(state) {
    return {
        statusFilter: state.filters.issueStatusFilterProjectView,
        executorFilter: state.filters.issueExecutorFilterProjectView,
        users: state.users.list,
    };
}

export default connect(mapStateToProps)(ListView);