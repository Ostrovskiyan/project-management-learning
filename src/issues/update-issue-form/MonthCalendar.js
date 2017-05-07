import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import {Table} from "react-bootstrap";
import moment from "moment";

class MonthCalendar extends Component {

    static generateDays(date, emptyDays, month) {
        let result = [];
        const daysInWeek = 7;
        const now = moment();
        for (let i = 0; i < daysInWeek; i++) {
            if (i >= emptyDays && month === date.month()) {
                let className = "";
                if(date.day() === 0) {
                    className = `${styles.Weekend} ${styles.Sunday} `;
                } else if(date.day() === 6) {
                    className = `${styles.Weekend} ${styles.Saturday} `;
                }
                if(now.year() === date.year() && now.month() === date.month() && now.date() === date.date()) {
                    className += styles.CurrentDay;
                } else if(date.isBefore(now)) {
                    className += styles.Before;
                }
                result[i] = <td key={i.toString()} className={className}>
                                {date.date()}
                            </td>;
                date.add(1, "days");
            } else {
                result[i] = <td key={i.toString()} className={styles.Empty}/>;
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
            <div className={`${styles.MonthCalendarWrapper} ${this.props.right ? styles.Right : styles.Left}`}>
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
            </div>
        )
    }
}

export default MonthCalendar;