import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import graph from 'fb-react-sdk';
import secrets from './SECRET.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="welcome-title">Welcome to Meetbook</h2>
        </div>
        <p className="App-intro">
          To update stuff, edit <code>src/App.js</code> and save to reload.
        </p>
        <ShowGroups/>
      </div>
    );
  }
}

class ShowGroups extends React.Component {
  constructor(props) {
    super(props);
    //static call to initials api
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}><button>Show Groups</button></form>
      </div>
    );
  }

  handleSubmit(e) {
   e.preventDefault();
   var newItem = {
     text: this.state.text,
     id: Date.now()
   };
   this.setState((prevState) => ({
     items: prevState.items.concat(newItem),
     text: ''
   }));
  }
}

export default App;
