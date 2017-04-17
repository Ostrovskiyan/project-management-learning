import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import "./Issues.css"
import IssueTimeHeader from "./IssueTimeHeader";

class Issues extends Component {

    render() {
        return (
            <Row className="Main">
                {this.props.menu}
                <Col xs={5} className="FullHeight Content DoubleThirdContent">
                    <IssueTimeHeader title="НА СЕГОДНЯ" startDate="Окт 09" issueCount={0}/>
                </Col>
                <Col xs={5} className="FullHeight Content ThirdContent">
                    <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate="Окт 09" endDate="Окт 15" issueCount={0}/>
                    <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ" startDate="Окт 16" endDate="Окт 22" issueCount={0}/>
                    <IssueTimeHeader title="ПОЗЖЕ" startDate="После Окт 22" issueCount={0}/>
                </Col>
            </Row>
        )
    }
}

export default Issues;