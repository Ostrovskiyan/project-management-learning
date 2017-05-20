import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import FilterPanel from "./components/FilterPanel";
import ProjectMenu from "./components/ProjectMenu";
import moment from "moment";
import Timeline from "../general/timeline/Timeline";
import {byId, issuesWithExecutor, issuesWithStatus} from "../util/filters";
import {connect} from "react-redux";

class TimelineView extends Component {

    render() {
        let {
            issues,
            projects,
            headerText,
            currentPath,
            selectedProjectMenuItem,
            users,
            statusFilter,
            executorFilter,
        } = this.props;

        if (statusFilter) {
            issues = issuesWithStatus(issues, statusFilter);
        }
        if (executorFilter) {
            issues = issuesWithExecutor(issues, executorFilter);
        }

        issues = issues.filter(issue => issue.startDate && issue.endDate)
            .sort((i1, i2) => moment(i1.startDate).diff(moment(i2.startDate)));
        projects = projects.filter(project => project.startDate && project.startDate)
            .sort((p1, p2) => moment(p1.startDate).diff(moment(p2.startDate)));

        let startDate;
        let endDate;
        if (issues.length !== 0 && projects.length !== 0) {
            startDate = issues[0].startDate.isBefore(projects[0].startDate) ?
                moment(issues[0].startDate)
                : moment(projects[0].startDate);
            startDate.subtract(7, 'days');
            let maxIssueEndDate = maxEndDate(issues);
            let maxProjectEndDate = maxEndDate(projects);
            endDate = maxIssueEndDate.isAfter(maxProjectEndDate) ? moment(maxIssueEndDate) : moment(maxProjectEndDate);
            endDate.add(7, 'days');
        } else if (issues.length) {
            startDate = moment(issues[0].startDate);
            startDate.subtract(7, 'days');
            endDate = moment(maxEndDate(issues));
            endDate.add(7, 'days');
        } else if (projects.length) {
            startDate = moment(projects[0].startDate);
            startDate.subtract(7, 'days');
            endDate = moment(maxEndDate(projects));
            endDate.add(7, 'days');
        }

        let fatLineOptions = issues.map(issue => {
            return {
                startDate: moment(issue.startDate),
                endDate: moment(issue.endDate),
                label: `${issue.name} / ${issue.executors.map(id => `${byId(users, id).name} ${byId(users, id).surname}`).join(", ")}`,
            }
        });

        let thinLineOptions = projects.map(project => {
            return {
                startDate: moment(project.startDate),
                endDate: moment(project.endDate),
                label: [
                    <i key="icon" className={`fa fa-file-text-o ${styles.TimelineProjectIcon}`}
                       aria-hidden="true"/>,
                    <span key="text" className={styles.TimelineProjectLabel}>
                        {`${project.name} (${project.participants.map(id => byId(users, id)).map(user => `${user.name} ${user.surname}`).join(", ")})`}
                    </span>
                ],
            }
        });

        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} ${styles.TimelineView} col-xs-5`}>
                <div>
                    <div className={styles.GeneralHeader}>
                        {headerText ? headerText : "Проекты"}
                    </div>
                    <ProjectMenu basePath={currentPath} selectedItem={selectedProjectMenuItem} floatRight/>
                </div>
                <FilterPanel withShowLabel withoutExecutorFilter users={users}/>
                {
                    issues.length !== 0 || projects.length !== 0 ?
                        <Timeline startDate={startDate}
                                  endDate={endDate}
                                  fatLineOptions={fatLineOptions}
                                  thinLineOptions={thinLineOptions}/>
                        : null
                }
            </div>
        );
    }
}

function maxEndDate(list) {
    return list.map(item => item.endDate).reduce((prev, cur) => cur.isAfter(prev) ? cur : prev)
}

function mapStateToProps(state) {
    return {
        statusFilter: state.filters.issueStatusFilterProjectView,
        executorFilter: state.filters.issueExecutorFilterProjectView,
    }
}

export default connect(mapStateToProps)(TimelineView);