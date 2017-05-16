import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import {Route, Switch} from "react-router-dom";
import GeneralProjectsView from "./GeneralProjectsView";
import IssueDescription from "../issues/issue-decription/IssueDescription";
import {connect} from "react-redux";
import {byId} from "../util/filters";
import ProjectDescription from "./project-description/ProjectDescription";

class Projects extends Component {

    render() {
        let {
            issues,
            projects,
        } = this.props;

        return (
            <Switch>
                <Route exact
                       path="/projects"
                       component={() => <GeneralProjectsView issues={issues} fullContent/>}/>)
                <Route exact path="/projects/:id"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let project = byId(projects, selectedId);
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <GeneralProjectsView headerText={project.name} issues={issues}/>
                                   <ProjectDescription project={project}/>
                               </div>
                           )
                       }}/>
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
        projects: state.projects.list,
    };
}

export default connect(mapStateToProps)(Projects);