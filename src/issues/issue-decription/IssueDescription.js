import React, {Component} from "react";
import {Button, Glyphicon} from "react-bootstrap";
import styles from "../Issues.css";
import mainStyles from "../../common/Main.css";
import {updateIssue} from "../../actions/issues";
import IssueToProjectDropdown from "./IssueToProjectDropdown";
import UpdateIssueDateDropdown from "./UpdateIssueDateDropdown";
import ImmediateInput from "../../general/immediate-input/ImmediateInput";
import SubtaskInput from "../components/SubtaskInput";
import Subtask from "../components/Subtask";
import {getUsers} from "../../actions/users";
import {connect} from "react-redux";
import DescriptionStatusDropdown from "./DescriptionStatusDropdown";
import DescriptionHeader from "../../components/description-header/DescriptionHeader";
import DescriptionField from "../../components/description-input/DescriptionField";

class IssueDescription extends Component {

    constructor(props) {
        super(props);
        this.addInProject = this.addInProject.bind(this);
        this.state = {
            subtasksIsOpen: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(getUsers());
    }

    addInProject(project) {
        let {issue} = this.props;
        this.props.dispatch(updateIssue({
            ...issue,
            project
        }));
    }

    changeDates = (startDate, endDate) => {
        let {issue} = this.props;
        this.props.dispatch(updateIssue({
            ...issue,
            startDate,
            endDate
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

        console.log(subtaskId);
        console.log(userId);
        let newSubtasks = subtasks
            .map(subtask => subtask.id === subtaskId ? {...subtask, userId} : subtask);

        this.props.dispatch(updateIssue({
            ...issue,
            subtasks: [
                ...newSubtasks
            ],
        }));
    };

    toggleSubtasks = (event) => {
        event.preventDefault();
        this.setState({
            subtasksIsOpen: !this.state.subtasksIsOpen,
        });
    };

    getSubtasks() {
        let subtasks = this.props.issue.subtasks;
        if (subtasks === undefined || subtasks.length === 0) {
            return null;
        }
        let users = this.props.users;
        return subtasks.map(subtask => <Subtask key={subtask.id}
                                                id={subtask.id}
                                                name={subtask.name}
                                                userId={subtask.userId}
                                                users={users}
                                                onChangeSubtaskUser={this.handleChangeSubtaskUser}/>);
    }

    render() {
        let {
            issue,
        } = this.props;
        let {
            subtasksIsOpen,
        } = this.state;
        let {
            creatingDate,
            startDate,
            endDate
        } = issue;
        return (
            <div className={`${mainStyles.FullHeight} ${styles.IssueDescription}`}>
                <DescriptionHeader headerText={issue.name}
                                   headerBottomComponent={() =>
                                       <IssueToProjectDropdown addInProject={this.addInProject} issue={issue}/>
                                   }/>
                <div className={styles.IssueSubHeader}>
                    <DescriptionStatusDropdown/>
                    <div className={styles.IssueAssigners}>
                        <img alt="assigned" src={issue.assigned.avatar} className={styles.IssueAssignedAvatar}/>
                        {issue.assigned.name}
                        <Glyphicon className={styles.AddAssignedIcon} glyph="glyphicon glyphicon-plus"/>
                    </div>
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
                        <span> Добавить подзадачу</span>
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
                        <DescriptionField/>

                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.list,
    }
}

export default connect(mapStateToProps)(IssueDescription);