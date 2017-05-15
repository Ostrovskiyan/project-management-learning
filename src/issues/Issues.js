import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";
import styles from "./Issues.css";
import mainStyles from "../common/Main.css";
import IssueTimeHeader from "./IssueTimeHeader";
import {connect} from "react-redux";
import {getUser} from "../api/api";
import IssueItem from "./issue-item/IssueItem";
import IssueDescription from "./IssueDescription";
import moment from "moment";
import {Link, Route, Switch} from "react-router-dom";
import AddIssue from "../components/new-issue/AddIssue";
import {forLater, forNextWeek, forThisWeek, forToday} from "../util/issue-filters";

class Issues extends Component {

    componentWillMount() {
        this.user = getUser();
    }

    static toIssueItem(issue, selectedId) {
        return  <Link to={`/issues/${issue.id}`} key={issue.id}>
                    <IssueItem issue={issue} selected={issue.id.toString() === selectedId}/>
                </Link>;
    }

    today = (issues, selectedId) => {
        let now = moment().startOf("day");
        let issuesToday = forToday(issues).map(issue => Issues.toIssueItem(issue, selectedId));
        return <div>
            <IssueTimeHeader title="НА СЕГОДНЯ" startDate={now.format("MMM DD")} issueCount={issuesToday.length}/>
            <AddIssue/>
            {issuesToday}
        </div>;
    };

    thisWeek = (issues, selectedId) => {
        let now = moment().startOf("day");
        let weekEnd = moment().startOf("day").add(6, "day");
        let issueThisWeek = forThisWeek(issues).map(issue => Issues.toIssueItem(issue, selectedId));
        return <div>
            <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate={now.format("MMM DD")} endDate={weekEnd.format("MMM DD")} issueCount={issueThisWeek.length}/>
            {issueThisWeek}
        </div>;
    };

    nextWeek = (issues, selectedId) => {
        let nextWeekStart = moment().startOf("day").add(7, "day");
        let nextWeekEnd = moment().startOf("day").add(13, "day");
        let issueNextWeek = forNextWeek(issues).map(issue => Issues.toIssueItem(issue, selectedId));
        return <div>
            <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ" startDate={nextWeekStart.format("MMM DD")} endDate={nextWeekEnd.format("MMM DD")} issueCount={issueNextWeek.length}/>
            {issueNextWeek}
        </div>;
    };

    later = (issues, selectedId) => {
        let nextWeekEnd = moment().startOf("day").add(13, "day");
        let issueLater = forLater(issues).map(issue => Issues.toIssueItem(issue, selectedId));
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