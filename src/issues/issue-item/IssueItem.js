import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";
import styles from "./IssueItem.css";

class IssueItem extends Component {

    render() {
        let {
            issue,
            selected,
            projectView = false,
        } = this.props;
        let {
            startDate,
            author,
            assigned,
            name,
            project,
        } = issue;
        return (
            <div className={`${styles.Issue} ${projectView ? styles.Project : ""} ${selected ? styles.Selected : ""}`}>
                {projectView ?
                    <img alt="assigned" className={`${styles.IssueAvatar} `} src={assigned.avatar}/>
                    : <IssueDoubleImage bottomAvatar={author.avatar}
                                        topAvatar={assigned.avatar}/>
                }
                <span className={styles.IssueName}>{name}</span>
                {
                    projectView && project ?
                        <span className={styles.ProjectName}>{project}</span>
                        : null
                }
                <span className={styles.IssueDates}>
                    {startDate.format("MMM DD")}
                </span>
            </div>
        )
    }
}

export default IssueItem;