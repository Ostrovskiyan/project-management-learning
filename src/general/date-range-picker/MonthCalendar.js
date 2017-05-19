import React, {Component} from "react";
import styles from "./DateRangePicker.css";
import {Table} from "react-bootstrap";
import moment from "moment";
import SelectedDay from "./SelectedDay";

class MonthCalendar extends Component {

    static createHandleDayEvent(handler, date, toBind) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();
            handler(moment(date).startOf("day"));
        }.bind(toBind);
    }

    generateDays = (date, emptyDays, month) => {
        let result = [];
        const daysInWeek = 7;
        const now = moment();
        let {
            selectedDate,
            startDate,
            endDate,
            onDayClick,
            onDayHover,
            withWeekends,
            stretchStart,
            stretchEnd,
        } = this.props;
        for (let i = 0; i < daysInWeek; i++) {
            if(!(i >= emptyDays && month === date.month())) {
                result[i] = <td key={i.toString()} className={styles.Empty}>0</td>;
            }
            else if (selectedDate && date.isSame(selectedDate, "day") && month === date.month()) {
                result[i] = (<td key={i.toString()} className={styles.SelectedCell}>
                                <SelectedDay day={date.date()}
                                             handleNext={this.props.handleNextSelectedDate}
                                             handlePrevious={this.props.handlePreviousSelectedDate}/>
                            </td>);
                date.add(1, "days");
            }
            else {
                let classes = [];
                if((date.day() === 0 || date.day() === 6) && !withWeekends) {
                    classes.push(styles.Weekend);
                }
                if (date.day() === 0 ) {
                    classes.push(styles.Sunday);
                } else if (date.day() === 6) {
                    classes.push(styles.Saturday);
                }
                if (now.isSame(date, "day")) {
                    classes.push(styles.CurrentDay);
                } else if (date.isBefore(now)) {
                    classes.push(styles.Before);
                }
                if(date.isBetween(startDate, endDate, 'days', '[]')) {
                    classes.push(styles.Between);
                }

                if(stretchStart && date.isSameOrAfter(stretchStart) && date.isSameOrBefore(stretchEnd)) {
                    classes.push(styles.Stretch);
                }

                let className = classes.length > 0 ? classes.reduce((prev, cur) => `${prev} ${cur}`) : "";


                result[i] = <td key={i.toString()}
                                onClick={MonthCalendar.createHandleDayEvent(onDayClick, moment(date), this)}
                                onMouseOver={MonthCalendar.createHandleDayEvent(onDayHover, moment(date), this)}
                                className={className}>
                                {date.date()}
                            </td>;
                date.add(1, "days");
            }
        }
        return result;
    };

    generateWeeks = (month, year) => {
        let weeks = [];
        let firstDate = moment().startOf("day").date(1).month(month).year(year);
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