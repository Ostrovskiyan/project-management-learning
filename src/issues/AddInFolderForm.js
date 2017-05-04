import React, {Component} from "react";
import {Form} from "react-bootstrap";
import styles from "./Issues.css";

class AddIssueInput extends Component {

    constructor(props) {
        super(props);
        this.handleFocusEnd = this.handleFocusEnd.bind(this);
        this.handleFocusStart = this.handleFocusStart.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleFocusEnd() {
        console.log("stop focus");
    }

    handleFocusStart() {
        console.log("start focus");
    }

    handleClick() {
        console.log("click");
    }

    render() {
        return (
            <div className={styles.AddInFolderForm} onFocus={this.handleFocusStart} onBlur={this.handleFocusEnd} onClick={this.handleClick}>
                <Form  onSubmit={this.handleFocusEnd}>
                    <input type="text" className="form-control"/>
                </Form>
                <div>Отсутсвуют папки для отображения</div>
            </div>
        )
    }
}

export default AddIssueInput;