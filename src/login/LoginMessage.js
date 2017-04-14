import React, {Component} from 'react';
import {FormGroup} from "react-bootstrap";

class LoginMessage extends Component {
    render() {
        return (
            <FormGroup className="Note">
                {this.props.message}
            </FormGroup>
        )
    }
}

export default LoginMessage;