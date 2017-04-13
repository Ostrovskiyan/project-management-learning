import React, {Component} from 'react';
import {Form, FormGroup} from "react-bootstrap";
import Logo from "./Logo"
import LoginFooter from "./LoginFooter"

class LoginForm extends Component {
    render() {
        return (
            <Form>
                <Logo/>
                <FormGroup className="Note">
                    Введите действующий адрес эл. почты.
                </FormGroup>
                <FormGroup>
                    <div className="TipWrapper">
                        <div className="Tip"/>
                    </div>
                    <input type="email" className="form-control LoginInput" placeholder="Эл. почта"/>
                </FormGroup>
                <FormGroup className="form-group">
                    <input type="password" className="form-control LoginInput Backlight" placeholder="Пароль"/>
                </FormGroup>
                <LoginFooter/>
            </Form>
        )
    }
}

export default LoginForm;