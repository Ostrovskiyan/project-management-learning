import React, {Component} from "react";
import styles from "./ImmediateInput.css";
import {Button, Form, Glyphicon} from "react-bootstrap";

class ImmediateInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: props.isActive || false
        };
    }

    toggleActive = (isActive) => {
        let {
            onToggle,
        } = this.props;
        this.setState({
            isActive,
        });
        if (onToggle) {
            onToggle(isActive);
        }
    };

    componentDidMount() {
        let {isActive} = this.state;
        if (isActive) {
            this.input.focus();
        }
    }

    componentDidUpdate() {
        let {isActive} = this.state;
        if (isActive) {
            this.input.focus();
        }
    }

    handleFocusEnd = (event) => {
        if(this.props.submitOnBlur) {
            this.handleSubmit(event);
            return;
        }
        event.preventDefault();
        this.toggleActive(false);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.input.value);
        this.toggleActive(false);
    };

    handleClick = (event) => {
        event.preventDefault();
        this.toggleActive(true);
    };

    render() {
        let {
            inactiveStyle,
            inactiveWrapperStyle,
            glyphStyle,
            textStyle,
            text,
            inactiveComponent: InactiveComponent,
            inactiveProps,
            activeStyle,
            activeInputStyle,
            activeComponent: ActiveComponent,
            activeProps,
            placeholder,
            textArea,
            textAreaRows,
            defaultValue = "",
            withoutPlus,
        } = this.props;
        let {isActive} = this.state;

        if (isActive) {
            if (ActiveComponent) {
                return <ActiveComponent ref={(input) => {
                    this.input = input
                }}
                                        onSubmit={this.handleSubmit}
                                        onBlur={this.handleFocusEnd}
                                        {...activeProps}/>
            } else {
                return (
                    <Form inline className={activeStyle || ""} onSubmit={this.handleSubmit}>
                        {
                            !textArea ?
                                <input type="text"
                                       className={`form-control ${activeInputStyle || ""}`}
                                       placeholder={placeholder}
                                       ref={(input) => {
                                           this.input = input
                                       }}
                                       onBlur={this.handleFocusEnd}
                                       defaultValue={defaultValue}/>
                                :
                                <textarea className={`form-control ${activeInputStyle || ""}`}
                                          rows={textAreaRows ? textAreaRows.toString() : "5"}
                                          placeholder={placeholder}
                                          ref={(input) => {
                                              this.input = input
                                          }}
                                          onBlur={this.handleFocusEnd}
                                          defaultValue={defaultValue}/>

                        }
                    </Form>
                );
            }

        } else {
            if (InactiveComponent) {
                return <InactiveComponent onClick={this.handleClick}
                                          {...inactiveProps}/>
            } else {
                return (
                    <div className={inactiveWrapperStyle}>
                        <Button bsStyle="link"
                                className={`${styles.Button} ${inactiveStyle || ""}`}
                                onClick={this.handleClick}>
                            {
                                !withoutPlus ?
                                    <Glyphicon glyph="glyphicon glyphicon-plus"
                                               className={glyphStyle || ""}/>
                                    : null
                            }
                            <span className={textStyle || ""}>
                                {text}
                            </span>
                        </Button>
                    </div>
                )
            }
        }
    }
}

export default ImmediateInput;