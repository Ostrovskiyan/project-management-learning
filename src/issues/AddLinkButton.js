import React, {Component} from 'react';
import {Button, Glyphicon} from "react-bootstrap";
import styles from "./Issues.css";

class AddLinkButton extends Component {

    render() {
        return (
            <div>
                <Button bsStyle="link" className={`${styles.NewTask} ${this.props.className || ""}`} onClick={this.props.handleClick}>
                    <Glyphicon glyph="glyphicon glyphicon-plus" className={`${styles.NewTaskPlus} ${this.props.fontPlus || ""}`}/>
                    <span className={this.props.font || ""}>{this.props.text}</span>
                </Button>
            </div>
        )
    }
}

export default AddLinkButton;