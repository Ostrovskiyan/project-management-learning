import React, {Component} from "react";
import AddLinkButton from "./AddLinkButton";
import {Button, Col, Dropdown, Glyphicon, MenuItem, Nav, NavDropdown, NavItem, Row, Tab} from "react-bootstrap";

class IssueDescription extends Component {

    constructor(props) {
        super(props);
        this.handleMouseOverIssueStatus = this.handleMouseOverIssueStatus.bind(this);
        this.handleMouseOutIssueStatus = this.handleMouseOutIssueStatus.bind(this);
        this.state = {showIssueStatus: false};
    }


    handleMouseOverIssueStatus(event) {
        this.setState({showIssueStatus:true});
        event.preventDefault();
    }

    handleMouseOutIssueStatus(event) {
        this.setState({showIssueStatus:false});
        event.preventDefault();
    }

    render() {
        let {issue} = this.props;
        return (
            <div className="FullHeight IssueDescription">
                <div className="IssueHeader">
                    <div>
                        <div className="IssueNameHeader">{issue.name}</div>
                        <div className="IssueHeaderButtons">
                            <Button className="IssueHeaderOptions">
                                <i className="fa fa-link LinkAwesomeIcon" aria-hidden="true"/>
                            </Button>
                            <Button className="IssueHeaderOptions">
                                <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                            </Button>
                        </div>
                    </div>
                    <AddLinkButton className="AddInFolder" text="Добавить в папку/проект" font="AddInFolderFont"
                                   fontPlus="AddInFolderFontPlus"/>
                </div>
                <div className="IssueSubHeader">
                    <Dropdown id="issue-status-dropdown" bsStyle="link" className="MarkSuccessWrapper">
                        <Dropdown.Toggle bsStyle="link" >
                            <div className="IssuesStatusTooltip" style={this.state.showIssueStatus ? {} : {display:"none"}}>
                                <span>Отметить задачу как завершена</span>
                            </div>
                            <div className="IssueStatus" onMouseEnter={this.handleMouseOverIssueStatus} onMouseLeave={this.handleMouseOutIssueStatus}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <MenuItem className="SelectedIssueStatus">
                                <div className="IssueStatus active"/>
                                <div className="IssueStatusName">Активна</div>
                            </MenuItem>
                            <MenuItem>
                                <div className="IssueStatus ended"/>
                                <div className="IssueStatusName">Завершена</div>
                            </MenuItem>
                            <MenuItem>
                                <div className="IssueStatus postponed"/>
                                <div className="IssueStatusName">Отложена</div>
                            </MenuItem>
                            <MenuItem>
                                <div className="IssueStatus canceled"/>
                                <div className="IssueStatusName">Отменена</div>
                            </MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="IssueParticipants">
                        <div className="IssueAssigners">
                            <img src={issue.assigned.avatar} className="IssueAssignedAvatar"/>
                            {issue.assigned.name}
                            <Glyphicon className="AddAssignedIcon" glyph="glyphicon glyphicon-plus"/>
                        </div>
                        <div className="IssueAuthorWrapper">
                            <span className="IssueAuthor">
                                автор:
                                <a className="IssueAuthorLink">{`${issue.author.name}
                                    ${issue.author.surname.slice(0, 1)}`}
                                </a>,
                                {issue.creatingDate.getHours()}:{issue.creatingDate.getMinutes()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="IssueSettingTabs">
                    <div className="first-empty"/>
                    <div className="IssueSettingTab date">
                        <Glyphicon glyph="glyphicon glyphicon-calendar"/>
                        <span>Окт 10(1 д.)</span>
                    </div>
                    <div className="IssueSettingTab subtask">
                        <Glyphicon glyph="glyphicon glyphicon-th-list"/>
                        <span>Добавить подзадачу</span>
                    </div>
                </div>
                <div className="IssueDescriptionField">
                    Нажмите, чтобы добавить описание
                </div>
            </div>
        )
    }
}

export default IssueDescription;