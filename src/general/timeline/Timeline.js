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
            thinLineOptions = [],
            fatLineOptions = [],
        } = this.props;

        this.startDate = startDate.day(0);
        this.endDate = endDate.day(6);
        let today = getToday(startDate);
        let height = 2 * (thinLineOptions.length + fatLineOptions.length) + 2;
        this.cellObjects = generateEmptyCellObjects(height, this.getDayCount(), today);
    }

    getWeekCount() {
        let {
            startDate,
            endDate,
        } = this;
        let diff = endDate.diff(startDate, "days") + 1;
        return diff / 7;
    }

    getDayCount() {
        return this.getWeekCount() * 7;
    }

    generateContentDays() {
        let result = [];
        let columnLength = this.cellObjects.length;
        let rowLength = this.cellObjects[0].length;
        for (let i = 0; i < columnLength; i++) {
            let resultRow = [];
            resultRow.push(<td key="empty"/>);
            for (let j = 0; j < rowLength; j++) {
                let classes = [];
                let cellObject = this.cellObjects[i][j];
                let content = null;
                if (cellObject.isEmpty) {
                    classes.push(styles.Content);
                    if (cellObject.isToday) {
                        classes.push(styles.Today);
                    }
                    if (cellObject.isSunday) {
                        classes.push(styles.Sunday);
                    } else if (cellObject.isSaturday) {
                        classes.push(styles.Saturday);
                    }
                } else if (cellObject.isFat) {
                    classes.push(styles.Fat);
                    if (cellObject.isFatStart) {
                        classes.push(styles.FatStart);
                    }
                    if (cellObject.isFatEnd) {
                        classes.push(styles.FatEnd);
                    }
                }

                if (cellObject.isFatLabel) {
                    classes.push(styles.Relative);
                    content = <div className={`${styles.Label} ${styles.Fat}`}>{cellObject.label}</div>;
                } else if (cellObject.isThinLabel) {
                    classes.push(styles.Relative);
                    content = (
                        <div className={`${styles.Label} ${styles.Thin}`}>
                            {cellObject.label}
                        </div>
                    );
                }

                if (cellObject.isThin) {
                    classes.push(styles.Thin);
                }

                if (cellObject.isThinStart) {
                    classes.push(styles.Relative);
                    content = (
                        <div className={styles.ThinStart}/>
                    )
                }

                if (cellObject.isThinEnd) {
                    classes.push(styles.Relative);
                    content = (
                        <div className={styles.ThinEnd}/>
                    )
                }

                if (cellObject.isThinStart && cellObject.isThinEnd) {
                    classes.push(styles.Relative);
                    content = [
                        <div key="left" className={styles.ThinStart}/>,
                        <div key="right" className={styles.ThinEnd}/>
                    ]
                }

                let className = classes.reduce((prev, cur) => prev + " " + cur);
                resultRow.push(
                    <td key={i * rowLength + j} className={className}>{content}</td>
                )
            }
            result.push(
                <tr key={i}>
                    {resultRow}
                </tr>
            );
        }
        return result;
    }

    applyThinTimelineOptions() {
        let options = this.props.thinLineOptions;
        let curRowLevel = 0;
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let toOptionStart = option.startDate.diff(this.startDate, "days");
            let toOptionEnd = option.endDate.diff(this.startDate, "days");

            this.cellObjects[curRowLevel][toOptionStart].isThinLabel = true;
            this.cellObjects[curRowLevel][toOptionStart].label = option.label;

            this.cellObjects[curRowLevel + 1][toOptionStart].isEmpty = false;
            this.cellObjects[curRowLevel + 1][toOptionStart].isThinStart = true;
            for (let j = toOptionStart; j <= toOptionEnd; j++) {
                this.cellObjects[curRowLevel][j].isThin = true;
            }
            this.cellObjects[curRowLevel + 1][toOptionEnd].isEmpty = false;
            this.cellObjects[curRowLevel + 1][toOptionEnd].isThinEnd = true;

            curRowLevel += 2;
        }
    }

    applyFatTimelineOptions() {
        let options = this.props.fatLineOptions;
        let curRowLevel = this.props.thinLineOptions.length * 2;
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let toOptionStart = option.startDate.diff(this.startDate, "days");
            let toOptionEnd = option.endDate.diff(this.startDate, "days");

            this.cellObjects[curRowLevel][toOptionStart].isEmpty = false;
            this.cellObjects[curRowLevel][toOptionStart].isFat = true;
            this.cellObjects[curRowLevel][toOptionStart].isFatStart = true;
            for (let j = toOptionStart; j <= toOptionEnd; j++) {
                this.cellObjects[curRowLevel][j].isEmpty = false;
                this.cellObjects[curRowLevel][j].isFat = true;
            }
            this.cellObjects[curRowLevel][toOptionEnd].isEmpty = false;
            this.cellObjects[curRowLevel][toOptionEnd].isFat = true;
            this.cellObjects[curRowLevel][toOptionEnd].isFatEnd = true;

            this.cellObjects[curRowLevel + 1][toOptionStart].isFatLabel = true;
            this.cellObjects[curRowLevel + 1][toOptionStart].label = option.label;
            curRowLevel += 2;
        }
    }

    render() {
        this.applyThinTimelineOptions();
        this.applyFatTimelineOptions();
        return (
            <div className={styles.Wrapper}>
                <div/>
                <div className={styles.WrapperScroll}>
                    <Table className={styles.Timeline}>
                        <thead>
                        <tr>
                            {generateFirstLevelCells(this.startDate, this.getWeekCount())}
                        </tr>
                        <tr>
                            {generateSecondLevelCells(this.getWeekCount())}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.generateContentDays()
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

function pushWeekNames(result, startKey) {
    for (let i = 0; i < 7; i++) {
        result.push(<td key={startKey + i}>{moment().day(i).format("ddd")}</td>);
    }
}

function generateEmptyCellObjects(height, width, today) {
    let result = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push({
                isEmpty: true,
                isToday: today === j,
                isSunday: j % 7 === 0,
                isSaturday: (j + 1) % 7 === 0
            });
        }
        result.push(row);
    }
    return result;
}

function getToday(startDate) {
    return moment().startOf("day").diff(startDate, "day");
}

function generateSecondLevelCells(weekCount) {
    let startKey = 0;
    let result = [];
    result.push(<td key="empty"/>);
    for (let i = 0; i < weekCount; i++) {
        pushWeekNames(result, startKey);
        startKey += 7;
    }
    return result;
}

function generateFirstLevelCells(startDate, weekCount) {
    let date = moment(startDate);
    let result = [];
    result.push(<td key="empty"/>);
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

export default Timeline;