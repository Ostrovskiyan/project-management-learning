import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";
import {toTitleDate} from "../util/date-util";
import styles from "./Issues.css";

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
            <div className={`${styles.Issue} ${this.props.selected ? styles.Selected : ""}`} onClick={this.handleClick}>
                <IssueDoubleImage bottomAvatar={this.props.issue.author.avatar}
                                  topAvatar={this.props.issue.assigned.avatar}/>
                <span className={styles.IssueName}>{this.props.issue.name}</span>
                <span className={styles.IssueDates}>{toTitleDate(this.props.issue.startDate)}</span>
            </div>
        )
    }
}

export default IssueItem;