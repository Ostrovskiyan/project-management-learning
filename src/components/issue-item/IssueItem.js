import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";
import styles from "./IssueItem.css";
import {Link} from "react-router-dom";

class IssueItem extends Component {

    render() {
        let {
            issue,
            selected,
            projectView = false,
            to,
            projectName,
        } = this.props;
        let {
            startDate,
            author,
            assigned,
            name,
        } = issue;
        return (
            <Link to={to}>
                <div className={`${styles.Issue} ${projectView ? styles.Project : ""} ${selected ? styles.Selected : ""}`}>
                    {projectView ?
                        <img alt="assigned" className={`${styles.IssueAvatar} `} src={assigned.avatar}/>
                        : <IssueDoubleImage bottomAvatar={author.avatar}
                                            topAvatar={assigned.avatar}/>
                    }
                    <span className={styles.IssueName}>{name}</span>
                    {
                        projectView && projectName ?
                            <span className={styles.ProjectName}>{projectName}</span>
                            : null
                    }
                    <span className={styles.IssueDates}>
                        {startDate.format("MMM DD")}
                    </span>
                </div>
            </Link>
        )
    }
}

export default IssueItem;