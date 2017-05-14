import React, {Component} from "react";
import {Form} from "react-bootstrap";
import styles from "./Issues.css";

class AddIssueInput extends Component {

    focus() {
        this.issueInput.focus();
    }

    get value() {
        return this.issueInput.value;
    }

    render() {
        let {
            onSubmit,
            onBlur,
            userAvatar
        } = this.props;
        return (
            <Form inline className={styles.AddIssueForm} onSubmit={onSubmit}>
                <img alt="avatar"
                     src={userAvatar}
                     className={styles.AddIssueAvatar}/>
                <input type="text"
                       className={`form-control ${styles.AddIssueInput}`}
                       ref={(input) => {
                           this.issueInput = input
                       }}
                       onBlur={onBlur}/>
            </Form>
        )
    }
}

export default AddIssueInput;