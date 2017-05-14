import React, {Component} from "react";
import {Dropdown} from "react-bootstrap";
import styles from "./DropdownInput.css";
import mainStyles from "../../common/Main.css";

class DropdownInput extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {open: false};
    }

    handleSubmit(value) {
        this.props.onSubmit(value);
        this.setState({
            open: false
        });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            open: true
        });
    }

    handleToggle(isOpen, event) {
        if (event.type !== "react-select" && isOpen !== this.state.open) {
            this.setState({
                open: isOpen
            });
        }
    }

    render() {
        let {
            toggleProps,
            toggle: Toggle,
            contentProps,
            content: Content,
            id
        } = this.props;
        let {
            open
        } = this.state;

        return (
            <Dropdown id={id} bsStyle="link" open={open} onToggle={this.handleToggle}>
                <Dropdown.Toggle bsStyle="link" noCaret
                                 className={mainStyles.MinimizeDropdown}
                                 onClick={this.handleClick}>
                    <Toggle {...toggleProps}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Content ref={input => this.input = input}
                             onSubmit={this.handleSubmit}
                             {...contentProps}/>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default DropdownInput;