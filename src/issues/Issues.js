import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import "./Issues.css";
import IssueTimeHeader from "./IssueTimeHeader";
import NewTaskButton from "./NewTaskButton";
import AddIssueInput from "./AddIssueInput";
import {connect} from "react-redux";
import {addIssueEnd, clickAddIssue, processAddIssue} from "../actions/issues";

class Issues extends Component {

    constructor(props) {
        super(props);
        this.handleClickNewTask = this.handleClickNewTask.bind(this);
        this.handleAddIssue = this.handleAddIssue.bind(this);
        this.handleStopFocus = this.handleStopFocus.bind(this);
    }

    handleClickNewTask(event) {
        this.props.dispatch(clickAddIssue());
        event.preventDefault();
    }

    handleAddIssue(issueName) {
        this.props.dispatch(processAddIssue(issueName));
    }

    handleStopFocus(event) {
        this.props.dispatch(addIssueEnd());
        event.preventDefault();
    }

    render() {
        let addIssueComponent = this.props.addingIssue ? <AddIssueInput handleFocusEnd={this.handleStopFocus} handleSubmit={this.handleAddIssue}/> :
            <NewTaskButton handleClick={this.handleClickNewTask}/>;
        return (
            <Row className="Main">
                {this.props.menu}
                <Col xs={5} className="FullHeight Content DoubleThirdContent">
                    <IssueTimeHeader title="НА СЕГОДНЯ" startDate="Окт 09" issueCount={0}/>
                    {addIssueComponent}
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

function mapStateToProps(state) {
    return {
        addingIssue: state.issues.addingIssue,
    }
}

export default connect(mapStateToProps)(Issues);