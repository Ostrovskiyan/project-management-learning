import React, {Component} from 'react';
import "./Main.css";
import AppNavbar from "./AppNavbar";
import {Button, Col, Glyphicon, Row} from "react-bootstrap";
import AppMenu from "./AppMenu";

class PageTemplate extends Component {
    render() {
        return (
            <div className="Background">
                <AppNavbar/>
                <Row className="Main">
                    <Col xs={2} className="FullHeight Menu">
                        <AppMenu/>
                    </Col>
                    <Col xs={5} className="FullHeight WorkFrame">second</Col>
                    <Col xs={5} className="FullHeight WorkFrame">third</Col>
                </Row>
            </div>
        )
    }
}

export default PageTemplate;