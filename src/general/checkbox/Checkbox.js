import React, {Component} from "react";
import styles from "./Checkbox.css";
import {Glyphicon} from "react-bootstrap";

class Checkbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked || false
        };
    }

    handleClick = (event) => {
        event.preventDefault();
        let {onChange, readOnly} = this.props;
        let {checked} = this.state;

        let newResult = !checked;
        if (readOnly) {
            newResult = checked;
        } else {
            if (onChange) {
                onChange(newResult);
            }
        }
        this.setState({
            checked: newResult
        });
    };

    render() {
        let {
            text,
            wrapperStyle,
            checkboxStyle,
            textStyle,
            okStyle,
            withoutText,
        } = this.props;
        let {checked} = this.state;
        return (
            <div className={`${styles.Wrapper} ${wrapperStyle || ""}`} onClick={this.handleClick}>
                <div className={`${styles.Checkbox} ${checkboxStyle || ""}`}>
                    {checked ?
                        <Glyphicon glyph="glyphicon glyphicon-ok" className={`${styles.Glyph} ${okStyle || ""}`}/>
                        : ""
                    }
                </div>
                {withoutText ? null :
                    <div className={`${styles.Text} ${textStyle || ""}`}>
                        {text}
                    </div>
                }
            </div>
        )
    }
}

export default Checkbox;