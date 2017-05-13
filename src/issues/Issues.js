import React, {Component} from "react";
import {Col, Glyphicon} from "react-bootstrap";
import styles from "./Issues.css";
import mainStyles from "../common/Main.css";
import IssueTimeHeader from "./IssueTimeHeader";
import AddIssueInput from "./AddIssueInput";
import {connect} from "react-redux";
import {addIssueEnd, clickAddIssue, deselectIssue, processAddIssue, selectIssue} from "../actions/issues";
import {getUser} from "../api/api";
import IssueItem from "./IssueItem";
import IssueDescription from "./IssueDescription";
import AddLinkButton from "./AddLinkButton";
import moment from "moment";

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

    toIssueItem(issue) {
        return <IssueItem onClick={this.handleSelectIssue} key={issue.id} issue={issue} selected={issue.id === this.props.selectedIssue}/>;
    }

    render() {
        let now = moment().startOf("day");
        let weekEnd = moment().startOf("day").add(6, "day");
        let nextWeekStart = moment().startOf("day").add(7, "day");
        let nextWeekEnd = moment().startOf("day").add(13, "day");

        let addIssueComponent = this.props.addingIssue ? <AddIssueInput handleFocusEnd={this.handleStopFocus} handleSubmit={this.handleAddIssue} userAvatar={this.user.avatar}/> :
            <AddLinkButton text="Новая задача" handleClick={this.handleClickNewTask}/>;

        let issueDoneIcon = <Glyphicon className={styles.IssueDoneIcon} glyph="glyphicon glyphicon-ok"/>;

        let issuesToday = this.props.issues
            .filter(issue => now.isSame(issue.startDate, "day"))
            .map(issue => this.toIssueItem(issue));

        let issueThisWeek = this.props.issues
            .filter(issue => issue.startDate.isAfter(now, "day") && issue.startDate.isBefore(nextWeekStart, "day"))
            .map(issue => this.toIssueItem(issue));

        let issueNextWeek = this.props.issues
            .filter(issue => issue.startDate.isSameOrAfter(nextWeekStart, "day") && issue.startDate.isSameOrBefore(nextWeekEnd, "day"))
            .map(issue => this.toIssueItem(issue));

        let issueLater = this.props.issues
            .filter(issue => issue.startDate.isAfter(nextWeekEnd, "day"))
            .map(issue => this.toIssueItem(issue));


        let today = <div>
                        <IssueTimeHeader title="НА СЕГОДНЯ" startDate={now.format("MMM DD")} issueCount={issuesToday.length}/>
                        {addIssueComponent}
                        {issuesToday}
                        <IssueTimeHeader className={styles.FloatDown} icon={issueDoneIcon} title="ЗАВЕРШЕНА" issueCount={0}/>
                    </div>;

        let thisWeek = <div>
                            <IssueTimeHeader title="НА ЭТУ НЕДЕЛЮ" startDate={now.format("MMM DD")} endDate={weekEnd.format("MMM DD")} issueCount={issueThisWeek.length}/>
                            {issueThisWeek}
                        </div>;
        let nextWeek = <div>
                            <IssueTimeHeader title="НА СЛЕД. НЕДЕЛЮ" startDate={nextWeekStart.format("MMM DD")} endDate={nextWeekEnd.format("MMM DD")} issueCount={issueNextWeek.length}/>
                            {issueNextWeek}
                        </div>;
        let later = <div>
                        <IssueTimeHeader title="ПОЗЖЕ" startDate={`После ${nextWeekEnd.format("MMM DD")}`} issueCount={issueLater.length}/>
                        {issueLater}
                    </div>;

        let content;

        if(this.props.selectedIssue !== null && this.props.selectedIssue !== undefined) {
            content = <div className={mainStyles.FullHeight}>
                        <Col xs={5} className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent}`} onClick={this.handleDeselectIssue}>
                            {today}
                            {thisWeek}
                            {nextWeek}
                            {later}
                        </Col>
                        <Col xs={5} className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent}`}>
                            <IssueDescription issue={this.props.issues.filter(issue => issue.id === this.props.selectedIssue)[0]}/>
                        </Col>
                    </div>
        } else {
            content = <div className={mainStyles.FullHeight}>
                        <Col xs={5} className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.DoubleThirdContent}`} onClick={this.handleDeselectIssue}>
                            {today}
                        </Col>
                        <Col xs={5} className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.ThirdContent}`}>
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