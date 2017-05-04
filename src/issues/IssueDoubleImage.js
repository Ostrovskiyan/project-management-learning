import React, {Component} from "react";
import styles from "./Issues.css";

class IssueDoubleImage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className={styles.IssueDoubleImage}>
                <img className={`${styles.IssueAvatar} ${styles.IssueDoubleImageBottom}`} src={this.props.bottomAvatar}/>
                <img className={`${styles.IssueAvatar} ${styles.IssueDoubleImageTop}`} src={this.props.topAvatar}/>
            </span>
        )
    }
}

export default IssueDoubleImage;