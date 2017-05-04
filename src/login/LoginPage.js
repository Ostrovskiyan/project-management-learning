import React, {Component} from 'react';

import styles from "./LoginPage.css";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
    render() {
        return (
            <div className={styles.LoginBackground}>
                <div className={styles.EmptyLoginBlock}/>
                <div className={`login-box ${styles.LoginBox}`}>
                    <div className={`login-box-body ${styles.LoginBoxBody}`}>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;