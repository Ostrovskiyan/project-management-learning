import React, {Component} from "react";
import styles from "./IssueItem.css";

class IssueDoubleImage extends Component {

    render() {
        return (
            <span className={styles.IssueDoubleImage}>
                <img alt="author" className={`${styles.IssueAvatar} ${styles.IssueDoubleImageBottom}`} src={this.props.bottomAvatar}/>
                <img alt="assigned" className={`${styles.IssueAvatar} ${styles.IssueDoubleImageTop}`} src={this.props.topAvatar}/>
            </span>
        )
    }
}

export default IssueDoubleImage;