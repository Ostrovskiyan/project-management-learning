import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import {Redirect, Route, Switch} from "react-router-dom";
import IssueDescription from "../issues/issue-decription/IssueDescription";
import {connect} from "react-redux";
import {byId, filterIssuesByName, issuesInProject} from "../util/filters";
import ProjectDescription from "./project-description/ProjectDescription";
import {Menu} from "./constants/constants";
import TableView from "./TableView";
import TimelineView from "./TimelineView";
import ListView from "./ListView";
import {getUsers} from "../actions/users";

class Projects extends Component {

    componentDidMount() {
        let {
            dispatch,
        } = this.props;
        dispatch(getUsers());
    }

    render() {
        let {
            issues,
            projects,
            users,
            filterIssueName,
        } = this.props;

        return (
            <Switch>
                <Route exact
                       path="/projects"
                       component={() => (
                           <ListView issues={filterIssuesByName(issues, filterIssueName)}
                                     projects={projects}
                                     selectedProjectMenuItem={Menu.LIST}
                                     currentPath="/projects"
                                     users={users}
                                     fullContent/>
                       )}/>)
                <Route exact
                       path="/projects/table"
                       component={() => (
                           <TableView issues={issues}
                                      projects={projects}
                                      showIssuesWithoutProject
                                      selectedProjectMenuItem={Menu.TABLE}
                                      users={users}
                                      currentPath="/projects"/>
                       )}/>)
                <Route exact
                       path="/projects/timeline"
                       component={() => (
                           <TimelineView issues={issues}
                                         projects={projects}
                                         selectedProjectMenuItem={Menu.TIMELINE}
                                         users={users}
                                         currentPath="/projects"/>
                       )}/>)
                <Route exact path="/projects/issues/:id"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let issue = byId(issues, selectedId);
                           if (!issue) {
                               return <Redirect to="/projects"/>
                           }
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <ListView selectedIssueId={selectedId}
                                             selectedProjectMenuItem={Menu.LIST}
                                             currentPath="/projects"
                                             issues={filterIssuesByName(issues, filterIssueName)}
                                             users={users}
                                             projects={projects}/>
                                   <div
                                       className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} col-xs-5`}>
                                       <IssueDescription issue={issue}
                                                         users={users}/>
                                   </div>
                               </div>
                           )
                       }}/>
                <Route exact path="/projects/:id"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let project = byId(projects, selectedId);
                           if (!project) {
                               return <Redirect to="/projects"/>
                           }
                           issues = issuesInProject(issues, project.id);
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <ListView headerText={project.name}
                                             currentPath={`/projects/${selectedId}`}
                                             selectedProjectMenuItem={Menu.LIST}
                                             issues={filterIssuesByName(issues, filterIssueName)}
                                             users={users}
                                             project={project}/>
                                   <ProjectDescription project={project} users={users}/>
                               </div>
                           )
                       }}/>
                <Route exact path="/projects/:id/table"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let project = byId(projects, selectedId);
                           if (!project) {
                               return <Redirect to="/projects"/>
                           }
                           issues = issuesInProject(issues, project.id);
                           return (
                               <TableView issues={issues}
                                          selectedProjectMenuItem={Menu.TABLE}
                                          currentPath={`/projects/${selectedId}`}
                                          users={users}
                                          projects={[project]}/>
                           )
                       }}/>
                <Route exact path="/projects/:id/timeline"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let project = byId(projects, selectedId);
                           if (!project) {
                               return <Redirect to="/projects"/>
                           }
                           issues = issuesInProject(issues, project.id);
                           return (
                               <TimelineView issues={issues}
                                             selectedProjectMenuItem={Menu.TIMELINE}
                                             currentPath={`/projects/${selectedId}`}
                                             users={users}
                                             projects={[project]}/>
                           )
                       }}/>
                <Route exact path="/projects/:id/issues/:issueId"
                       render={props => {
                           let selectedId = props.match.params.id;
                           let selectedIssueId = props.match.params.issueId;
                           let project = byId(projects, selectedId);
                           if (!project) {
                               return <Redirect to="/projects"/>
                           }
                           if (!byId(issues, selectedIssueId)) {
                               return <Redirect to={`/projects/${selectedId}`}/>
                           }
                           let selectedIssue = byId(issues, selectedIssueId);
                           issues = issuesInProject(issues, project.id);
                           return (
                               <div className={mainStyles.FullHeight}>
                                   <ListView selectedIssueId={selectedIssueId}
                                             selectedProjectMenuItem={Menu.LIST}
                                             currentPath={`/projects/${selectedId}`}
                                             issues={filterIssuesByName(issues, filterIssueName)}
                                             users={users}
                                             project={project}/>
                                   <div
                                       className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} col-xs-5`}>
                                       <IssueDescription issue={selectedIssue}
                                                         users={users}/>
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
        statusFilter: state.filters.issueStatusFilterProjectView,
        users: state.users.list,
        filterIssueName: state.filters.issueName,
    };
}

export default connect(mapStateToProps)(Projects);