import React, {Component} from 'react';
import logo from "./logo-white.png";

class Logo extends Component {
    render() {
        return (
            <div className="login-logo">
                <img src={logo} alt="logo"/>
            </div>
        )
    }
}

export default Logo;