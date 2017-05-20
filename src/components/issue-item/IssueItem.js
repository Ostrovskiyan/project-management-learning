import React, {Component} from "react";
import IssueDoubleImage from "./IssueDoubleImage";
import styles from "./IssueItem.css";
import {Link} from "react-router-dom";
import userUndefinedImg from "./static/user-undefined.png";
import {byId} from "../../util/filters";

class IssueItem extends Component {

    render() {
        let {
            issue,
            selected,
            projectView = false,
            to,
            projectName,
            users,
        } = this.props;
        let {
            startDate,
            author,
            executors,
            name,
        } = issue;
        let executorAvatar;
        if(executors.length > 0) {
            executorAvatar = byId(users, executors[0]).avatar;
        } else {
            executorAvatar = userUndefinedImg;
        }

        return (
            <Link to={to}>
                <div
                    className={`${styles.Issue} ${projectView ? styles.Project : ""} ${selected ? styles.Selected : ""}`}>
                    {projectView ?
                        <img alt="assigned" className={`${styles.IssueAvatar} `} src={executorAvatar}/>
                        : <IssueDoubleImage bottomAvatar={author.avatar}
                                            topAvatar={executorAvatar}/>
                    }
                    <span className={styles.IssueName}>{name}</span>
                    {
                        projectView && projectName ?
                            <span className={styles.ProjectName}>{projectName}</span>
                            : null
                    }
                    {
                        startDate ?
                            <span className={styles.IssueDates}>{startDate.format("MMM DD")}</span>
                            : null
                    }
                </div>
            </Link>
        )
    }
}

export default IssueItem;