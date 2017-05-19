import React, {Component} from "react";
import {Dropdown, Form, Glyphicon} from "react-bootstrap";
import styles from "../Issues.css";
import mainStyles from "../../common/Main.css";

class IssueToProjectDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {open: false};
    }

    handleSubmit(event) {
        event.preventDefault();
        let {
            onAddToNewProject
        } = this.props;
        onAddToNewProject(this.input.value);
        this.setState({
            open: false
        });
    }

    createHandleSelect(projectId) {
        return (event) => {
            event.preventDefault();
            let {
                onSelectProject,
            } = this.props;
            onSelectProject(projectId);
            this.setState({
                open: false
            });
        }
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

    render() {
        let {
            issue,
            projects = [],
        } = this.props;

        let {
            projectId,
        } = issue;

        return (
            <Dropdown id="add-issue-to-project" bsStyle="link" open={this.state.open} onToggle={this.handleToggle}>
                <Dropdown.Toggle bsStyle="link" noCaret
                                 className={mainStyles.MinimizeDropdown}
                                 onClick={this.handleClick}>
                    {
                        projectId !== undefined ?
                            <span
                                className={styles.AddInFolderText}>{projects.filter((project) => project.id === projectId)[0].name}</span> :
                            [
                                <Glyphicon key="icon" glyph="glyphicon glyphicon-plus"
                                           className={`${styles.NewTaskPlus} ${styles.AddInFolderFontPlus}`}/>,
                                <span key="label" className={styles.AddInFolderText}>Добавить в папку/проект</span>
                            ]
                    }
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.AddToProjectDropdown}>
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control" placeholder="Добавить в папку/проект"
                                   ref={input => this.input = input}/>
                        </Form>
                        {
                            projects.length === 0 ?
                                <div className={styles.FoldersForView}>
                                    Отсутсвуют папки для отображения
                                </div>
                                : projects.map(project => (
                                    <div key={project.id} onClick={this.createHandleSelect(project.id)} className={styles.ProjectDropdownItem}>
                                        <i className="fa fa-file-text-o" aria-hidden="true"/>
                                        {project.name}
                                    </div>
                                )
                            )
                        }
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default IssueToProjectDropdown;