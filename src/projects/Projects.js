import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import {Redirect, Route, Switch} from "react-router-dom";
import GeneralProjectsView from "./GeneralProjectsView";
import IssueDescription from "../issues/issue-decription/IssueDescription";
import {connect} from "react-redux";
import {byId} from "../util/filters";
import ProjectDescription from "./project-description/ProjectDescription";
import {Menu} from "./constants/constants";
import TableView from "./TableView";
import TimelineView from "./timeline/TimelineView";

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
                       component={() => (
                           <GeneralProjectsView issues={issues}
                                                projects={projects}
                                                selectedProjectMenuItem={Menu.LIST}
                                                currentPath="/projects"
                                                fullContent/>
                       )}/>)
                <Route exact
                       path="/projects/table"
                       component={() => (
                           <TableView issues={issues}
                                      selectedProjectMenuItem={Menu.TABLE}
                                      currentPath="/projects"/>
                       )}/>)
                <Route exact
                       path="/projects/timeline"
                       component={() => (
                           <TimelineView issues={issues}
                                         selectedProjectMenuItem={Menu.TIMELINE}
                                         currentPath="/projects"/>
                       )}/>)
                <Route exact path="/projects/issues/:id"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let issue = byId(issues, selectedId);
                           if(!issue) {
                               return <Redirect to="/projects"/>
                           }
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <GeneralProjectsView selectedIssueId={selectedId}
                                                        selectedProjectMenuItem={Menu.LIST}
                                                        currentPath="/projects"
                                                        issues={issues}
                                                        projects={projects}/>
                                   <div
                                       className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} col-xs-5`}>
                                       <IssueDescription issue={issue}/>
                                   </div>
                               </div>
                           )
                       }}/>
                <Route exact path="/projects/:id"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let project = byId(projects, selectedId);
                           if(!project) {
                               return <Redirect to="/projects"/>
                           }

                           return (
                               <div className={mainStyles.FullHeight}>
                                   <GeneralProjectsView headerText={project.name}
                                                        currentPath={`/projects/${selectedId}`}
                                                        selectedProjectMenuItem={Menu.LIST}
                                                        issues={issues}
                                                        project={project}/>
                                   <ProjectDescription project={project}/>
                               </div>
                           )
                       }}/>
                <Route exact path="/projects/:id/table"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let project = byId(projects, selectedId);
                           if(!project) {
                               return <Redirect to="/projects"/>
                           }
                           return (
                               <TableView issues={issues}
                                          selectedProjectMenuItem={Menu.TABLE}
                                          currentPath={`/projects/${selectedId}`}
                                          project={project}/>
                           )
                       }}/>
                <Route exact path="/projects/:id/timeline"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let project = byId(projects, selectedId);
                           if(!project) {
                               return <Redirect to="/projects"/>
                           }
                           return (
                               <TimelineView issues={issues}
                                             selectedProjectMenuItem={Menu.TIMELINE}
                                             currentPath={`/projects/${selectedId}`}
                                             project={project}/>
                           )
                       }}/>
                <Route exact path="/projects/:id/issues/:issueId"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let selectedIssueId = props.match.params.issueId;
                           let project = byId(projects, selectedId);
                           if(!project) {
                               return <Redirect to="/projects"/>
                           }
                           if(!byId(issues, selectedIssueId)) {
                               return <Redirect to={`/projects/${selectedId}`}/>
                           }
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <GeneralProjectsView selectedIssueId={selectedIssueId}
                                                        selectedProjectMenuItem={Menu.LIST}
                                                        currentPath="/projects"
                                                        issues={issues}
                                                        projects={projects}/>
                                   <div
                                       className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} col-xs-5`}>
                                       <IssueDescription issue={byId(issues, selectedIssueId)}/>
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