import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import {Button, Form, FormGroup, InputGroup} from "react-bootstrap";
import MonthCalendar from "./MonthCalendar";
import moment from "moment";
import Checkbox from "../../general/Checkbox";

const Options = {
    IN_QUEUE: "IN_QUEUE",
    TODAY: "TODAY",
    TOMORROW: "TOMORROW",
    NEXT_WEEK: "NEXT_WEEK",
    SELECT_DATE: "SELECT_DATE"
};

const DATE_PATTERN = "DD/MM/YYYY";

class UpdateIssueDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daysFocus: false,
            selectedOption: Options.TOMORROW,
            currentMonth: moment().startOf('day'),
            startDate: moment().startOf('day'),
            endDate: moment().startOf('day'),
            selectedDate: undefined,
            daysDraft: undefined,
            withWeekends: false
        };
        this.handleDaysFocus = this.handleDaysFocus.bind(this);
        this.handleDaysBlur = this.handleDaysBlur.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
    }

    static createHandleSelectOption(option, toBind) {
        return function (event) {
            event.preventDefault();
            this.setState({
                selectedOption: option
            });
        }.bind(toBind);
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            selectedDate: undefined
        })
    };

    handleDaysAddonClick = (event) => {
        event.preventDefault();
        this.daysInput.focus();
    };

    handleNextMonth(event) {
        event.preventDefault();
        let currentMonth = moment(this.state.currentMonth);
        currentMonth.add(1, "months");

        this.setState({
            currentMonth: currentMonth
        })
    }

    handlePreviousMonth(event) {
        event.preventDefault();
        let currentMonth = moment(this.state.currentMonth);
        currentMonth.subtract(1, "months");

        this.setState({
            currentMonth: currentMonth
        })
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.props.onCancel();
    };

    handleNextSelectedDate = () => {
        let selectedDate = this.state.selectedDate;
        let newDate = moment(this.state[selectedDate]);
        newDate.add(1, "days");
        this.setState({
            [selectedDate]: newDate
        });
        this[selectedDate + "Input"].focus();
    };

    handlePreviousSelectedDate = () => {
        let selectedDate = this.state.selectedDate;
        let newDate = moment(this.state[selectedDate]);
        newDate.subtract(1, "days");
        this.setState({
            [selectedDate]: newDate
        });
        this[selectedDate + "Input"].focus();
    };

    handleCalendarDayClick = (date) => {
        let selectedDate = this.state.selectedDate;
        if (selectedDate) {
            let newDate = moment(date);
            this.setState({
                [selectedDate]: newDate
            });
            this[selectedDate + "Input"].focus();
        }
    };

    handleStartDateClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            selectedDate: 'startDate'
        });
    };

    handleEndDateClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            selectedDate: 'endDate'
        });
    };

    handleChangeStartDate = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            startDateDraft: value
        });
    };

    handleStartDateBlur = (event) => {
        event.preventDefault();
        let {startDateDraft, startDate} = this.state;
        if (moment(startDateDraft, DATE_PATTERN).isValid()) {
            startDate = moment(startDateDraft, DATE_PATTERN);
        }
        this.setState({
            startDate,
            startDateDraft: undefined
        });
    };

    handleChangeEndDate = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            endDateDraft: value
        });
    };

    handleEndDateBlur = (event) => {
        event.preventDefault();
        let {endDateDraft, endDate} = this.state;
        if (moment(endDateDraft, DATE_PATTERN).isValid()) {
            endDate = moment(endDateDraft, DATE_PATTERN);
        }
        this.setState({
            endDate,
            endDateDraft: undefined
        });
    };

    handleChangeDays = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            daysDraft: value
        });
    };

    handleDaysFocus(event) {
        event.preventDefault();
        this.setState({
            daysFocus: true
        });
    }

    handleDaysBlur(event) {
        event.preventDefault();
        let {daysDraft, startDate, endDate, withWeekends} = this.state;
        let daysDraftNumber = Number(daysDraft);
        if (!isNaN(daysDraftNumber) && daysDraftNumber > 0) {
            if (withWeekends) {
                endDate = moment(startDate).add(daysDraftNumber - 1, "days");
            } else {
                let localStart = moment(startDate.format(DATE_PATTERN), DATE_PATTERN);
                let toAdd = daysDraftNumber - 1;
                let dayOfWeek = localStart.day();
                let toMonday = ((7 - dayOfWeek) + 1) % 7;
                let weekendsToMon = dayOfWeek === 0 ? 1 : 2;
                if (toMonday === 0 || (toMonday - weekendsToMon <= toAdd && toMonday - weekendsToMon >= 0)) {
                    let needed = toMonday === 0 ? toAdd : toAdd - toMonday + weekendsToMon;
                    toAdd = toMonday;

                    toAdd += ((needed - (needed % 5)) / 5) * 7;
                    toAdd += needed % 5;
                }
                endDate = moment(startDate).add(toAdd, "days");
            }
        }
        this.setState({
            daysFocus: false,
            daysDraft: undefined,
            endDate
        });
    }

    handleWithWeekendChange = (withWeekends) => {
        this.setState({
            withWeekends,
        });
    };

    getDays = (startDate,
               endDate,
               withWeekends) => {
        if (withWeekends) {
            return endDate.diff(startDate, 'days') + 1;
        } else {
            startDate = moment(startDate.format(DATE_PATTERN), DATE_PATTERN);
            endDate = moment(endDate.format(DATE_PATTERN), DATE_PATTERN);
            debugger;
            let realDiff = endDate.diff(startDate, 'days') + 1;
            let dayOfWeek = startDate.day();
            let weekendCount = 0;
            if (dayOfWeek === 0) {
                weekendCount++;
            }
            let toSaturday = 6 - dayOfWeek;
            if (toSaturday < realDiff) {
                let fromSat = realDiff - toSaturday;
                weekendCount += ((fromSat - fromSat % 7) / 7) * 2;
                if (fromSat % 7 !== 0) {
                    weekendCount += fromSat % 7 === 1 ? 1 : 2;
                }
            } else if (dayOfWeek === 6) {
                weekendCount++;
            }
            return realDiff - weekendCount;
        }
    };

    render() {
        let {
            currentMonth,
            selectedDate,
            startDate,
            startDateDraft,
            endDate,
            endDateDraft,
            daysDraft,
            withWeekends,
        } = this.state;

        let days = daysDraft || this.getDays(startDate, endDate, withWeekends);

        let inputStartDateValue = startDateDraft || startDate.format(DATE_PATTERN);
        let inputEndDateValue = endDateDraft || endDate.format(DATE_PATTERN);

        currentMonth = moment(currentMonth);
        let nextMonth = moment(currentMonth).add(1, "months");
        let selected = selectedDate && moment(this.state[selectedDate]);

        return (
            <div className={styles.Main} onClick={this.handleClick}>
                <div className={styles.Header}>Когда эта задача должна быть готова?</div>
                <div className={styles.Options}>
                    <div
                        className={`${styles.Option} ${this.state.selectedOption === Options.IN_QUEUE ? styles.Selected : ""}`}
                        onClick={UpdateIssueDate.createHandleSelectOption(Options.IN_QUEUE, this)}>
                        В ОЧЕРЕДИ
                    </div>
                    <div
                        className={`${styles.Option} ${this.state.selectedOption === Options.TODAY ? styles.Selected : ""}`}
                        onClick={UpdateIssueDate.createHandleSelectOption(Options.TODAY, this)}>
                        СЕГОДНЯ
                    </div>
                    <div
                        className={`${styles.Option} ${this.state.selectedOption === Options.TOMORROW ? styles.Selected : ""}`}
                        onClick={UpdateIssueDate.createHandleSelectOption(Options.TOMORROW, this)}>
                        ЗАВТРА
                    </div>
                    <div
                        className={`${styles.Option} ${this.state.selectedOption === Options.NEXT_WEEK ? styles.Selected : ""}`}
                        onClick={UpdateIssueDate.createHandleSelectOption(Options.NEXT_WEEK, this)}>
                        НА СЛЕД. НЕДЕЛЕ.
                    </div>
                    <div
                        className={`${styles.Option} ${this.state.selectedOption === Options.SELECT_DATE ? styles.Selected : ""}`}
                        onClick={UpdateIssueDate.createHandleSelectOption(Options.SELECT_DATE, this)}>
                        ВЫБРАТЬ ДАТУ
                    </div>
                </div>
                <div className={styles.Results}>
                    <div className={styles.DateResult}>
                        <div className={styles.ResultHeader}>
                            Даты:
                        </div>
                        <div>
                            <Form inline>
                                <FormGroup className={styles.DateInputWrapper}>
                                    <InputGroup>
                                        <input type="text"
                                               value={inputStartDateValue}
                                               className={`${styles.ResultInput} form-control`}
                                               onClick={this.handleStartDateClick}
                                               onChange={this.handleChangeStartDate}
                                               onBlur={this.handleStartDateBlur}
                                               ref={input => this.startDateInput = input}/>
                                    </InputGroup>
                                </FormGroup>
                                <span className={styles.BetweenDates}> &#8211; </span>
                                <FormGroup className={styles.DateInputWrapper}>
                                    <InputGroup>
                                        <input type="text"
                                               value={inputEndDateValue}
                                               className={`${styles.ResultInput} form-control`}
                                               onClick={this.handleEndDateClick}
                                               onChange={this.handleChangeEndDate}
                                               onBlur={this.handleEndDateBlur}
                                               ref={input => this.endDateInput = input}/>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <div>
                        <div className={styles.ResultHeader}>
                            Длительность:
                        </div>
                        <div className={styles.DaysWrapper}>
                            <FormGroup>
                                <InputGroup className={this.state.daysFocus ? styles.DaysFocus : styles.DaysBlur}>
                                    <input type="text"
                                           value={days}
                                           className={`${styles.Days} ${styles.ResultInput} form-control`}
                                           onChange={this.handleChangeDays}
                                           onFocus={this.handleDaysFocus}
                                           onBlur={this.handleDaysBlur}
                                           ref={input => this.daysInput = input}/>
                                    <InputGroup.Addon onClick={this.handleDaysAddonClick}>
                                        день
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div className={styles.Calendar}>
                    <div className={styles.CalendarHeader}>
                        <div className={`${styles.Navigation} ${styles.Left}`} onClick={this.handlePreviousMonth}>
                            <i className="fa fa-play fa-flip-horizontal" aria-hidden="true"/>
                        </div>
                        <div className={styles.CalendarHeaderText}>
                            {currentMonth.format("MMMM")}
                        </div>
                        <div className={styles.CalendarHeaderText}>
                            {currentMonth.format("YYYY") + (currentMonth.year() !== nextMonth.year() ? " / " + nextMonth.format("YYYY") : "")}
                        </div>
                        <div className={styles.CalendarHeaderText}>
                            {nextMonth.format("MMMM")}
                        </div>
                        <div className={`${styles.Navigation} ${styles.Right}`} onClick={this.handleNextMonth}>
                            <i className="fa fa-play" aria-hidden="true"/>
                        </div>
                    </div>
                    <div>
                        <MonthCalendar month={currentMonth.month()}
                                       year={currentMonth.year()}
                                       selectedDate={selected}
                                       startDate={startDate}
                                       endDate={endDate}
                                       onDayClick={this.handleCalendarDayClick}
                                       handleNextSelectedDate={this.handleNextSelectedDate}
                                       handlePreviousSelectedDate={this.handlePreviousSelectedDate}
                                       withWeekends={withWeekends}/>
                        <MonthCalendar month={nextMonth.month()}
                                       year={nextMonth.year()}
                                       selectedDate={selected}
                                       startDate={startDate}
                                       endDate={endDate}
                                       onDayClick={this.handleCalendarDayClick}
                                       handleNextSelectedDate={this.handleNextSelectedDate}
                                       handlePreviousSelectedDate={this.handlePreviousSelectedDate}
                                       withWeekends={withWeekends}
                                       right/>
                    </div>
                </div>

                <div className={styles.Footer}>
                    <Button bsStyle="primary" className={styles.Ok}>OK</Button>
                    <Button className={styles.Cancel} onClick={this.handleCancel}>Отмена</Button>
                    <Checkbox wrapperStyle={styles.WorkWeekend}
                              text="работа на выходных"
                              checked={withWeekends}
                              onChange={this.handleWithWeekendChange}/>
                </div>
            </div>
        )
    }
}

export default UpdateIssueDate;