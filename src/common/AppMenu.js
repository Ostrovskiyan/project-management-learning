import React, {Component} from 'react';
import styles from "./Main.css";
import {Glyphicon} from "react-bootstrap";
import {connect} from "react-redux";
import {selectMyWork, selectProjectsTab} from "../actions/menu";

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.handleMyWorkClick = this.handleMyWorkClick.bind(this);
        this.handleProjectsClick = this.handleProjectsClick.bind(this);
    }

    handleMyWorkClick(event) {
        this.props.dispatch(selectMyWork());
        event.preventDefault();
    }

    handleProjectsClick(event) {
        this.props.dispatch(selectProjectsTab());
        event.preventDefault();
    }

    render() {
        let myWorkId = "my-work";
        let projectsId = "projects";
        return (
            <div>
                <div id={myWorkId} className={`${styles.MenuButton} ${this.props.myWorkSelected && styles.Selected}`}
                     onClick={this.handleMyWorkClick}>
                    МОЯ РАБОТА
                </div>
                <div id={projectsId} className={`${styles.MenuButton} ${this.props.projectsTabSelected && styles.Selected}`}
                     onClick={this.handleProjectsClick}>
                    ПРОЕКТЫ
                    <Glyphicon className={styles.ProjectPlus} glyph="glyphicon glyphicon-plus"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myWorkSelected: state.menu.myWorkSelected,
        projectsTabSelected: state.menu.projectsTabSelected
    }
}

export default connect(mapStateToProps)(AppMenu);