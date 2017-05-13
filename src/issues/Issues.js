import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";
import styles from "./Issues.css";
import mainStyles from "../common/Main.css";
import IssueTimeHeader from "./IssueTimeHeader";
import AddIssueInput from "./AddIssueInput";
import {connect} from "react-redux";
import {addIssueEnd, clickAddIssue, processAddIssue} from "../actions/issues";
import {getUser} from "../api/api";
import IssueItem from "./IssueItem";
import IssueDescription from "./IssueDescription";
import AddLinkButton from "./AddLinkButton";
import moment from "moment";
import {Link, Route, Switch} from "react-router-dom";

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

    static toIssueItem(issue, selectedId) {
        return  <Link to={`/issues/${issue.id}`} key={issue.id}>
                    <IssueItem issue={issue} selected={issue.id.toString() === selectedId}/>
                </Link>;
    }

    today = (issues, selectedId) => {
        let now = moment().startOf("day");

        let addIssueComponent = this.props.addingIssue ? <AddIssueInput handleFocusEnd={this.handleStopFocus} handleSubmit={this.handleAddIssue} userAvatar={this.user.avatar}/> :
            <AddLinkButton text="Новая задача" handleClick={this.handleClickNewTask}/>;
        let issuesToday = issues
            .filter(issue => now.isSame(issue.startDate, "day"))
            .map(issue => Issues.toIssueItem(issue, selectedId));
        return <div>
            <IssueTimeHeader title="НА СЕГОДНЯ" startDate={now.format("MMM DD")} issueCount={issuesToday.length}/>
            {addIssueComponent}
            {issuesToday}
        </div>;
    };

    thisWeek = (issues, selectedId) => {
        let now = moment().startOf("day");
        let weekEnd = moment().startOf("day").add(6, "day");
        let nextWeekStart = moment().startOf("day").add(7, "day");
        let issueThisWeek = issues
            .filter(issue => issue.startDate.isAfter(now, "day") && issue.startDate.isBefore(nextWeekStart, "day"))
            .map(issue => Issues.toIssueItem(issue, selectedId));
        return <div>
            <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate={now.format("MMM DD")} endDate={weekEnd.format("MMM DD")} issueCount={issueThisWeek.length}/>
            {issueThisWeek}
        </div>;
    };

    nextWeek = (issues, selectedId) => {
        let nextWeekStart = moment().startOf("day").add(7, "day");
        let nextWeekEnd = moment().startOf("day").add(13, "day");
        let issueNextWeek = issues
            .filter(issue => issue.startDate.isSameOrAfter(nextWeekStart, "day") && issue.startDate.isSameOrBefore(nextWeekEnd, "day"))
            .map(issue => Issues.toIssueItem(issue, selectedId));
        return <div>
            <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ" startDate={nextWeekStart.format("MMM DD")} endDate={nextWeekEnd.format("MMM DD")} issueCount={issueNextWeek.length}/>
            {issueNextWeek}
        </div>;
    };

    later = (issues, selectedId) => {
        let nextWeekEnd = moment().startOf("day").add(13, "day");
        let issueLater = issues
            .filter(issue => issue.startDate.isAfter(nextWeekEnd, "day"))
            .map(issue => Issues.toIssueItem(issue, selectedId));
        return <div>
                    <IssueTimeHeader title="ПОЗЖЕ" startDate={`После ${nextWeekEnd.format("MMM DD")}`} issueCount={issueLater.length}/>
                    {issueLater}
                </div>
    };

    render() {
        let {
            issues
        } = this.props;

        let issueDoneIcon = <Glyphicon className={styles.IssueDoneIcon} glyph="glyphicon glyphicon-ok"/>;

        return  <Switch>
                    <Route exact path="/issues"
                       render={props =>
                           <div className={mainStyles.FullHeight}>
                               <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.DoubleThirdContent} col-xs-5`}>
                                   {this.today(issues)}
                                   <IssueTimeHeader className={styles.FloatDown} icon={issueDoneIcon} title="ЗАВЕРШЕНА" issueCount={0}/>
                               </div>
                               <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.ThirdContent} col-xs-5`}>
                                   {this.thisWeek(issues)}
                                   {this.nextWeek(issues)}
                                   {this.later(issues)}
                               </div>
                           </div>
                    }/>
                    <Route exact path="/issues/:id"
                       render={props => {
                           return <div className={mainStyles.FullHeight}>
                               <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} col-xs-5`}>
                                   {this.today(issues, props.match.params.id)}
                                   {this.thisWeek(issues, props.match.params.id)}
                                   {this.nextWeek(issues, props.match.params.id)}
                                   {this.later(issues, props.match.params.id)}
                                   <IssueTimeHeader className={styles.FloatDown} icon={issueDoneIcon} title="ЗАВЕРШЕНА" issueCount={0}/>
                               </div>
                               <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} col-xs-5`}>
                                   <IssueDescription issue={issues.filter(issue => issue.id.toString() === props.match.params.id)[0]}/>
                               </div>
                           </div>}
                       }/>
                </Switch>;
    }
}

function mapStateToProps(state) {
    return {
        addingIssue: state.issues.addingIssue,
        issues: state.issues.list,
    }
}

export default connect(mapStateToProps)(Issues);