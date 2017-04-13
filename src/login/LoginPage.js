import React, {Component} from 'react';
import {Col, Grid, Row, Form, FormGroup} from "react-bootstrap";
import logo from "./logo-white.png";
import "./LoginPage.css";

class LoginPage extends Component {
    render() {
        return (
            <div className="Background">
                <div className="EmptyLoginBlock">
                </div>
                <div className="login-box">
                    <div className="login-box-body LoginBoxBody">
                        <Form>
                            <div className="login-logo">
                                <img src={logo} alt="logo"/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control LoginInput" placeholder="Эл. почта"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control LoginInput" placeholder="Пароль"/>
                            </div>
                            <div className="row">
                                <div className="col-xs-offset-7 col-xs-5">
                                    <button type="submit" className="btn btn-primary btn-block LoginButton">
                                        Вход
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;


/*<Grid>
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
 </Grid>*/