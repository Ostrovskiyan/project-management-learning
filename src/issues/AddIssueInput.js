import React, {Component} from "react";
import {Form} from "react-bootstrap";
import styles from "./Issues.css";

class AddIssueInput extends Component {

    constructor(props) {
        super(props);
        this.handleFocusEnd = this.handleFocusEnd.bind(this);
    }

    componentDidMount(){
        this.issueInput.focus();
    }

    handleFocusEnd(event) {
        this.props.handleSubmit(this.issueInput.value);
        event.preventDefault();
    }

    render() {
        return (
            <Form inline className={styles.AddIssueForm} onSubmit={this.handleFocusEnd}>
                <img alt="avatar" src={this.props.userAvatar} className={styles.IssueAvatar}/>
                <input type="text" className={`form-control ${styles.AddIssueInput}`} ref={(input) => {this.issueInput = input}} onBlur={this.props.handleFocusEnd}/>
            </Form>
        )
    }
}

export default AddIssueInput;