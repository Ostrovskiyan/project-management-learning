import React, {Component} from "react";
import styles from "./Main.css";
import {Glyphicon} from "react-bootstrap";
import {Link, Redirect, Route, withRouter} from "react-router-dom";
import ImmediateInput from "../general/immediate-input/ImmediateInput";

class AppMenu extends Component {

    render() {
        let myWorkId = "my-work";
        let projectsId = "projects";

        function AddProjects() {
            return <ImmediateInput
                activeStyle={styles.AddProject}
                placeholder="Введите название"
                inactiveComponent={Redirect}
                inactiveProps={{to: "/projects"}}
                isActive/>
        }

        return (
            <div>
                <Route path="/issues" children={({match}) => (
                    <Link to="/issues">
                        <div id={myWorkId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            МОЯ РАБОТА
                        </div>
                    </Link>
                )}/>
                <Route path="/projects" children={({match}) => (
                    <Link to="/projects">
                        <div id={projectsId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            ПРОЕКТЫ
                            <Link to="/projects/add">
                                <Glyphicon className={styles.ProjectPlus} glyph="glyphicon glyphicon-plus"/>
                            </Link>
                        </div>
                    </Link>
                )}/>
                <Route path="/projects/add" component={AddProjects}/>
            </div>
        )
    }
}

export default withRouter(AppMenu);