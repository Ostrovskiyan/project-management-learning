import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";
import styles from "./Issues.css";
import mainStyles from "../common/Main.css";
import IssueTimeHeader from "./IssueTimeHeader";
import {connect} from "react-redux";
import IssueItem from "../components/issue-item/IssueItem";
import IssueDescription from "./issue-decription/IssueDescription";
import moment from "moment";
import {Redirect, Route, Switch} from "react-router-dom";
import AddIssue from "../components/new-issue/AddIssue";
import {byId, filterIssuesByName, forLater, forNextWeek, forThisWeek, forTodayOrEarly} from "../util/filters";
import {getUsers} from "../actions/users";

class Issues extends Component {

    componentWillMount() {
        let {
            dispatch,
        } = this.props;
        dispatch(getUsers());
    }


    static toIssueItem(issue, selectedId, users) {
        return <IssueItem issue={issue}
                          to={`/issues/${issue.id}`}
                          key={issue.id}
                          users={users}
                          selected={issue.id.toString() === selectedId}/>
    }

    today = (issues, selectedId) => {
        let {
            users,
        } = this.props;
        let now = moment().startOf("day");
        let issuesToday = forTodayOrEarly(issues).map(issue => Issues.toIssueItem(issue, selectedId, users));
        return <div>
            <IssueTimeHeader title="НА СЕГОДНЯ ИЛИ РАНЬШЕ" startDate={now.format("MMM DD")} issueCount={issuesToday.length}/>
            <AddIssue/>
            {issuesToday}
        </div>;
    };

    thisWeek = (issues, selectedId) => {
        let {
            users,
        } = this.props;
        let now = moment().startOf("day");
        let weekEnd = moment().startOf("day").add(6, "day");
        let issueThisWeek = forThisWeek(issues).map(issue => Issues.toIssueItem(issue, selectedId, users));
        return (
            <div>
                <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ"
                                 startDate={now.format("MMM DD")}
                                 endDate={weekEnd.format("MMM DD")}
                                 issueCount={issueThisWeek.length}/>
                {issueThisWeek}
            </div>
        );
    };

    nextWeek = (issues, selectedId) => {
        let {
            users,
        } = this.props;
        let nextWeekStart = moment().startOf("day").add(7, "day");
        let nextWeekEnd = moment().startOf("day").add(13, "day");
        let issueNextWeek = forNextWeek(issues).map(issue => Issues.toIssueItem(issue, selectedId, users));
        return <div>
            <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ"
                             startDate={nextWeekStart.format("MMM DD")}
                             endDate={nextWeekEnd.format("MMM DD")}
                             issueCount={issueNextWeek.length}/>
            {issueNextWeek}
        </div>;
    };

    later = (issues, selectedId) => {
        let {
            users,
        } = this.props;
        let nextWeekEnd = moment().startOf("day").add(13, "day");
        let issueLater = forLater(issues).map(issue => Issues.toIssueItem(issue, selectedId, users));
        return <div>
            <IssueTimeHeader title="ПОЗЖЕ"
                             startDate={`После ${nextWeekEnd.format("MMM DD")}`}
                             issueCount={issueLater.length}/>
            {issueLater}
        </div>
    };

    render() {
        let {
            issues,
            filterIssueName,
            users,
        } = this.props;

        let issueDoneIcon = <Glyphicon className={styles.IssueDoneIcon} glyph="glyphicon glyphicon-ok"/>;
        issues = filterIssuesByName(issues, filterIssueName);

        return (
            <Switch>
                <Route exact path="/issues"
                       render={props =>
                           <div className={mainStyles.FullHeight}>
                               <div
                                   className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.DoubleThirdContent} col-xs-5`}>
                                   {this.today(issues)}
                                   <IssueTimeHeader className={styles.FloatDown} icon={issueDoneIcon} title="ЗАВЕРШЕНА"
                                                    issueCount={0}/>
                               </div>
                               <div
                                   className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.ThirdContent} col-xs-5`}>
                                   {this.thisWeek(issues)}
                                   {this.nextWeek(issues)}
                                   {this.later(issues)}
                               </div>
                           </div>
                       }/>
                <Route exact path="/issues/:id"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let issue = byId(this.props.issues, selectedId);
                           if (!issue) {
                               return <Redirect to="/issues"/>
                           }
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <div
                                       className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} col-xs-5`}>
                                       {this.today(issues, selectedId)}
                                       {this.thisWeek(issues, selectedId)}
                                       {this.nextWeek(issues, selectedId)}
                                       {this.later(issues, selectedId)}
                                       <IssueTimeHeader className={styles.FloatDown} icon={issueDoneIcon}
                                                        title="ЗАВЕРШЕНА"
                                                        issueCount={0}/>
                                   </div>
                                   <div
                                       className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} col-xs-5`}>
                                       <IssueDescription issue={issue} users={users}/>
                                   </div>
                               </div>
                           )
                       }
                       }/>
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {
        addingIssue: state.issues.addingIssue,
        issues: state.issues.list,
        users: state.users.list,
        filterIssueName: state.filters.issueName,
    }
}

export default connect(mapStateToProps)(Issues);