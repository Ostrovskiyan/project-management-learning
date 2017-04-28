import React, {Component} from "react";
import {Col, Glyphicon} from "react-bootstrap";
import "./Issues.css";
import IssueTimeHeader from "./IssueTimeHeader";
import AddIssueInput from "./AddIssueInput";
import {connect} from "react-redux";
import {addIssueEnd, clickAddIssue, deselectIssue, processAddIssue, selectIssue} from "../actions/issues";
import {getUser} from "../api/api";
import {toTitleDate} from "../util/date-util";
import IssueItem from "./IssueItem";
import IssueDescription from "./IssueDescription";
import AddLinkButton from "./AddLinkButton";

class Issues extends Component {

    constructor(props) {
        super(props);
        this.handleClickNewTask = this.handleClickNewTask.bind(this);
        this.handleAddIssue = this.handleAddIssue.bind(this);
        this.handleStopFocus = this.handleStopFocus.bind(this);
        this.handleSelectIssue = this.handleSelectIssue.bind(this);
        this.handleDeselectIssue = this.handleDeselectIssue.bind(this);
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

    handleSelectIssue(id) {
        this.props.dispatch(selectIssue(id))
    }

    handleDeselectIssue(event) {
        this.props.dispatch(deselectIssue());
        event.preventDefault();
    }

    static getNowPlusDays(days) {
        let result = new Date();
        result.setHours(0, 0, 0, 0);
        result.setDate(result.getDate() + days);
        return result;
    }

    toIssueItem(issue) {
        return <IssueItem onClick={this.handleSelectIssue} key={issue.id} issue={issue} selected={issue.id === this.props.selectedIssue}/>;
    }

    render() {
        let now = Issues.getNowPlusDays(0);
        let weekEnd = Issues.getNowPlusDays(6);
        let nextWeekStart = Issues.getNowPlusDays(7);
        let nextWeekEnd = Issues.getNowPlusDays(13);

        let addIssueComponent = this.props.addingIssue ? <AddIssueInput handleFocusEnd={this.handleStopFocus} handleSubmit={this.handleAddIssue} userAvatar={this.user.avatar}/> :
            <AddLinkButton text="Новая задача" handleClick={this.handleClickNewTask}/>;

        let issueDoneIcon = <Glyphicon className="IssueDoneIcon" glyph="glyphicon glyphicon-ok"/>;

        let issuesToday = this.props.issues
            .filter(issue => {
                let issueDate = new Date(issue.startDate.getTime());
                issueDate.setHours(0, 0, 0, 0);
                return issueDate.getTime() === now.getTime();
            })
            .map(issue => this.toIssueItem(issue));

        let issueThisWeek = this.props.issues
            .filter(issue => {
                let issueDate = new Date(issue.startDate.getTime());
                issueDate.setHours(0, 0, 0, 0);
                return issueDate.getTime() > now.getTime() && issueDate.getTime() <= weekEnd.getTime();
            })
            .map(issue => this.toIssueItem(issue));

        let issueNextWeek = this.props.issues
            .filter(issue => {
                let issueDate = new Date(issue.startDate.getTime());
                issueDate.setHours(0, 0, 0, 0);
                return issueDate.getTime() >= nextWeekStart.getTime() && issueDate.getTime() <= nextWeekEnd.getTime();
            })
            .map(issue => this.toIssueItem(issue));

        let issueLater = this.props.issues
            .filter(issue => {
                let issueDate = new Date(issue.startDate.getTime());
                issueDate.setHours(0, 0, 0, 0);
                return issueDate.getTime() > nextWeekEnd.getTime();
            })
            .map(issue => this.toIssueItem(issue));


        let today = <div>
                        <IssueTimeHeader title="НА СЕГОДНЯ" startDate={toTitleDate(now)} issueCount={issuesToday.length}/>
                        {addIssueComponent}
                        {issuesToday}
                        <IssueTimeHeader className="FloatDown" icon={issueDoneIcon} title="ЗАВЕРШЕНА" issueCount={0}/>
                    </div>;

        let thisWeek = <div>
                            <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate={toTitleDate(now)} endDate={toTitleDate(weekEnd)} issueCount={issueThisWeek.length}/>
                            {issueThisWeek}
                        </div>;
        let nextWeek = <div>
                            <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ" startDate={toTitleDate(nextWeekStart)} endDate={toTitleDate(nextWeekEnd)} issueCount={issueNextWeek.length}/>
                            {issueNextWeek}
                        </div>;
        let later = <div>
                        <IssueTimeHeader title="ПОЗЖЕ" startDate={`После ${toTitleDate(nextWeekEnd)}`} issueCount={issueLater.length}/>
                        {issueLater}
                    </div>;

        let content;

        if(this.props.selectedIssue !== null && this.props.selectedIssue !== undefined) {
            content = <div className="FullHeight">
                        <Col xs={5} className="FullHeight Content HalfContent" onClick={this.handleDeselectIssue}>
                            {today}
                            {thisWeek}
                            {nextWeek}
                            {later}
                        </Col>
                        <Col xs={5} className="FullHeight Content HalfContent">
                            <IssueDescription issue={this.props.issues.filter(issue => issue.id === this.props.selectedIssue)[0]}/>
                        </Col>
                    </div>
        } else {
            content = <div className="FullHeight">
                        <Col xs={5} className="FullHeight Content DoubleThirdContent" onClick={this.handleDeselectIssue}>
                            {today}
                        </Col>
                        <Col xs={5} className="FullHeight Content ThirdContent">
                            {thisWeek}
                            {nextWeek}
                            {later}
                        </Col>
                      </div>
        }

        return content;
    }
}

function mapStateToProps(state) {
    return {
        addingIssue: state.issues.addingIssue,
        issues: state.issues.list,
        selectedIssue: state.issues.selectedIssue
    }
}

export default connect(mapStateToProps)(Issues);