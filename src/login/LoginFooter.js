import React, {Component} from 'react';

class LoginFooter extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-offset-7 col-xs-5">
                    <button type="submit" className="btn btn-primary btn-block LoginButton">
                        Вход
                    </button>
                </div>
            </div>
        )
    }
}

export default LoginFooter;