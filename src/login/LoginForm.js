import React, {Component} from 'react';
import {Form, FormGroup} from "react-bootstrap";
import Logo from "./Logo"
import LoginFooter from "./LoginFooter"

class LoginForm extends Component {
    render() {
        return (
            <Form>
                <Logo/>
                <FormGroup>
                    <input type="email" className="form-control LoginInput" placeholder="Эл. почта"/>
                </FormGroup>
                <FormGroup className="form-group">
                    <input type="password" className="form-control LoginInput" placeholder="Пароль"/>
                </FormGroup>
                <LoginFooter/>
            </Form>
        )
    }
}

export default LoginForm;