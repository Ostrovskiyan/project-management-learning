import React, {Component} from 'react';
import "./Main.css";
import AppNavbar from "./AppNavbar";
import {Button, Col, Glyphicon, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {clickMenuItem} from "../actions/menu";

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        this.props.dispatch(clickMenuItem(event.target.getAttribute('id')));
        event.preventDefault();
    }

    render() {
        let myWorkId = "my-work";
        let projectsId = "projects";
        let selectedId = this.props.selectedId;
        return (
            <div>
                <div id={myWorkId} className={`MenuButton ${selectedId === myWorkId && "Selected"}`}
                     onClick={this.handleClick}>
                    МОЯ РАБОТА
                </div>
                <div id={projectsId} className={`MenuButton ${selectedId === projectsId && "Selected"}`}
                     onClick={this.handleClick}>
                    ПРОЕКТЫ
                    <Glyphicon className="ProjectPlus" glyph="glyphicon glyphicon-plus"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedId: state.menu.selectedItemId,
    }
}

export default connect(mapStateToProps)(AppMenu);