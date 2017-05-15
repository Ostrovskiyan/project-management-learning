import React, {Component} from "react";
import {Dropdown, Form, Glyphicon} from "react-bootstrap";
import styles from "./Issues.css";
import mainStyles from "../common/Main.css";

class IssueToProjectDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {open:false};
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addInProject(this.input.value);
        this.setState({
            open: false
        });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState ({
            open: true
        });
    }

    handleToggle(isOpen, event) {
        if(event.type !== "react-select" && isOpen !== this.state.open) {
            this.setState({
                open: isOpen
            });
        }
    }

    render() {
        let {issue} = this.props;
        return (
            <Dropdown id="add-issue-in-folder" bsStyle="link" open={this.state.open} onToggle={this.handleToggle}>
                <Dropdown.Toggle bsStyle="link" noCaret className={mainStyles.MinimizeDropdown} onClick={this.handleClick}>
                    {issue.project ? issue.project : ""}
                    <Glyphicon glyph="glyphicon glyphicon-plus"
                               className={`${styles.NewTaskPlus} ${styles.AddInFolderFontPlus}`}/>
                    <span className={styles.AddInFolderFont}>Добавить в папку/проект</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control" placeholder="Добавить в папку/проект" ref={input => this.input = input}/>
                        </Form>
                        <div className={styles.FoldersForView}>
                            Отсутсвуют папки для отображения
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default IssueToProjectDropdown;