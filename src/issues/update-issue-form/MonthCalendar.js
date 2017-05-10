import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import {Table} from "react-bootstrap";
import moment from "moment";
import SelectedDay from "./SelectedDay";

class MonthCalendar extends Component {

    generateDays = (date, emptyDays, month) => {
        let result = [];
        const daysInWeek = 7;
        const now = moment();
        let selectedFrom = this.props.selectedFrom;
        for (let i = 0; i < daysInWeek; i++) {
            if(!(i >= emptyDays && month === date.month())) {
                result[i] = <td key={i.toString()} className={styles.Empty}>0</td>;
            }
            else if (date.isSame(selectedFrom, "day") && month === date.month()) {
                result[i] = (<td key={i.toString()} className={styles.SelectedCell}>
                                <SelectedDay day={date.date()} handleNext={this.props.handleNextSelectedFrom}
                                             handlePrevious={this.props.handlePreviousSelectedFrom}/>
                            </td>);
                date.add(1, "days");
            }
            else {
                let className = "";
                if (date.day() === 0) {
                    className = `${styles.Weekend} ${styles.Sunday} `;
                } else if (date.day() === 6) {
                    className = `${styles.Weekend} ${styles.Saturday} `;
                }
                if (now.isSame(date, "day")) {
                    className += styles.CurrentDay;
                } else if (date.isBefore(now)) {
                    className += styles.Before;
                }
                result[i] = <td key={i.toString()} className={className}>
                    {date.date()}
                </td>;
                date.add(1, "days");
            }
        }
        return result;
    };

    generateWeeks = (month, year) => {
        let weeks = [];
        let firstDate = moment().date(1).month(month).year(year);
        let emptyDays = firstDate.day();

        for (let i = 0; i < 6; i++) {
            weeks[i] = <tr key={i.toString()}>
                {this.generateDays(firstDate, emptyDays, month)}
            </tr>;
            emptyDays = 0;
        }
        return weeks;
    };

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
                    {this.generateWeeks(month, year)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default MonthCalendar;