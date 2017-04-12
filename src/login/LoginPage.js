import React, { Component } from 'react';
import {Col, Grid, Row, Form, FormGroup} from "react-bootstrap";
import logo from "./logo-white.png";
import "./LoginPage.css";

class LoginPage extends Component {
    render() {
        return(
            <Grid>
                <Row>
                    <Col className="LoginForm">
                        <Form horizontal>
                            <FormGroup>
                                <img src={logo} alt="logo"/>
                            </FormGroup>
                            <FormGroup>
                                <input value="Эл. почта"/>
                            </FormGroup>
                            <FormGroup>
                                <input value="Пароль"/>
                            </FormGroup>
                            <FormGroup>
                                <input type="submit" value="Вход"/>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default LoginPage;