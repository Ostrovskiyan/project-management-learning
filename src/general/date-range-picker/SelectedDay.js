import React, {Component} from "react";
import styles from "./DateRangePicker.css";

class SelectedDay extends Component {

    onNext = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.handleNext();
    };

    onPrevious = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.handlePrevious();
    };

    render() {
        let {day} = {...this.props};

        return (
            <div className={styles.SelectedDay}>
                <div className={`${styles.Nav} ${styles.Left}`} onClick={this.onPrevious}>
                    <i className="fa fa-play fa-flip-horizontal" aria-hidden="true"/>
                </div>
                <div className={styles.Content}>{day}</div>
                <div className={`${styles.Nav} ${styles.Right}`} onClick={this.onNext}>
                    <i className="fa fa-play" aria-hidden="true"/>
                </div>
            </div>
        )
    }
}

export default SelectedDay;