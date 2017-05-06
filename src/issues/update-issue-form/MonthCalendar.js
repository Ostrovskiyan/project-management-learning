import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import {Table} from "react-bootstrap";
import moment from "moment";

class MonthCalendar extends Component {

    constructor(props) {
        super(props);
    }

    static generateDays(date, emptyDays, month) {
        let result = [];
        const daysInWeek = 7;
        for (let i = 0; i < daysInWeek; i++) {
            if (i >= emptyDays && month == date.month()) {
                result[i] = <td key={i.toString()}>{date.date()}</td>;
                date.add(1, "days");
            } else {
                result[i] = <td key={i.toString()}/>;
            }
        }
        return result;
    }

    static generateWeeks(month, year) {
        let weeks = [];
        let firstDate = moment().date(1).month(month).year(year);
        let emptyDays = firstDate.day();

        for (let i = 0; i < 6; i++) {
            weeks[i] = <tr key={i.toString()}>
                {MonthCalendar.generateDays(firstDate, emptyDays, month)}
            </tr>;
            emptyDays = 0;
        }
        return weeks;
    }

    render() {
        let {month, year} = {...this.props};

        return (
            <Table className={styles.MonthCalendar}>
                <thead>
                <tr>
                    <th>Вс</th>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                </tr>
                </thead>
                <tbody>
                {MonthCalendar.generateWeeks(month, year)}
                </tbody>
            </Table>
        )
    }
}

export default MonthCalendar;