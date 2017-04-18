import React, {Component} from 'react';
import "./Main.css";
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
                <div id={myWorkId} className={`MenuButton ${this.props.myWorkSelected && "Selected"}`}
                     onClick={this.handleMyWorkClick}>
                    МОЯ РАБОТА
                </div>
                <div id={projectsId} className={`MenuButton ${this.props.projectsTabSelected && "Selected"}`}
                     onClick={this.handleProjectsClick}>
                    ПРОЕКТЫ
                    <Glyphicon className="ProjectPlus" glyph="glyphicon glyphicon-plus"/>
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