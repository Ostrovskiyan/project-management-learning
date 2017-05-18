import React from "react";
import styles from "../Projects.css";
import IssueStatusDropdown from "../../components/issue-status-dropdown/IssueStatusDropdown";

export default function FilterPanel(props) {
    let {
        withShowLabel,
        withoutExecutorFilter,
    } = props;


    return (
        <div className={styles.FilterHeader}>
            {
                withShowLabel ?
                    <div className={styles.FilterShowLabel}>
                        ПОКАЗАТЬ
                    </div>
                    : null

            }
            <IssueStatusDropdown id="filter-status-dropdown"
                                 wrapperStyle={styles.FilterDropdown}
                                 button={() => (
                                     <div className={styles.FilterText}>
                                         СТАТУС: Любой
                                     </div>
                                 )}/>
            {
                withoutExecutorFilter ? null :
                    <div className={styles.FilterText}>
                        ИСПОЛНИТЕЛЬ: Все
                    </div>
            }
        </div>
    );
}