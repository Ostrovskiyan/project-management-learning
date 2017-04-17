import React, {Component} from 'react';
import LoginPage from './login/LoginPage';
import PageTemplate from "./common/PageTemplate";
import {connect} from "react-redux";

class App extends Component {
    render() {
        if (this.props.authorized) {
            return <PageTemplate/>;
        }
        return <LoginPage />;
    }
}

function mapStateToProps(state) {
    return {
        authorized: state.profile.authorized
    }
}

export default connect(mapStateToProps)(App)
