import React, {Component} from 'react';

import "./LoginPage.css";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
    render() {
        return (
            <div className="LoginBackground">
                <div className="EmptyLoginBlock"/>
                <div className="login-box LoginBox">
                    <div className="login-box-body LoginBoxBody">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;