import React, {Component} from "react";
import mainStyles from "../../common/Main.css";
import styles from "../Projects.css";
import style from "./Timeline.css";
import FilterPanel from "../components/FilterPanel";
import ProjectMenu from "../components/ProjectMenu";
import {Table} from "react-bootstrap";
import moment from "moment";
import Timeline from "./Timeline";

const HEADER_FORMAT = "MMM DD YYYY";

class TimelineView extends Component {

    render() {
        let {
            issues,
            headerText,
            currentPath,
            selectedProjectMenuItem,
        } = this.props;


        const startDate = moment().startOf("days").subtract(7, "day");
        const endDate = moment().startOf("days").add(21, "days");

        let fatLineOptions = [
            {
                startDate: moment().startOf("day"),
                endDate: moment().startOf("day"),
                label: "first hernya",
            },
            {
                startDate: moment().startOf("day").add(4, "day"),
                endDate: moment().startOf("day").add(7, "day"),
                label: "second hernya",
            },
        ];

        let thinLineOptions = [
            {
                startDate: moment().startOf("day").subtract(10, "day"),
                endDate: moment().startOf("day").add(3, "day"),
                label: "project name",
            },
            {
                startDate: moment().startOf("day").add(4, "day"),
                endDate: moment().startOf("day").add(7, "day"),
                label: "ILP",
            },
        ];

        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} ${styles.TableView} col-xs-5`}>
                <div className={styles.GeneralHeader}>
                    {headerText ? headerText : "Проекты"}
                </div>
                <ProjectMenu basePath={currentPath} selectedItem={selectedProjectMenuItem} floatRight/>
                <FilterPanel withShowLabel withoutExecutorFilter/>
                <Timeline startDate={startDate}
                          endDate={endDate}
                          fatLineOptions={fatLineOptions}
                          thinLineOptions={thinLineOptions}/>
            </div>
        );
    }
}

export default TimelineView;