import React from "react";
import styles from "../Projects.css";
import {Glyphicon} from "react-bootstrap";
import DateRangePickerDropdown from "../../general/date-range-picker/DateRangePickerDropdown";

export default function ProjectDateRangePicker(props) {
    let {
        id,
        startDate,
        endDate,
    } = props;

    return (
        <DateRangePickerDropdown id={id}
                                 startDate={startDate}
                                 endDate={endDate}
                                 dateRangePickerHeader="Когда этот проект должен быть готов?"
                                 dropdownStyle={styles.DataRangePickerDropdown}
                                 toggleComponent={() => (
                                     <Glyphicon glyph="glyphicon glyphicon-calendar" className={styles.Glyphicon}/>
                                 )}/>
    );
}