import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";
import {toTitleDate} from "../util/date-util";

class IssueItem extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onClick(this.props.issue.id);
    }

    render() {
        return (
            <div className={`Issue ${this.props.selected ? "Selected" : ""}`} onClick={this.handleClick}>
                <IssueDoubleImage bottomAvatar={this.props.issue.author.avatar}
                                  topAvatar={this.props.issue.assigned.avatar}/>
                <span className="IssueName">{this.props.issue.name}</span>
                <span className="IssueDates">{toTitleDate(this.props.issue.startDate)}</span>
            </div>
        )
    }
}

export default IssueItem;