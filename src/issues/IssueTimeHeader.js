import React, {Component} from "react";
import {Badge} from "react-bootstrap";
import styles from "./Issues.css";

class IssueTimeHeader extends Component {

    render() {
        let dateLabel;
        if(this.props.startDate) {
            dateLabel = this.props.startDate;
            if (this.props.endDate) {
                dateLabel += (" - " + this.props.endDate);
            }
            dateLabel = <span className={styles.IssueTimeHeaderDates}>{dateLabel}</span>;
        }
        return (
            <div className={`${styles.IssueTimeHeader} ${this.props.className}`}>
                {this.props.icon}
                <span className={styles.IssueTimeHeaderTitle}>{this.props.title}</span>
                {dateLabel}
                <Badge className={`${styles.IssueTimeHeaderCount}`} pullRight>{this.props.issueCount}</Badge>
            </div>
        )
    }
}

export default IssueTimeHeader;
