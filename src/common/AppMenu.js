import React, {Component} from "react";
import styles from "./Main.css";
import {Glyphicon} from "react-bootstrap";
import {Link, Route, withRouter} from "react-router-dom";

class AppMenu extends Component {

    render() {
        let myWorkId = "my-work";
        let projectsId = "projects";
        return (
            <div>
                <Route path="/issues" children={({ match }) => (
                    <Link to="/issues">
                        <div id={myWorkId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            МОЯ РАБОТА
                        </div>
                    </Link>
                )}/>
                <Route path="/projects" children={({ match }) => (
                    <Link to="/projects">
                        <div id={projectsId} className={`${styles.MenuButton} ${match && styles.Selected}`}>
                            ПРОЕКТЫ
                            <Glyphicon className={styles.ProjectPlus} glyph="glyphicon glyphicon-plus"/>
                        </div>
                    </Link>
                )}/>
            </div>
        )
    }
}

export default withRouter(AppMenu);