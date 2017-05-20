import React, {Component} from "react";
import LoginPage from "./login/LoginPage";
import PageTemplate from "./common/PageTemplate";
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import styles from "./index.css";

class App extends Component {
    render() {
        let token = this.props.token;
        return <BrowserRouter>
            <div className={styles.App}>
                <Switch>

                    <Route path="/login" render={props => (
                        !token ? (
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
                        token ? (
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
        token: state.profile.token,
    }
}

export default connect(mapStateToProps)(App)
