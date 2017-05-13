import React, {Component} from "react";
import {Dropdown, Glyphicon} from "react-bootstrap";
import styles from "./Issues.css";
import mainStyles from "../common/Main.css";
import UpdateIssueDate from "./update-issue-form/UpdateIssueDate";

class UpdateIssueDateDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {open: false};
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            open: true
        });
    }

    handleToggle(isOpen, event) {
        if (event.type !== "react-select" && isOpen !== this.state.open) {
            this.setState({
                open: isOpen
            });
        }
    }

    handleCancel = () => {
        this.setState({
            open: false
        });
    };

    render() {
        let isOpen = this.state.open;
        return (
            <Dropdown id="update-issue-date" bsStyle="link" open={isOpen} onToggle={this.handleToggle}>
                <Dropdown.Toggle bsStyle="link" noCaret className={mainStyles.MinimizeDropdown}
                                 onClick={this.handleClick}>
                    <div className={`${styles.IssueSettingTab} ${styles.date}`}>
                        <Glyphicon className="blue" glyph="glyphicon glyphicon-calendar"/>
                        <span> Окт 10(1 д.)</span>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {isOpen ? <UpdateIssueDate onCancel={this.handleCancel}/> : null}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default UpdateIssueDateDropdown;