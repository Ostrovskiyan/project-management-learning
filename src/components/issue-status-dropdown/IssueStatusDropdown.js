import React, {Component} from "react";
import mainStyles from "../../common/Main.css";
import styles from "./IssueStatusDropdown.css";
import {Dropdown, MenuItem} from "react-bootstrap";

class IssueStatusDropdown extends Component {

    render() {
        let {
            wrapperStyle,
            button: ToggleButton,
            id
        } = this.props;
        return (
            <Dropdown id={id} bsStyle="link" className={wrapperStyle ? wrapperStyle : ""}>
                <Dropdown.Toggle bsStyle="link" className={`${mainStyles.MinimizeDropdown}`}>
                    <ToggleButton/>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.StatusMenu}>
                    <MenuItem className={styles.SelectedIssueStatus}>
                        <div className={`${styles.IssueStatus} ${styles.active}`}/>
                        <div className={styles.IssueStatusName}>Активна</div>
                    </MenuItem>
                    <MenuItem>
                        <div className={`${styles.IssueStatus} ${styles.ended}`}/>
                        <div className={styles.IssueStatusName}>Завершена</div>
                    </MenuItem>
                    <MenuItem>
                        <div className={`${styles.IssueStatus} ${styles.postponed}`}/>
                        <div className={styles.IssueStatusName}>Отложена</div>
                    </MenuItem>
                    <MenuItem>
                        <div className={`${styles.IssueStatus} ${styles.canceled}`}/>
                        <div className={styles.IssueStatusName}>Отменена</div>
                    </MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default IssueStatusDropdown;