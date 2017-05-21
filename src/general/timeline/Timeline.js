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
        startDate = startDate.day(0);
        endDate = endDate.day(6);
        let height = 2 * (thinLineOptions.length + fatLineOptions.length) + 2;
        if (thinLineOptions.length === 0) {
            height += 2;
        }
        let cells = generateEmptyCellObjects(height, getDayCount(startDate, endDate), getToday(startDate));
        cells = this.applyThinTimelineOptions(cells, startDate, thinLineOptions);
        cells = this.applyFatTimelineOptions(cells, startDate, fatLineOptions, thinLineOptions);
        this.state = {
            startDate,
            endDate,
            today: getToday(startDate),
            cellObjects: cells,
        };
    }

    componentWillReceiveProps(nextProps) {
        let {
            startDate,
            endDate,
            thinLineOptions = [],
            fatLineOptions = [],
        } = nextProps;
        startDate = startDate.day(0);
        endDate = endDate.day(6);
        let height = 2 * (thinLineOptions.length + fatLineOptions.length) + 2;
        if (thinLineOptions.length === 0) {
            height += 2;
        }
        let cells = generateEmptyCellObjects(height, getDayCount(startDate, endDate), getToday(startDate));
        cells = this.applyThinTimelineOptions(cells, startDate, thinLineOptions);
        cells = this.applyFatTimelineOptions(cells, startDate, fatLineOptions, thinLineOptions);
        this.setState({
            startDate,
            endDate,
            today: getToday(startDate),
            cellObjects: cells,
        });
    }
    
    generateContentDays(cellObjects) {
        let result = [];
        let columnLength = cellObjects.length;
        let rowLength = cellObjects[0].length;
        for (let i = 0; i < columnLength; i++) {
            let resultRow = [];
            resultRow.push(<td key="empty"/>);
            for (let j = 0; j < rowLength; j++) {
                let classes = [];
                let cellObject = cellObjects[i][j];
                let content = null;
                if (cellObject.isEmpty) {
                    classes.push(styles.Content);
                    if (cellObject.isToday) {
                        classes.push(styles.Today);
                    }
                    if (cellObject.withoutRightBorder) {
                        classes.push(styles.WithoutRightBorder);
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

    applyThinTimelineOptions(cellObjects, startDate, options) {
        let curRowLevel = 0;
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let toOptionStart = option.startDate.diff(startDate, "days");
            let toOptionEnd = option.endDate.diff(startDate, "days");

            cellObjects[curRowLevel][toOptionStart].isThinLabel = true;
            cellObjects[curRowLevel][toOptionStart].label = option.label;

            cellObjects[curRowLevel + 1][toOptionStart].isThinStart = true;
            for (let j = toOptionStart; j <= toOptionEnd; j++) {
                cellObjects[curRowLevel][j].isThin = true;
            }
            cellObjects[curRowLevel + 1][toOptionEnd].isThinEnd = true;

            curRowLevel += 2;
        }
        return cellObjects;
    }

    applyFatTimelineOptions(cellObjects, startDate, fatLineOptions, thinLineOptions) {
        let options = fatLineOptions;
        let curRowLevel = thinLineOptions.length > 0 ? thinLineOptions.length * 2 : 2;
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let toOptionStart = option.startDate.diff(startDate, "days");
            let toOptionEnd = option.endDate.diff(startDate, "days");

            cellObjects[curRowLevel][toOptionStart].isEmpty = false;
            cellObjects[curRowLevel][toOptionStart].isFat = true;
            cellObjects[curRowLevel][toOptionStart].isFatStart = true;
            for (let j = toOptionStart; j <= toOptionEnd; j++) {
                cellObjects[curRowLevel][j].isEmpty = false;
                cellObjects[curRowLevel][j].isFat = true;
            }
            cellObjects[curRowLevel][toOptionEnd].isEmpty = false;
            cellObjects[curRowLevel][toOptionEnd].isFat = true;
            cellObjects[curRowLevel][toOptionEnd].isFatEnd = true;

            cellObjects[curRowLevel + 1][toOptionStart].isFatLabel = true;
            cellObjects[curRowLevel + 1][toOptionStart].label = option.label;
            curRowLevel += 2;
        }
        return cellObjects;
    }

    render() {
        let {
            startDate,
            endDate,
            cellObjects,
        } = this.state;
        return (
            <div className={styles.Wrapper}>
                <div/>
                <div className={styles.WrapperScroll}>
                    <Table className={styles.Timeline}>
                        <thead>
                        <tr>
                            {generateFirstLevelCells(startDate, getWeekCount(startDate, endDate) )}
                        </tr>
                        <tr>
                            {generateSecondLevelCells(getWeekCount(startDate, endDate) )}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.generateContentDays(cellObjects)
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
            row[j] = {
                isEmpty: true,
                isFat:false,
                isFatStart:false,
                isFatEnd:false,
                isToday: today === j,
                isSunday: j % 7 === 0,
                isSaturday: (j + 1) % 7 === 0,
                withoutRightBorder: today - 1 === j,
            };
        }
        result[i] = row;
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

function getWeekCount(startDate, endDate) {
    let diff = endDate.diff(startDate, "days") + 1;
    return diff / 7;
}

function getDayCount(startDate, endDate)  {
    return getWeekCount(startDate, endDate)  * 7;
}


export default Timeline;