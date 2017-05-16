import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import {Route, Switch} from "react-router-dom";
import GeneralProjectsView from "./GeneralProjectsView";
import IssueDescription from "../issues/issue-decription/IssueDescription";
import {connect} from "react-redux";
import {byId} from "../util/issue-filters";

class Projects extends Component {

    render() {
        let {
            issues,
        } = this.props;

        return (
            <Switch>
                <Route exact
                       path="/projects"
                       component={() => <GeneralProjectsView issues={issues}/>}/>)
                <Route exact path="/projects/:id"
                       render={props =>
                           <div className={mainStyles.FullHeight}>
                               <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} col-xs-5`}>
                                   Projects
                               </div>
                           </div>
                       }/>
                <Route exact path="/projects/issues/:id"
                       render={props => {
                           let selectedId = props.match.params.id;
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <GeneralProjectsView selectedIssueId={selectedId} issues={issues}/>
                                   <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} col-xs-5`}>
                                       <IssueDescription issue={byId(issues, selectedId)}/>
                                   </div>
                               </div>
                           )
                       }}/>
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {
        issues: state.issues.list,
    };
}

export default connect(mapStateToProps)(Projects);