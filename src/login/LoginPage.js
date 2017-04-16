import React, {Component} from 'react';

import LoginBox from "./LoginBox"
import "./LoginPage.css";

class LoginPage extends Component {
    render() {
        return (
            <div className="LoginBackground">
                <div className="EmptyLoginBlock"/>
                <LoginBox/>
            </div>
        )
    }
}

export default LoginPage;