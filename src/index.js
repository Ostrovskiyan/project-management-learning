import thunkMiddleware from 'redux-thunk'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers/root-reducer"

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
    // ,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
