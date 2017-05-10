import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";
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

class UpdateIssueDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daysFocus: false,
            selectedOption: Options.TOMORROW,
            currentMonth: moment(),
            startDate: moment(),
            endDate: moment(),
            selectedDate: undefined
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

    handleDaysFocus(event) {
        event.preventDefault();
        this.setState({
            daysFocus: true
        });
    }

    handleDaysBlur(event) {
        event.preventDefault();
        this.setState({
            daysFocus: false
        });
    }

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
        let startDate = moment(this.state[this.state.selectedDate]);
        startDate.add(1, "days");
        this.setState({
            startDate
        });
        this[this.state.selectedDate + "Input"].focus();
    };

    handlePreviousSelectedDate = () => {
        let startDate = moment(this.state[this.state.selectedDate]);
        startDate.subtract(1, "days");
        this.setState({
            startDate
        });
        this[this.state.selectedDate + "Input"].focus();
    };

    handleStartDateClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            selectedDate: 'startDate'
        });
    };

    render() {
        let currentMonth = moment(this.state.currentMonth);
        let nextMonth = moment(this.state.currentMonth);
        let selected = this.state.selectedDate && moment(this.state[this.state.selectedDate]);
        nextMonth.add(1, "months");

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
                                        <input  type="text"
                                                value={this.state.startDate.format("DD/MM/YYYY")}
                                                className={`${styles.ResultInput} form-control`}
                                                onClick={this.handleStartDateClick}
                                                ref={input => this.startDateInput = input}/>
                                    </InputGroup>
                                </FormGroup>
                                <span className={styles.BetweenDates}> &#8211; </span>
                                <FormGroup className={styles.DateInputWrapper}>
                                    <InputGroup>
                                        <input  type="text"
                                                value={this.state.endDate.format("DD/MM/YYYY")}
                                                className={`${styles.ResultInput} form-control`}/>
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
                                    <input type="text" defaultValue={this.state.startDate.diff(this.state.endDate) + 1}
                                           className={`${styles.Days} ${styles.ResultInput} form-control`}
                                           onFocus={this.handleDaysFocus} onBlur={this.handleDaysBlur}
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
                                       handleNextSelectedDate={this.handleNextSelectedDate}
                                       handlePreviousSelectedDate={this.handlePreviousSelectedDate}/>
                        <MonthCalendar month={nextMonth.month()}
                                       year={nextMonth.year()}
                                       selectedDate={selected}
                                       handleNextSelectedDate={this.handleNextSelectedDate}
                                       handlePreviousSelectedDate={this.handlePreviousSelectedDate}
                                       right/>
                    </div>
                </div>

                <div className={styles.Footer}>
                    <Button bsStyle="primary" className={styles.Ok}>OK</Button>
                    <Button className={styles.Cancel} onClick={this.handleCancel}>Отмена</Button>
                    <Checkbox wrapperStyle={styles.WorkWeekend} text="работа на выходных"/>
                </div>
            </div>
        )
    }
}

export default UpdateIssueDate;