import React, {Component} from 'react';
import "./Main.css";
import AppNavbar from "./AppNavbar";
import {Col, Row} from "react-bootstrap";

class PageTemplate extends Component {
    render() {
        return (
            <div className="Background">
                <AppNavbar/>
                <Row>
                    <Col xs={2}>first</Col>
                    <Col xs={5}>second</Col>
                    <Col xs={5}>third</Col>
                </Row>
            </div>
        )
    }
}

export default PageTemplate;