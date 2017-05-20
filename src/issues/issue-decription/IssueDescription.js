import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";
import styles from "../Issues.css";
import mainStyles from "../../common/Main.css";
import {addIssueToNewProject, removeIssue, updateIssue} from "../../actions/issues";
import IssueToProjectDropdown from "./IssueToProjectDropdown";
import UpdateIssueDateDropdown from "./UpdateIssueDateDropdown";
import ImmediateInput from "../../general/immediate-input/ImmediateInput";
import SubtaskInput from "../components/SubtaskInput";
import Subtask from "../components/Subtask";
import {connect} from "react-redux";
import DescriptionStatusDropdown from "./DescriptionStatusDropdown";
import DescriptionHeader from "../../components/description-header/DescriptionHeader";
import DescriptionField from "../../components/description-input/DescriptionField";
import {byId} from "../../util/filters";
import Participants from "../../components/participants/Participants";

const REMOVE_ISSUE = "REMOVE_ISSUE";

class IssueDescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subtasksIsOpen: false,
        };
    }

    handleAddToNewProject = (projectId) => {
        let {
            issue,
            token,
        } = this.props;
        this.props.dispatch(addIssueToNewProject(issue, projectId, token));
    };

    handleUpdateProject = (projectId) => {
        let {issue} = this.props;
        this.props.dispatch(updateIssue({
            ...issue,
            projectId
        }));
    };

    changeDates = (startDate, endDate) => {
        let {issue} = this.props;
        this.props.dispatch(updateIssue({
            ...issue,
            startDate,
            endDate,
        }));
    };

    handleUpdateStatus = (status) => {
        let {issue} = this.props;
        this.props.dispatch(updateIssue({
            ...issue,
            status,
        }));
    };

    handleUpdateDescription = (description) => {
        let {issue} = this.props;
        this.props.dispatch(updateIssue({
            ...issue,
            description,
        }));
    };

    handleNewSubtask = (name) => {
        let {issue} = this.props;
        let {subtasks} = issue;

        let id = subtasks.length === 0 ? 0 : subtasks
                .map(subtask => subtask.id)
                .reduce((prev, cur) => cur >= prev ? cur : prev, 0) + 1;

        let newSubtask = {
            name,
            id,
            done: false,
        };

        this.props.dispatch(updateIssue({
            ...issue,
            subtasks: [
                ...subtasks,
                newSubtask
            ],
        }));
    };

    handleChangeSubtaskUser = (subtaskId, userId) => {
        let {issue} = this.props;
        let {subtasks} = issue;

        let newSubtasks = subtasks
            .map(subtask => subtask.id === subtaskId ? {...subtask, userId} : subtask);

        this.props.dispatch(updateIssue({
            ...issue,
            subtasks: [
                ...newSubtasks
            ],
        }));
    };

    handleChangeSubtaskStatus = (subtaskId, done) => {
        let {issue} = this.props;
        let {subtasks} = issue;

        let newSubtasks = subtasks
            .map(subtask => subtask.id === subtaskId ? {...subtask, done} : subtask);

        this.props.dispatch(updateIssue({
            ...issue,
            subtasks: [
                ...newSubtasks
            ],
        }));
    };

    handleSettingSelect = (eventKey) => {
        let {
            issue,
            dispatch,
        } = this.props;
        switch (eventKey) {
            case REMOVE_ISSUE:
                dispatch(removeIssue(issue.id));
                break;
            default:
                break;
        }
    };

    handleAddExecutor = (userId) => {
        let {
            issue,
            dispatch,
        } = this.props;
        dispatch(updateIssue({
            ...issue,
            executors: [
                ...issue.executors,
                userId,
            ],
        }));
    };

    createRemoveExecutorHandler = (userId) => {
        let {
            issue,
            dispatch,
        } = this.props;
        return (event) => {
            event.preventDefault();
            let newExecutors = issue.executors.filter(id => id !== userId);
            dispatch(updateIssue({
                ...issue,
                executors: newExecutors,
            }));
        }
    };

    toggleSubtasks = (event) => {
        event.preventDefault();
        this.setState({
            subtasksIsOpen: !this.state.subtasksIsOpen,
        });
    };

    getSubtasks() {
        let {
            issue,
            users,
        } = this.props;
        let {
            executors,
            subtasks,
        } = issue;
        if (subtasks === undefined || subtasks.length === 0) {
            return null;
        }
        return subtasks.map(subtask => <Subtask key={subtask.id}
                                                id={subtask.id}
                                                name={subtask.name}
                                                userId={subtask.userId}
                                                done={subtask.done}
                                                users={executors.map(executorId => byId(users, executorId))}
                                                onChangeSubtaskUser={this.handleChangeSubtaskUser}
                                                onChangeSubtaskStatus={this.handleChangeSubtaskStatus}/>);
    }

    render() {
        let {
            issue,
            projects,
            users,
        } = this.props;
        let {
            subtasksIsOpen,
        } = this.state;
        let {
            creatingDate,
            startDate,
            endDate,
            status,
            executors,
            subtasks,
            description,
        } = issue;

        let settingsOptions = [
            {
                text: "Удалить задачу",
                eventKey: REMOVE_ISSUE,
            }
        ];

        let executorUsers = executors.map(executorId => byId(users, executorId));
        let unassignedUsers = users.filter(user => executors.indexOf(user.id) < 0);

        return (
            <div className={`${mainStyles.FullHeight} ${styles.IssueDescription}`}>
                <DescriptionHeader headerText={issue.name}
                                   settingsOptions={settingsOptions}
                                   onSettingSelect={this.handleSettingSelect}
                                   headerBottomComponent={() =>
                                       <IssueToProjectDropdown issue={issue}
                                                               projects={projects}
                                                               onAddToNewProject={this.handleAddToNewProject}
                                                               onSelectProject={this.handleUpdateProject}/>
                                   }/>
                <div className={styles.IssueSubHeader}>
                    <DescriptionStatusDropdown selectedStatus={status} onSelect={this.handleUpdateStatus}/>
                    <Participants addDropdownId="select-issue-user"
                                  addParticipantBtnText="Добавить исполнителя"
                                  participants={executorUsers}
                                  usersForAdding={unassignedUsers}
                                  participantDoubleClickHanlerBuilder={this.createRemoveExecutorHandler}
                                  onAddParticipant={this.handleAddExecutor}/>
                    <div className={styles.IssueAuthorWrapper}>
                        <span className={styles.IssueAuthor}>
                            автор:
                            <a className={styles.IssueAuthorLink}>{`${issue.author.name}
                                ${issue.author.surname.slice(0, 1)}`}
                            </a>,
                            {creatingDate.format("HH:mm")}
                        </span>
                    </div>
                </div>
                <div className={styles.IssueSettingTabs}>
                    <UpdateIssueDateDropdown onDateChange={this.changeDates} startDate={startDate} endDate={endDate}/>
                    <div
                        className={`${styles.IssueSettingTab} ${styles.SubtaskTab} ${subtasksIsOpen ? styles.Selected : ""}`}
                        onClick={this.toggleSubtasks}>
                        <Glyphicon glyph="glyphicon glyphicon-th-list"/>
                        <span>{subtasks.length === 0 ? "Добавить подзадачу" : `${subtasks.length} subtasks`}</span>
                    </div>
                </div>
                {
                    subtasksIsOpen ?
                        <div className={styles.Subtasks}>
                            {this.getSubtasks()}
                            <ImmediateInput text="Новая подазадача"
                                            inactiveWrapperStyle={styles.Subtask}
                                            inactiveStyle={styles.AddSubtaskBtn}
                                            activeComponent={SubtaskInput}
                                            onSubmit={this.handleNewSubtask}/>
                        </div>
                        :
                        <DescriptionField description={description}
                                          onChange={this.handleUpdateDescription}/>

                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.profile.token,
        projects: state.projects.list,
    }
}

export default connect(mapStateToProps)(IssueDescription);