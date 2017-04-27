import React, {Component} from "react";
import {Col, Glyphicon, Row} from "react-bootstrap";
import "./Issues.css";
import IssueTimeHeader from "./IssueTimeHeader";
import NewTaskButton from "./NewTaskButton";
import AddIssueInput from "./AddIssueInput";
import {connect} from "react-redux";
import {addIssueEnd, clickAddIssue, processAddIssue} from "../actions/issues";
import Issue from "./Issue";
import {getUser} from "../api/api";
import {toTitleDate} from "../util/date-util";

class Issues extends Component {

    constructor(props) {
        super(props);
        this.handleClickNewTask = this.handleClickNewTask.bind(this);
        this.handleAddIssue = this.handleAddIssue.bind(this);
        this.handleStopFocus = this.handleStopFocus.bind(this);
    }

    componentWillMount() {
        this.user = getUser();
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

    static getNowPlusDays(days) {
        let result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }

    render() {
        let now = Issues.getNowPlusDays(0);
        let weekEnd = Issues.getNowPlusDays(6);
        let nextWeekStart = Issues.getNowPlusDays(7);
        let nextWeekEnd = Issues.getNowPlusDays(13);

        let addIssueComponent = this.props.addingIssue ? <AddIssueInput handleFocusEnd={this.handleStopFocus} handleSubmit={this.handleAddIssue} userAvatar={this.user.avatar}/> :
            <NewTaskButton handleClick={this.handleClickNewTask}/>;

        let issueDoneIcon = <Glyphicon className="IssueDoneIcon" glyph="glyphicon glyphicon-ok"/>;

        let issue = {
            name:"New Issues",
            startDate:new Date(),
            authorAvatar: "/images/avatars/example.jpg",
            // authorAvatar: this.user.avatar,
            // assignedAvatar: this.user.avatar
            assignedAvatar: "/images/avatars/example.jpg"
        };

        let issues = this.props.issues.map(issue => <Issue key={issue.id} issue={issue}/>);

        return (
            <Row className="Main">
                {this.props.menu}
                <Col xs={5} className="FullHeight Content DoubleThirdContent">
                    <IssueTimeHeader title="НА СЕГОДНЯ" startDate={toTitleDate(now)} issueCount={0}/>
                    {addIssueComponent}
                    {issues}
                    <IssueTimeHeader className="FloatDown" icon={issueDoneIcon} title="ЗАВЕРШЕНА" issueCount={0}/>
                </Col>
                <Col xs={5} className="FullHeight Content ThirdContent">
                    <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate={toTitleDate(now)} endDate={toTitleDate(weekEnd)} issueCount={0}/>
                    <Issue issue={issue}/>
                    <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ" startDate={toTitleDate(nextWeekStart)} endDate={toTitleDate(nextWeekEnd)} issueCount={0}/>
                    <IssueTimeHeader title="ПОЗЖЕ" startDate={`После ${toTitleDate(nextWeekEnd)}`} issueCount={0}/>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        addingIssue: state.issues.addingIssue,
        issues: state.issues.list
    }
}

export default connect(mapStateToProps)(Issues);