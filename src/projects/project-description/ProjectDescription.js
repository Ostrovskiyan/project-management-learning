import React, {Component} from "react";
import mainStyles from "../../common/Main.css";
import styles from "../Projects.css";
import DescriptionHeader from "../../components/description-header/DescriptionHeader";
import {DropdownButton, Glyphicon, MenuItem} from "react-bootstrap";
import moment from "moment";
import DescriptionField from "../../components/description-input/DescriptionField";
import ProjectDateRangePicker from "./ProjectDateRangePicker";
import {connect} from "react-redux";
import {updateProject} from "../../actions/projects";
import {projectStatuses} from "../constants/constants";


class ProjectDescription extends Component {

    statusItems = () => {
        let {
            project,
        } = this.props;
        return projectStatuses.map(status => (
            <MenuItem key={status.key}
                      eventKey={status.key}
                      className={styles.ProjectStatusItem}
                      onSelect{this.updateStatus}>
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

    render() {
        let {
            project,
        } = this.props;

        let settingsOptions = [
            {
                text: "Удалить проект",
                eventKey: "REMOVE_PROJECT"
            }
        ];

        let onSettingSelect = (eventKey) => console.log(eventKey);

        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} ${styles.ProjectDescription} col-xs-5`}>
                <DescriptionHeader headerText={project.name}
                                   settingsOptions={settingsOptions}
                                   onSettingSelect={onSettingSelect}
                                   headerStyle={styles.ProjectDescriptionHeader}/>
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
                            {moment().format("DD/MM/YYYY")}
                            <ProjectDateRangePicker id="update-project-start-date"
                                                    startDate={moment()}
                                                    endDate={moment()}/>
                        </div>
                    </div>
                    <div>
                        <div>Дата завершения проекта</div>
                        <div className={styles.Separator}>|</div>
                        <div>
                            {moment().format("DD/MM/YYYY")}
                            <ProjectDateRangePicker id="update-project-end-date"
                                                    startDate={moment()}
                                                    endDate={moment()}/>
                        </div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div className={styles.Separator}>|</div>
                        <DropdownButton id="project-status" bsStyle="default" title={"Желтый"}
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