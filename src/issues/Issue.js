import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";
import {toTitleDate} from "../util/date-util";

class Issue extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick(this.props.issue.id);
        event.preventDefault();
    }

    render() {
        return (
            <div className={`Issue ${this.props.selected ? "Selected" : ""}`} onClick={this.handleClick}>
                <IssueDoubleImage bottomAvatar={this.props.issue.authorAvatar}
                                  topAvatar={this.props.issue.assignedAvatar}/>
                <span className="IssueName">{this.props.issue.name}</span>
                <span className="IssueDates">{toTitleDate(this.props.issue.startDate)}</span>
            </div>
        )
    }
}

export default Issue;