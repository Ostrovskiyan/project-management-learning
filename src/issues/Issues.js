import React, {Component} from "react";
import {Col, Glyphicon, Row} from "react-bootstrap";
import "./Issues.css";
import IssueTimeHeader from "./IssueTimeHeader";
import NewTaskButton from "./NewTaskButton";
import AddIssueInput from "./AddIssueInput";
import {connect} from "react-redux";
import {addIssueEnd, clickAddIssue, processAddIssue} from "../actions/issues";
import {getThreeLetterMonth, getTwoDigitDay} from "../util/date-util";
import Issue from "./Issue";

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

    getNowPlusDays(days) {
        let result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }

    render() {
        let now = this.getNowPlusDays(0);
        let weekEnd = this.getNowPlusDays(6);
        let nextWeekStart = this.getNowPlusDays(7);
        let nextWeekEnd = this.getNowPlusDays(13);

        let addIssueComponent = this.props.addingIssue ? <AddIssueInput handleFocusEnd={this.handleStopFocus} handleSubmit={this.handleAddIssue} userAvatar={this.props.userAvatar}/> :
            <NewTaskButton handleClick={this.handleClickNewTask}/>;

        let issueDoneIcon = <Glyphicon className="IssueDoneIcon" glyph="glyphicon glyphicon-ok"/>;

        let issue = {
            name:"New Issues",
            date:"Окт. 10",
            authorAvatar: "/images/avatars/example.jpg",
            // authorAvatar: this.props.userAvatar,
            // assignedAvatar: this.props.userAvatar
            assignedAvatar: "/images/avatars/example.jpg"
        };
        return (
            <Row className="Main">
                {this.props.menu}
                <Col xs={5} className="FullHeight Content DoubleThirdContent">
                    <IssueTimeHeader title="НА СЕГОДНЯ" startDate={this.toTitleDate(now)} issueCount={0}/>
                    {addIssueComponent}
                    <Issue issue={issue}/>
                    <Issue issue={{...issue, selected:true}}/>
                    <IssueTimeHeader className="FloatDown" icon={issueDoneIcon} title="ЗАВЕРШЕНА" issueCount={0}/>
                </Col>
                <Col xs={5} className="FullHeight Content ThirdContent">
                    <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate={this.toTitleDate(now)} endDate={this.toTitleDate(weekEnd)} issueCount={0}/>
                    <Issue issue={issue}/>
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
        userAvatar: state.profile.avatar
    }
}

export default connect(mapStateToProps)(Issues);