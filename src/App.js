import React, {Component} from "react";
import LoginPage from "./login/LoginPage";
import PageTemplate from "./common/PageTemplate";
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import styles from "./index.css";

class App extends Component {
    render() {
        let authorized = this.props.authorized;
        return <BrowserRouter>
            <div className={styles.App}>
                <Switch>

                    <Route path="/login" render={props => (
                        !authorized ? (
                            <LoginPage {...props}/>
                        ) : (
                            <Redirect to={{
                                pathname: '/',
                                state: {from: props.location}
                            }}/>
                        )
                    )}
                    />
                    <Route path="/" render={props => (
                        authorized ? (
                            <PageTemplate {...props}/>
                        ) : (
                            <Redirect to={{
                                pathname: '/login',
                                state: {from: props.location}
                            }}/>
                        )
                    )}/>
                </Switch>
            </div>
        </BrowserRouter>
    }
}

function mapStateToProps(state) {
    return {
        authorized: state.profile.authorized
    }
}

export default connect(mapStateToProps)(App)
