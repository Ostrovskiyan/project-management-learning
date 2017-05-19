import React, {Component} from "react";
import mainStyles from "../../common/Main.css";
import styles from "../Projects.css";
import FilterPanel from "../components/FilterPanel";
import ProjectMenu from "../components/ProjectMenu";
import moment from "moment";
import Timeline from "../../general/timeline/Timeline";

class TimelineView extends Component {

    render() {
        let {
            // issues,
            headerText,
            currentPath,
            selectedProjectMenuItem,
        } = this.props;


        const startDate = moment().startOf("days").subtract(7, "day");
        const endDate = moment().startOf("days").add(56, "days");

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
                startDate: moment().startOf("day").add(3, "day"),
                endDate: moment().startOf("day").add(3, "day"),
                label: [
                        <i key="icon" className={`fa fa-file-text-o ${styles.TimelineProjectIcon}`} aria-hidden="true"/>,
                        <span key="text" className={styles.TimelineProjectLabel}>project name</span>
                ],
            },
            {
                startDate: moment().startOf("day").add(4, "day"),
                endDate: moment().startOf("day").add(7, "day"),
                label: [
                    <i key="icon" className={`fa fa-file-text-o ${styles.TimelineProjectIcon}`} aria-hidden="true"/>,
                    <span key="text" className={styles.TimelineProjectLabel}>ILP</span>
                ],
            },
        ];

        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} ${styles.TimelineView} col-xs-5`}>
                <div>
                    <div className={styles.GeneralHeader}>
                        {headerText ? headerText : "Проекты"}
                    </div>
                    <ProjectMenu basePath={currentPath} selectedItem={selectedProjectMenuItem} floatRight/>
                </div>
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