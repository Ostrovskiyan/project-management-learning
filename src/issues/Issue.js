import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";

class Issue extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`Issue ${this.props.issue.selected && "Selected"}`}>
                <IssueDoubleImage bottomAvatar={this.props.issue.authorAvatar} topAvatar={this.props.issue.assignedAvatar}/>
                <span className="IssueName">{this.props.issue.name}</span>
                <span className="IssueDates">{this.props.issue.date}</span>
            </div>
        )
    }
}

export default Issue;