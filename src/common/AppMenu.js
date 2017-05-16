import React, {Component} from "react";
import styles from "./Main.css";
import {Glyphicon} from "react-bootstrap";
import {Link, Route, withRouter} from "react-router-dom";
import ImmediateInput from "../general/immediate-input/ImmediateInput";
import {connect} from "react-redux";
import {createProject} from "../actions/projects";

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addingProject: false,
        }
    }

    handleClickAddProject = () => {
        this.setState({
            addingProject: true,
        })
    };

    handleToggleAddingProject = (isAdding) => {
        this.setState({
            addingProject: isAdding,
        })
    };

    handleCreateProject = (projectName) => {
        let {
            dispatch,
        } = this.props;
        dispatch(createProject(projectName));
    };

    render() {
        let myWorkId = "my-work";
        let projectsId = "projects";

        let {
            projects,
        } = this.props;

        let {
            addingProject,
        } = this.state;

        return (

            <div>
                <Route path="/issues" children={({match}) => (
                    <Link to="/issues">
                        <div id={myWorkId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            МОЯ РАБОТА
                        </div>
                    </Link>
                )}/>
                <Route path="/projects(/issues/\d+)?" exact children={({match}) => (
                    <Link to="/projects">
                        <div id={projectsId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            ПРОЕКТЫ
                            <Glyphicon className={styles.ProjectPlus}
                                       glyph="glyphicon glyphicon-plus"
                                       onClick={this.handleClickAddProject}/>
                        </div>
                    </Link>
                )}/>
                {
                    addingProject ?
                        <ImmediateInput
                            activeStyle={styles.AddProject}
                            placeholder="Введите название"
                            onToggle={this.handleToggleAddingProject}
                            onSubmit={this.handleCreateProject}
                            isActive/>
                        : null
                }
                <Route path="/projects" render={() =>
                    <div>
                        {projects.map(project =>
                            <Route key={project.id} path={`/projects/${project.id}`} children={({match}) => (
                                <Link to={`/projects/${project.id}`}>
                                    <div
                                        className={`${styles.MenuButton} ${styles.ProjectMenuItem} ${match && styles.Selected}`}>
                                        <i className="fa fa-file-text-o" aria-hidden="true"/>
                                        {project.name}
                                    </div>
                                </Link>
                            )}/>)}
                    </div>
                }/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        projects: state.projects.list,
    }
}

export default withRouter(connect(mapStateToProps)(AppMenu));