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

    componentDidMount() {
        let {isActive} = this.state;
        if(isActive) {
            this.input.focus();
        }
    }

    componentDidUpdate() {
        let {isActive} = this.state;
        if(isActive) {
            this.input.focus();
        }
    }

    handleFocusEnd = (event) => {
        event.preventDefault();
        this.setState({
            isActive: false,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.input.value);
        this.setState({
            isActive: false,
        });
    };

    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            isActive: true,
        });
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
        } = this.props;
        let {isActive} = this.state;

        if (isActive) {
            if(ActiveComponent) {
                return <ActiveComponent ref={(input) => {
                                            this.input = input
                                        }}
                                        onSubmit={this.handleSubmit}
                                        onBlur={this.handleFocusEnd}
                                        {...activeProps}/>
            } else {
                return  <Form inline className={activeStyle || ""} onSubmit={this.handleSubmit}>
                            <input type="text"
                                   className={`form-control ${activeInputStyle || ""}`}
                                   placeholder={placeholder}
                                   ref={(input) => {
                                       this.input = input
                                   }}
                                   onBlur={this.handleFocusEnd}/>
                        </Form>;
            }

        } else {
            if(InactiveComponent) {
                return <InactiveComponent onClick={this.handleClick}
                                          {...inactiveProps}/>
            } else {
                return  <div className={inactiveWrapperStyle}>
                            <Button bsStyle="link"
                                    className={`${styles.Button} ${inactiveStyle || ""}`}
                                    onClick={this.handleClick}>
                                <Glyphicon glyph="glyphicon glyphicon-plus"
                                           className={glyphStyle || ""}/>
                                <span className={textStyle || ""}>
                                    {text}
                                </span>
                            </Button>
                        </div>
            }
        }
    }
}

export default ImmediateInput;