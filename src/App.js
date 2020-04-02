import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Clock from './components/Clock';
import Map from './components/Map';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showHomeScreen: true,
      showMap: false
    };

    this.mapHandler = this.mapHandler.bind(this);
    this.clockHandler = this.clockHandler.bind(this);
    this.clearViewState = this.clearViewState.bind(this);
    this.goHome = this.goHome.bind(this);
  }
  clearViewState() {
    this.setState({showHomeScreen: false, showMap: false, showClock: false});
  }
  mapHandler() {
    this.clearViewState();
    this.setState({showMap: true});
  }
  clockHandler() {
    this.clearViewState();
    this.setState({showClock: true});
  }
  goHome() {
    this.clearViewState();
    this.setState({showHomeScreen: true});
  }
  render() {
    return (
      <div className="main-container">
        { this.state.showHomeScreen ? <Home mapHandler={this.mapHandler} clockHandler={this.clockHandler} /> : null }
        { this.state.showMap ? <Map /> : null }
        { this.state.showClock ? <Clock goHome={this.goHome} /> : null }
      </div>
    );
  }
}

export default App;
