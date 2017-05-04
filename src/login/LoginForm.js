import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Row} from "react-bootstrap";
import Logo from "./Logo"
import LoginMessage from "./LoginMessage";
import {proccessLogining} from "../actions/profile";
import {connect} from "react-redux";
import styles from "./LoginPage.css";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.dispatch(proccessLogining(this.login.value, this.password.value));
        event.preventDefault();
    }

    render() {
        let message = this.props.loginFailMessage && <LoginMessage message={this.props.loginFailMessage}/>;
        let inputLight = this.props.loginFailMessage &&
            (<div className={styles.InputLightWrapper}>
                <div className={styles.InputLight}/>
            </div>);
        return (
            <Form onSubmit={this.handleSubmit}>
                <Logo/>
                {message}
                <FormGroup>
                    {inputLight}
                    <input type="text" className={`form-control ${styles.LoginInput}`} ref={(login) => this.login = login}
                           placeholder="Эл. почта" defaultValue={this.props.login}/>
                </FormGroup>
                <FormGroup className="form-group">
                    <input type="password" className={`form-control ${styles.LoginInput} ` + (this.props.password && styles.Backlight)}
                           ref={(password) => this.password = password} placeholder="Пароль"
                           defaultValue={this.props.password}/>
                </FormGroup>
                <Row>
                    <Col xsOffset={7} xs={5}>
                        <Button type="submit" bsStyle="primary" className={styles.LoginButton} block disabled={this.props.logining}>
                            Вход
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.profile.login,
        password: state.profile.password,
        loginFailMessage: state.profile.loginFailMessage,
        logining: state.profile.logining
    }
}

export default connect(mapStateToProps)(LoginForm)