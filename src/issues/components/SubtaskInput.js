import React, {Component} from "react";
import styles from "../Issues.css";
import Checkbox from "../../general/checkbox/Checkbox";
import {Form} from "react-bootstrap";

class SubtaskInput extends Component {

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
        } = this.props;
        return (
            <Form inline className={styles.Subtask} onSubmit={onSubmit}>
                <Checkbox wrapperStyle={styles.SubtaskCheckbox} readOnly withoutText/>
                <input type="text"
                       className={`form-control ${styles.SubtaskInput}`}
                       ref={(input) => {
                           this.issueInput = input
                       }}
                       onBlur={onBlur}
                       placeholder="Введите название новой задачи"/>
            </Form>
        )
    }
}

export default SubtaskInput;