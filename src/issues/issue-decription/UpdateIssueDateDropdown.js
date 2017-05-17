import React from "react";
import {Glyphicon} from "react-bootstrap";
import styles from "../Issues.css";
import DateRangePickerDropdown from "../../general/date-range-picker/DateRangePickerDropdown";

export default function UpdateIssueDateDropdown(props) {
    let {
        startDate,
        endDate,
        onDateChange
    } = props;
    let diff = endDate.diff(startDate, "day") + 1;
    let headerText = diff === 1 ? `${startDate.format("MMM DD")}(1 д.)` : `${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}(${diff} д.)`;
    return (
        <DateRangePickerDropdown id="update-issue-date"
                                 startDate={startDate}
                                 endDate={endDate}
                                 dateRangePickerHeader="Когда эта задача должна быть готова?"
                                 toggleComponent={() => (
                                     <div className={`${styles.IssueSettingTab} ${styles.date}`}>
                                         <Glyphicon className="blue" glyph="glyphicon glyphicon-calendar"/>
                                         <span> {headerText}</span>
                                     </div>)}
                                 onDateChange={onDateChange}/>
    )
}