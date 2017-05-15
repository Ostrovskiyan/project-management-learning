import React, {Component} from "react";
import styles from "./Main.css";
import {Glyphicon} from "react-bootstrap";
import {Link, Redirect, Route, withRouter} from "react-router-dom";
import ImmediateInput from "../general/immediate-input/ImmediateInput";
import {connect} from "react-redux";
import {createProject} from "../actions/projects";

class AppMenu extends Component {

    render() {
        let myWorkId = "my-work";
        let projectsId = "projects";

        let {
            projects,
            dispatch
        } = this.props;

        // projects = [
        //     {id: 1, name: "alik"},
        //     {id: 2, name: "another alik"},
        //     {id: 3, name: "last alik"},
        // ];

        return (

            <div>
                <Route path="/issues" children={({match}) => (
                    <Link to="/issues">
                        <div id={myWorkId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            МОЯ РАБОТА
                        </div>
                    </Link>
                )}/>
                <Route path="/projects" exact children={({match}) => (
                    <Link to="/projects">
                        <div id={projectsId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            ПРОЕКТЫ
                            <Link to="/projects/add">
                                <Glyphicon className={styles.ProjectPlus} glyph="glyphicon glyphicon-plus"/>
                            </Link>
                        </div>
                    </Link>
                )}/>
                <Route path="/projects/add"
                       render={() => <ImmediateInput
                           activeStyle={styles.AddProject}
                           placeholder="Введите название"
                           inactiveComponent={Redirect}
                           inactiveProps={{to: "/projects"}}
                           onSubmit={projectName => dispatch(createProject(projectName))}
                           isActive/>
                       }/>
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