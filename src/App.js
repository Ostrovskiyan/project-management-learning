import React, { Component } from 'react';
import './App.css';
import LoginPage from './login/LoginPage';
import PageTemplate from "./common/PageTemplate";

class App extends Component {
  // render() {
  //   return (
  //     <div className="App">
  //       <div className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h2>Hello world</h2>
  //       </div>
  //       <p className="App-intro">
  //         Future for project-management
  //       </p>
  //     </div>
  //   );
  // }
    render() {
        return(
            <PageTemplate/>
            // <LoginPage />
        )
    }
}

export default App;
