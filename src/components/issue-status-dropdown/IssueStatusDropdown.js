import React, {Component} from "react";
import mainStyles from "../../common/Main.css";
import styles from "./IssueStatusDropdown.css";
import {Dropdown, MenuItem} from "react-bootstrap";
import {issueStatuses} from "../../issues/constants/constants";

class IssueStatusDropdown extends Component {

    render() {
        let {
            wrapperStyle,
            button: ToggleButton,
            id,
            selectedStatus,
        } = this.props;

        const menuItems = [];
        for (let statusProp in issueStatuses) {
            let status = issueStatuses[statusProp];
            menuItems.push(
                <MenuItem key={status.key} className={status.key === selectedStatus ? styles.SelectedIssueStatus : ""}>
                    <div className={`${styles.IssueStatus} ${status.style}`}/>
                    <div className={styles.IssueStatusName}>{status.text}</div>
                </MenuItem>
            )
        }

        return (
            <Dropdown id={id} bsStyle="link" className={wrapperStyle ? wrapperStyle : ""}>
                <Dropdown.Toggle bsStyle="link" className={`${mainStyles.MinimizeDropdown}`}>
                    <ToggleButton/>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.StatusMenu}>
                    {
                        menuItems
                    }
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default IssueStatusDropdown;