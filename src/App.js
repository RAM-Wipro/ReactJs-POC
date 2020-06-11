import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import loading from './Loading.gif';

import Login from "./components/login/login";
import logo from './components/login/app_icon.png';

// function App() {

//   const interval = setInterval(() => {

//     console.log('This will run every second!');
//     this.props.history.push('/login');

//   }, 5000);

//   return (
// <div> Loader</div>
//     );
// }

export default class App extends Component {

  constructor(props) {
    super(props);
    const interval = setTimeout(() => {
      console.log('This will run every second!');
       this.props.history.push('/login');
    }, 5000);
  }
  render() {
    return (
      <div className="container">
        <div>
          <div className="logo-div">
            <img src={logo} width="100" height="50" className="logo" />
          </div>
          <br/>
          <img src={loading} className="loaderImg"/>

          <div className="loader"><p>loading...</p></div>
        </div>
      </div>

    );
  }
}

