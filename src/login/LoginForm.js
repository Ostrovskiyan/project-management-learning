import React, {Component} from 'react';
import {Form, FormGroup} from "react-bootstrap";
import Logo from "./Logo"
import LoginFooter from "./LoginFooter"
import LoginMessage from "./LoginMessage";

class LoginForm extends Component {
    render() {
        let message = this.props.error && <LoginMessage message="Введите действующий адрес эл. почты."/>;
        let inputLight = this.props.error &&
                            (<div className="InputLightWrapper">
                                <div className="InputLight"/>
                            </div>);
        return (
            <Form>
                <Logo/>
                {message}
                <FormGroup>
                    {inputLight}
                    <input type="email" className="form-control LoginInput" placeholder="Эл. почта" defaultValue={this.props.email}/>
                </FormGroup>
                <FormGroup className="form-group">
                    <input type="password" className={"form-control LoginInput " + (this.props.password && "Backlight")} placeholder="Пароль" defaultValue={this.props.password}/>
                </FormGroup>
                <LoginFooter/>
            </Form>
        )
    }
}

export default LoginForm;