import React, {Component} from "react";
import AddLinkButton from "./AddLinkButton";
import {Button} from "react-bootstrap";

class IssueDescription extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {issue} = this.props;
        return (
            <div className="FullHeight IssueDescription">
                <div>
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
                    <div className="MarkSuccessWrapper">
                        <input type="checkbox"/>
                    </div>
                    <div className="IssueParticipants">
                        <div className="IssueAssigners">
                            <img src={issue.assigned.avatar} className="IssueAssignedAvatar"/>
                            {issue.assigned.name}
                        </div>
                        <div className="IssueAuthorWrapper">
                            <span className="IssueAuthor">
                                автор: <a
                                className="IssueAuthorLink">{`${issue.author.name} ${issue.author.surname.slice(0, 1)}`}</a>, {issue.creatingDate.getHours()}:{issue.creatingDate.getMinutes()}
                            </span>
                        </div>
                    </div>
                </div>
                <div>Oct 10</div>
                <div>
                    Нажмите, чтобы добавить описание
                </div>
            </div>

        )
    }
}

export default IssueDescription;