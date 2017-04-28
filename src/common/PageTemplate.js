import React, {Component} from 'react';
import "./Main.css";
import AppNavbar from "./AppNavbar";
import {Col, Row} from "react-bootstrap";
import AppMenu from "./AppMenu";
import Issues from "../issues/Issues";
import {connect} from "react-redux";

class PageTemplate extends Component {
    render() {
        let menu = (<Col xs={2} className="FullHeight Menu">
                        <AppMenu/>
                    </Col>);
        let content = null;
        if (this.props.myWorkSelected) {
            content = <Issues/>;
        }
        return (
            <div className="Background">
                <AppNavbar/>
                <Row className="Main">
                    {menu}
                    {content}
                </Row>
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

export default connect(mapStateToProps)(PageTemplate);