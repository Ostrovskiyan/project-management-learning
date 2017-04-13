import React, {Component} from 'react';
import LoginForm from "./LoginForm"

class LoginBox extends Component {
    render() {
        return (
            <div className="login-box LoginBox">
                <div className="login-box-body LoginBoxBody">
                    <LoginForm/>
                </div>
            </div>
        )
    }
}

export default LoginBox;