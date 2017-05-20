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
            onSelect,
            withEmptyStatus,
            emptyStatusText,
        } = this.props;

        const menuItems = [];
        for (let statusProp in issueStatuses) {
            let status = issueStatuses[statusProp];
            menuItems.push(
                <MenuItem key={status.key}
                          eventKey={status.key}
                          onSelect={onSelect}
                          className={status.key === selectedStatus ? styles.SelectedIssueStatus : ""}>
                    <div className={`${styles.IssueStatus} ${status.style}`}/>
                    <div className={styles.IssueStatusName}>{status.text}</div>
                </MenuItem>
            )
        }

        if (withEmptyStatus) {
            menuItems.push(
                <MenuItem key={"empty"}
                          eventKey={undefined}
                          onSelect={onSelect}
                          className={!selectedStatus ? styles.SelectedIssueStatus : ""}>
                    <div className={`${styles.IssueStatus}`}/>
                    <div className={styles.IssueStatusName}>{emptyStatusText}</div>
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