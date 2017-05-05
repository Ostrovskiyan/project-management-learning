import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import {Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";

class UpdateIssueDate extends Component {

    constructor(props) {
        super(props);
        this.state = {daysFocus: false};
        this.handleDaysFocus = this.handleDaysFocus.bind(this);
        this.handleDaysBlur = this.handleDaysBlur.bind(this);
    }

    handleDaysFocus(event) {
        event.preventDefault();
        this.setState({
            ...this.state,
            daysFocus: true
        });
    }

    handleDaysBlur(event) {
        event.preventDefault();
        this.setState({
            ...this.state,
            daysFocus: false
        });
    }

    render() {
        return (
            <div className={styles.Main}>
                <div className={styles.Header}>Когда эта задача должна быть готова?</div>
                <div className={styles.Options}>
                    <div className={styles.Option}>В ОЧЕРЕДИ</div>
                    <div className={styles.Option}>СЕГОДНЯ</div>
                    <div className={`${styles.Option} ${styles.Selected}`}>ЗАВТРА</div>
                    <div className={styles.Option}>НА СЛЕД. НЕДЕЛЕ.</div>
                    <div className={styles.Option}>ВЫБРАТЬ ДАТУ</div>
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
                                        <FormControl type="text" defaultValue="10/10/2016" className={styles.ResultInput}/>
                                    </InputGroup>
                                </FormGroup>
                                <span className={styles.BetweenDates}> &#8211; </span>
                                <FormGroup className={styles.DateInputWrapper}>
                                    <InputGroup>
                                        <FormControl type="text" defaultValue="10/10/2016" className={styles.ResultInput}/>
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
                                    <FormControl type="text" defaultValue="1" className={`${styles.Days} ${styles.ResultInput}`} onFocus={this.handleDaysFocus} onBlur={this.handleDaysBlur}/>
                                    <InputGroup.Addon>день</InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateIssueDate;