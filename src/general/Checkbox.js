import React, {Component} from 'react';
import styles from "./Checkbox.css"
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
        this.setState({
            checked: !this.state.checked
        });
    };

    render() {
        let {text, wrapperStyle, checkboxStyle, textStyle, okStyle} = {...this.props};
        return (
            <div className={`${styles.Wrapper} ${wrapperStyle || ""}`} onClick={this.handleClick}>
                <div className={`${styles.Checkbox} ${checkboxStyle || ""}`}>
                    {this.state.checked ?
                        <Glyphicon glyph="glyphicon glyphicon-ok" className={`${styles.Glyph} ${okStyle || ""}`}/>
                        : ""
                    }
                </div>
                <div className={`${styles.Text} ${textStyle || ""}`}>
                    {text}
                </div>
            </div>
        )
    }
}

export default Checkbox;