import React, {Component} from "react";
import mainStyles from "../../common/Main.css";
import styles from "../Projects.css";
import DescriptionHeader from "../../components/description-header/DescriptionHeader";
import {DropdownButton, Glyphicon, MenuItem} from "react-bootstrap";
import moment from "moment";
import DescriptionField from "../../components/description-input/DescriptionField";
import ProjectDateRangePicker from "./ProjectDateRangePicker";
import {connect} from "react-redux";
import {removeProject, updateProject} from "../../actions/projects";
import {projectStatuses} from "../constants/constants";


class ProjectDescription extends Component {

    statusItems = () => {
        return projectStatuses.map(status => (
            <MenuItem key={status.key}
                      eventKey={status.key}
                      className={`${styles.ProjectStatusItem}`}
                      onSelect={this.updateStatus}>
                {status.text}
            </MenuItem>
        ));
    };

    updateStatus = (status) => {
        let {
            project,
            dispatch,
        } = this.props;
        dispatch(updateProject({
            ...project,
            status,
        }));
    };

    handleUpdateDates = (startDate, endDate) => {
        let {
            project,
            dispatch,
        } = this.props;
        dispatch(updateProject({
            ...project,
            startDate,
            endDate
        }));
    };

    onSettingSelect = (eventKey) => {
        let {
            project,
            dispatch,
        } = this.props;
        switch (eventKey) {
            case "REMOVE_PROJECT":
                dispatch(removeProject(project.id));
                break;
        }
    };

    render() {
        let {
            project,
        } = this.props;

        let {
            status,
            startDate,
            endDate,
        } = project;

        let settingsOptions = [
            {
                text: "Удалить проект",
                eventKey: "REMOVE_PROJECT",
            }
        ];

        let selectedStatus = projectStatuses.filter(item => item.key === status)[0];
        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} ${styles.ProjectDescription} col-xs-5`}>
                <DescriptionHeader headerText={project.name}
                                   settingsOptions={settingsOptions}
                                   onSettingSelect={this.onSettingSelect}
                                   headerStyle={`${styles.ProjectDescriptionHeader} ${selectedStatus.headerStyle}`}/>
                <div className={styles.FieldList}>
                    <div className={styles.ParticipantsWrapper}>
                        <div>Участники</div>
                        <div className={styles.Separator}>|</div>
                        <div className={styles.Participants}>
                            <img alt="participant" src={"/images/avatars/example.jpg"} className={""}/>
                            <Glyphicon className={styles.Glyphicon} glyph="glyphicon glyphicon-plus"/>
                        </div>
                    </div>
                    <div>
                        <div>Дата начала проекта</div>
                        <div className={styles.Separator}>|</div>
                        <div>
                            {startDate ? startDate.format("DD/MM/YYYY") : "не задано"}
                            <ProjectDateRangePicker id="update-project-start-date"
                                                    onDatesChanges={this.handleUpdateDates}
                                                    startDate={moment(startDate)}
                                                    endDate={moment(endDate)}/>
                        </div>
                    </div>
                    <div>
                        <div>Дата завершения проекта</div>
                        <div className={styles.Separator}>|</div>
                        <div>
                            {endDate ? endDate.format("DD/MM/YYYY") : "не задано"}
                            <ProjectDateRangePicker id="update-project-end-date"
                                                    onDatesChanges={this.handleUpdateDates}
                                                    startDate={moment(startDate)}
                                                    endDate={moment(endDate)}/>
                        </div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div className={styles.Separator}>|</div>
                        <DropdownButton id="project-status" bsStyle="default" title={selectedStatus.text}
                                        className={styles.ProjectStatusDropdown}>
                            {this.statusItems()}
                        </DropdownButton>
                    </div>
                </div>
                <div className={styles.DescriptionWrapper}>
                    <DescriptionField/>
                </div>
            </div>
        );
    }
}

export default connect()(ProjectDescription);