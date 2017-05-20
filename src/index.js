import thunkMiddleware from 'redux-thunk'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers/root-reducer";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware),
);

const store = createStore(rootReducer, {
    profile: {
        token: localStorage.getItem("authToken")
    }
}, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
