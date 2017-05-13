import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";
import styles from "./Issues.css";

class IssueItem extends Component {

    render() {
        let {startDate} = this.props.issue;
        return (
            <div className={`${styles.Issue} ${this.props.selected ? styles.Selected : ""}`}>
                <IssueDoubleImage bottomAvatar={this.props.issue.author.avatar}
                                  topAvatar={this.props.issue.assigned.avatar}/>
                <span className={styles.IssueName}>{this.props.issue.name}</span>
                <span className={styles.IssueDates}>
                    {startDate.format("MMM DD")}
                </span>
            </div>
        )
    }
}

export default IssueItem;