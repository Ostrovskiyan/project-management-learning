import React, {Component} from 'react';
import "./Main.css";
import AppNavbar from "./AppNavbar";
import {Col, Row} from "react-bootstrap";
import AppMenu from "./AppMenu";
import Issues from "../issues/Issues";
import {connect} from "react-redux";

class PageTemplate extends Component {
    render() {
        let menu =  <Col xs={2} className="FullHeight Menu">
                        <AppMenu/>
                    </Col>;
        let content = <Row className="Main">
                           {menu}
                      </Row>;
        if(this.props.myWorkSelected ) {
            content = <Issues menu={menu}/>;
        }
        return (
            <div className="Background">
                <AppNavbar/>
                {content}
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