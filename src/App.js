import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Map from './components/Map';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showHomeScreen: true,
      showMap: false
    };

    this.mapHandler = this.mapHandler.bind(this);
  }
  mapHandler() {
    this.setState({showHomeScreen: false, showMap: true});
  }
  render() {
    return (
      <div className="main-container">
        { this.state.showHomeScreen ? <Home mapHandler={this.mapHandler} /> : null }
        { this.state.showMap ? <Map /> : null }
      </div>
    );
  }
}

export default App;
