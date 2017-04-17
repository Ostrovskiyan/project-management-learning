import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";

class Issues extends Component {

    render() {
        return (
            <Row className="Main">
                {this.props.menu}
                <Col xs={5} className="FullHeight WorkFrame">second</Col>
                <Col xs={5} className="FullHeight WorkFrame">third</Col>
            </Row>
        )
    }
}

export default Issues;