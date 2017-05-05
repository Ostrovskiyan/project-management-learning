import React, {Component} from "react";
import {Button, Dropdown, Glyphicon, MenuItem} from "react-bootstrap";
import styles from "./Issues.css";
import mainStyles from "../common/Main.css";
import {connect} from "react-redux";
import {updateIssue} from "../actions/issues";
import AddIssueInFolderDropdown from "./AddIssueInFolderDropdown";
import UpdateIssueDateDropdown from "./UpdateIssueDateDropdown";

class IssueDescription extends Component {

    constructor(props) {
        super(props);
        this.handleMouseOverIssueStatus = this.handleMouseOverIssueStatus.bind(this);
        this.handleMouseOutIssueStatus = this.handleMouseOutIssueStatus.bind(this);
        this.addInFolder = this.addInFolder.bind(this);
        this.state = {showIssueStatus: false};
    }

    handleMouseOverIssueStatus(event) {
        this.setState({showIssueStatus: true});
        event.preventDefault();
    }

    handleMouseOutIssueStatus(event) {
        this.setState({showIssueStatus: false});
        event.preventDefault();
    }

    addInFolder(folder) {
        let {issue} = this.props;
        this.props.dispatch(updateIssue({
            ...issue,
            folder
        }));
    }

    render() {
        let {issue} = this.props;

        return (
            <div className={`${mainStyles.FullHeight} ${styles.IssueDescription}`}>
                <div className={styles.IssueHeader}>
                    <div>
                        <div className={styles.IssueNameHeader}>{issue.name}</div>
                        <div className={styles.IssueHeaderButtons}>
                            <Button className={styles.IssueHeaderOptions}>
                                <i className={`fa fa-link ${styles.LinkAwesomeIcon}`} aria-hidden="true"/>
                            </Button>
                            <Button className={styles.IssueHeaderOptions}>
                                <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                            </Button>
                        </div>
                    </div>
                    <AddIssueInFolderDropdown addInFolder={this.addInFolder} issue={issue}/>
                </div>
                <div className={styles.IssueSubHeader}>
                    <Dropdown id="issue-status-dropdown" bsStyle="link" className={styles.MarkSuccessWrapper}>
                        <Dropdown.Toggle bsStyle="link"
                                         className={`${mainStyles.MinimizeDropdown} ${styles.IssueStatusDropdown}`}>
                            <div className={styles.IssuesStatusTooltip}
                                 style={this.state.showIssueStatus ? {} : {display: "none"}}>
                                <span>Отметить задачу как завершена</span>
                            </div>
                            <div className={styles.IssueStatus} onMouseEnter={this.handleMouseOverIssueStatus}
                                 onMouseLeave={this.handleMouseOutIssueStatus}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <MenuItem className={styles.SelectedIssueStatus}>
                                <div className={`${styles.IssueStatus} ${styles.active}`}/>
                                <div className={styles.IssueStatusName}>Активна</div>
                            </MenuItem>
                            <MenuItem>
                                <div className={`${styles.IssueStatus} ${styles.ended}`}/>
                                <div className={styles.IssueStatusName}>Завершена</div>
                            </MenuItem>
                            <MenuItem>
                                <div className={`${styles.IssueStatus} ${styles.postponed}`}/>
                                <div className={styles.IssueStatusName}>Отложена</div>
                            </MenuItem>
                            <MenuItem>
                                <div className={`${styles.IssueStatus} ${styles.canceled}`}/>
                                <div className={styles.IssueStatusName}>Отменена</div>
                            </MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className={styles.IssueParticipants}>
                        <div className={styles.IssueAssigners}>
                            <img src={issue.assigned.avatar} className={styles.IssueAssignedAvatar}/>
                            {issue.assigned.name}
                            <Glyphicon className={styles.AddAssignedIcon} glyph="glyphicon glyphicon-plus"/>
                        </div>
                        <div className={styles.IssueAuthorWrapper}>
                            <span className={styles.IssueAuthor}>
                                автор:
                                <a className={styles.IssueAuthorLink}>{`${issue.author.name}
                                    ${issue.author.surname.slice(0, 1)}`}
                                </a>,
                                {issue.creatingDate.getHours()}:{issue.creatingDate.getMinutes()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.IssueSettingTabs}>
                    <UpdateIssueDateDropdown/>
                    <div className={`${styles.IssueSettingTab} ${styles.subtask}`}>
                        <Glyphicon glyph="glyphicon glyphicon-th-list"/>
                        <span> Добавить подзадачу</span>
                    </div>
                </div>
                <div className={styles.IssueDescriptionField}>
                    <Button bsStyle="link" className={styles.AddDescriptionLinkBtn}>
                        Нажмите, чтобы добавить описание
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect()(IssueDescription);