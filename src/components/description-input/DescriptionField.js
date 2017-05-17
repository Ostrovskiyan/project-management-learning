import React, {Component} from "react";
import styles from "./DescriptionField.css";
import {Button} from "react-bootstrap";

class DescriptionField extends Component {

    render() {
        return (
            <div className={styles.DescriptionField}>
                <Button bsStyle="link">
                    Нажмите, чтобы добавить описание
                </Button>
            </div>
        )
    }
}

export default DescriptionField;