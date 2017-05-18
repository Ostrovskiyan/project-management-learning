import React, {Component} from "react";
import {Table} from "react-bootstrap";
import styles from "./Timeline.css";
import moment from "moment";

const HEADER_FORMAT = "MMM DD YYYY";

class Timeline extends Component {

    constructor(props) {
        super(props);
        let {
            startDate,
            endDate,
        } = this.props;

        this.startDate = startDate.day(0);
        this.endDate = endDate.day(6);
    }

    getWeekCount() {
        let {
            startDate,
            endDate,
        } = this;
        let diff = endDate.diff(startDate, "days") + 1;
        return diff / 7;
    }

    todayNumber() {
        if(!this.number) {
            this.number = moment().startOf("day").diff(this.startDate, "day");
        }
        return this.number;
    }

    generateFirstLevelCells() {
        let weekCount = this.getWeekCount();
        let date = moment(this.startDate);
        let result = [];
        for (let i = 0; i < weekCount; i++) {
            result.push(
                <td colSpan="7" key={date.unix()}>
                    {date.format(HEADER_FORMAT)}
                </td>
            );
            date.add(7, "days");
        }
        return result;
    }

    generateSecondLevelCells() {
        let weekCount = this.getWeekCount();
        let startKey = 0;
        let result = [];
        for (let i = 0; i < weekCount; i++) {
            pushWeekNames(result, startKey);
            startKey += 7;
        }
        return result;
    }

    generateContentCells(count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(
                <tr key={i}>
                    {
                        this.generateContentDays(i)
                    }
                </tr>
            );
        }
        return result;
    }

    generateContentDays(key) {
        let dayCount = this.getWeekCount() * 7;
        let result = [];
        for (let i = 0; i < dayCount; i++) {
            if(i === this.todayNumber()) {
                result.push(<td key={key * 7 + i} className={`${styles.Content} ${styles.Today}`}/>)
            }
            else if (i % 7 === 0) {
                result.push(<td key={key * 7 + i} className={`${styles.Content} ${styles.Sunday}`}/>)
            } else if ((i + 1) % 7 === 0) {
                result.push(<td key={key * 7 + i} className={`${styles.Content} ${styles.Saturday}`}/>)
            } else {
                result.push(<td key={key * 7 + i} className={`${styles.Content}`}/>)
            }
        }
        return result;
    }

    render() {
        let {
            startDate,
            endDate,
        } = this.props;

        return (
            <Table className={styles.Timeline}>
                <thead>
                <tr>
                    {this.generateFirstLevelCells()}
                </tr>
                <tr>
                    {this.generateSecondLevelCells()}
                </tr>
                </thead>
                <tbody>
                {
                    this.generateContentCells(50)
                }
                </tbody>
            </Table>
        );
    }
}

function pushWeekNames(result, startKey) {
    for (let i = 0; i < 7; i++) {
        result.push(<td key={startKey + i}>{moment().day(i).format("ddd")}</td>);
    }
}

export default Timeline;