import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import ProjectMenu from "./components/ProjectMenu";
import FilterPanel from "./components/FilterPanel";
import {Table} from "react-bootstrap";
import moment from "moment";
import {byId, issuesInProject, issuesWithExecutor, issuesWithStatus} from "../util/filters";
import {issueStatuses} from "../issues/constants/constants";
import {connect} from "react-redux";

const DATE_FORMAT = "MMM DD, YYYY";

class TableView extends Component {

    processIssue(issue, result, issueCount, users) {
        result.push(
            <tr key={result.length} className={styles.IssueRow}>
                <td>{issueCount++}</td>
                <td className={styles.IssueName}>
                    <span>&#8870;</span>
                    <span className={styles.Text}>{issue.name}</span>
                </td>
                <td>{issue.startDate ? moment(issue.startDate).format(DATE_FORMAT) : ""}</td>
                <td>{issue.endDate ? moment(issue.endDate).format(DATE_FORMAT) : ""}</td>
                <td>{issue.startDate && issue.endDate ? `${issue.endDate.diff(issue.startDate, "day") + 1} д.` : ""}</td>
                <td>{issueStatuses[issue.status].text}</td>
                <td>
                    {issue.executors.map(id => byId(users, id))
                        .map(user => `${user.name} ${user.surname}`)
                        .join(", ")}
                </td>
            </tr>
        );
        let subtaskCount = 1;
        for (let subtask of issue.subtasks) {
            result.push(
                <tr key={result.length} className={styles.SubtaskRow}>
                    <td>{`${issueCount - 1}.${subtaskCount++}`}</td>
                    <td className={styles.Name}>
                        {subtask.name}
                    </td>
                    <td/>
                    <td/>
                    <td/>
                    <td>{subtask.done ? "Выполнена" : "Активна"}</td>
                    <td>
                        {subtask.userId ? `${byId(users, subtask.userId).name} ${byId(users, subtask.userId).surname}` : ""}
                    </td>
                </tr>
            );
        }
    }

    generateRows() {
        let {
            projects,
            issues,
            users,
            showIssuesWithoutProject,
            statusFilter,
            executorFilter,
        } = this.props;

        if (statusFilter) {
            issues = issuesWithStatus(issues, statusFilter);
        }
        if (executorFilter) {
            issues = issuesWithExecutor(issues, executorFilter);
        }

        let result = [];
        let issueCount = 1;
        for (let project of projects) {
            result.push(
                <tr key={result.length} className={styles.ProjectRow}>
                    <td/>
                    <td>{project.name}</td>
                    <td>{project.startDate ? moment(project.startDate).format(DATE_FORMAT) : ""}</td>
                    <td>{project.endDate ? moment(project.endDate).format(DATE_FORMAT) : ""}</td>
                    <td> {project.startDate && project.endDate ? `${project.endDate.diff(project.startDate, "day") + 1} д.` : ""}</td>
                    <td/>
                    <td/>
                </tr>
            );
            const projectIssues = issuesInProject(issues, project.id);
            for (let issue of projectIssues) {
                this.processIssue(issue, result, issueCount, users);
            }
        }
        const withoutProject = issuesInProject(issues, undefined);
        if (showIssuesWithoutProject && withoutProject.length > 0) {
            result.push(
                <tr key={result.length} className={styles.ProjectRow}>
                    <td/>
                    <td>Без проектные</td>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                </tr>
            );
            for (let issue of withoutProject) {
                this.processIssue(issue, result, issueCount, users);
            }
        }
        return result;
    }

    render() {
        let {
            headerText,
            currentPath,
            selectedProjectMenuItem,
            users,
        } = this.props;

        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} ${styles.TableView} col-xs-5`}>
                <div>
                    <div className={styles.GeneralHeader}>
                        {headerText ? headerText : "Проекты"}
                    </div>
                    <ProjectMenu basePath={currentPath} selectedItem={selectedProjectMenuItem} floatRight/>
                </div>
                <FilterPanel withShowLabel users={users}/>
                <Table className={styles.IssueTable}>
                    <thead>
                    <tr>
                        <th className={styles.Number}/>
                        <th className={styles.Heading}>
                            Заголовок <span className="caret fa-rotate-180"/>
                        </th>
                        <th className={styles.StartDate}>Начало</th>
                        <th className={styles.EndDate}>Срок выполнения</th>
                        <th className={styles.Duration}>Длительность</th>
                        <th className={styles.Status}>Статус</th>
                        <th className={styles.Executors}>Исполнители</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.generateRows()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        statusFilter: state.filters.issueStatusFilterProjectView,
        executorFilter: state.filters.issueExecutorFilterProjectView,
    }
}

export default connect(mapStateToProps)(TableView);