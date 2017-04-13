import React, {Component} from 'react';

import LoginBox from "./LoginBox"
import "./LoginPage.css";

class LoginPage extends Component {
    render() {
        return (
            <div className="Background">
                <div className="EmptyLoginBlock">
                </div>
                <LoginBox/>
            </div>
        )
    }
}

export default LoginPage;