import React, {Component} from 'react';
import {FormGroup} from "react-bootstrap";
import styles from "./LoginPage.css";

class LoginMessage extends Component {
    render() {
        return (
            <FormGroup className={styles.Note}>
                {this.props.message}
            </FormGroup>
        )
    }
}

export default LoginMessage;