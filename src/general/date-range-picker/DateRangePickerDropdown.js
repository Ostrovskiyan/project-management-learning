import React, {Component} from "react";
import {Dropdown} from "react-bootstrap";
import mainStyles from "../../common/Main.css";
import styles from "./DateRangePicker.css";
import DateRangePicker from "./DateRangePicker";

class DateRangePickerDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            open: true
        });
    };

    handleToggle = (isOpen, event) => {
        if (event.type !== "react-select" && isOpen !== this.state.open) {
            this.setState({
                open: isOpen
            });
        }
    };

    handleCancel = () => {
        this.setState({
            open: false
        });
    };

    handleSubmit = (startDate, endDate) => {
        let {onDateChange} = this.props;
        onDateChange(startDate, endDate);
        this.setState({
            open: false
        });
    };

    render() {
        let {
            id,
            startDate,
            endDate,
            toggleComponent: ToggleComponent,
            dropdownStyle,
            dateRangePickerHeader,
        } = this.props;

        let isOpen = this.state.open;
        return (
            <Dropdown id={id}
                      className={`${styles.Dropdown} ${dropdownStyle ? dropdownStyle : ""}`}
                      bsStyle="link"
                      open={isOpen}
                      onToggle={this.handleToggle}>
                <Dropdown.Toggle bsStyle="link"
                                 noCaret
                                 className={mainStyles.MinimizeDropdown}
                                 onClick={this.handleClick}>
                    <ToggleComponent/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {isOpen ?
                        <DateRangePicker onCancel={this.handleCancel}
                                         onSubmit={this.handleSubmit}
                                         startDate={startDate}
                                         header={dateRangePickerHeader}
                                         endDate={endDate}/>
                        : null}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default DateRangePickerDropdown;