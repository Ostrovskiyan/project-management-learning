import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import "./Issues.css";
import IssueTimeHeader from "./IssueTimeHeader";
import NewTaskButton from "./NewTaskButton";
import AddIssueInput from "./AddIssueInput";
import {connect} from "react-redux";
import {addIssueEnd, clickAddIssue, processAddIssue} from "../actions/issues";
import {getThreeLetterMonth, getTwoDigitDay} from "../util/date-util";

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

    toTitleDate(date) {
        return `${getThreeLetterMonth(date)} ${getTwoDigitDay(date)}`;
    }

    render() {
        let now = new Date();
        let weekEnd = new Date();
        weekEnd.setDate(now.getDate() + 6);
        let nextWeekStart = new Date();
        nextWeekStart.setDate(now.getDate() + 7);
        let nextWeekEnd = new Date();
        nextWeekEnd.setDate(now.getDate() + 13);


        let addIssueComponent = this.props.addingIssue ? <AddIssueInput handleFocusEnd={this.handleStopFocus} handleSubmit={this.handleAddIssue}/> :
            <NewTaskButton handleClick={this.handleClickNewTask}/>;
        return (
            <Row className="Main">
                {this.props.menu}
                <Col xs={5} className="FullHeight Content DoubleThirdContent">
                    <IssueTimeHeader title="НА СЕГОДНЯ" startDate={this.toTitleDate(now)} issueCount={0}/>
                    {addIssueComponent}
                </Col>
                <Col xs={5} className="FullHeight Content ThirdContent">
                    <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate={this.toTitleDate(now)} endDate={this.toTitleDate(weekEnd)} issueCount={0}/>
                    <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ" startDate={this.toTitleDate(nextWeekStart)} endDate={this.toTitleDate(nextWeekEnd)} issueCount={0}/>
                    <IssueTimeHeader title="ПОЗЖЕ" startDate={`После ${this.toTitleDate(nextWeekEnd)}`} issueCount={0}/>
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