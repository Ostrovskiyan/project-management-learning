import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";
import MonthCalendar from "./MonthCalendar";
import moment from "moment";

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
            currentDate: moment()
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
    }

    render() {
        let currentMonth = moment(this.state.currentMonth);
        let nextMonth = moment(this.state.currentMonth);
        nextMonth.add(1, "months");

        return (
            <div className={styles.Main}>
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
                                        <FormControl type="text" defaultValue="10/10/2016"
                                                     className={styles.ResultInput}/>
                                    </InputGroup>
                                </FormGroup>
                                <span className={styles.BetweenDates}> &#8211; </span>
                                <FormGroup className={styles.DateInputWrapper}>
                                    <InputGroup>
                                        <FormControl type="text" defaultValue="10/10/2016"
                                                     className={styles.ResultInput}/>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <div>
                        <div className={styles.ResultHeader}>
                            Длительность:
                        </div>
                        <div>
                            <FormGroup>
                                <InputGroup className={this.state.daysFocus ? styles.DaysFocus : styles.DaysBlur}>
                                    <FormControl type="text" defaultValue="1"
                                                 className={`${styles.Days} ${styles.ResultInput}`}
                                                 onFocus={this.handleDaysFocus} onBlur={this.handleDaysBlur}/>
                                    <InputGroup.Addon>день</InputGroup.Addon>
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
                        <MonthCalendar month={currentMonth.month()} year={currentMonth.year()}/>
                        <MonthCalendar month={nextMonth.month()} year={nextMonth.year()} right/>
                    </div>
                </div>

                <div className={styles.Footer}>
                    <Button bsStyle="primary" className={styles.Ok}>OK</Button>
                    <Button className={styles.Cancel} onClick={this.handleCancel}>Отмена</Button>
                    <div className={styles.WorkWeekend}>
                        <input type="checkbox"/>
                        работа на выходных
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateIssueDate;