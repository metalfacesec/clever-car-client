import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Clock from './components/Clock';
import Map from './components/Map';
import MusicPlayer from './components/MusicPlayer';
import ConsoleList from './components/ConsoleList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showHomeScreen: true,
      showMap: false,
      showClock: false,
      showMusicPlayer: false,
      showConsoleList: false
    };

    this.mapHandler = this.mapHandler.bind(this);
    this.clockHandler = this.clockHandler.bind(this);
    this.clearViewState = this.clearViewState.bind(this);
    this.gamesHandler = this.gamesHandler.bind(this);
    this.musicPlayerHandler = this.musicPlayerHandler.bind(this);
    this.goHome = this.goHome.bind(this);
  }
  clearViewState() {
    this.setState({showHomeScreen: false, showMap: false, showClock: false, showConsoleList: false, showMusicPlayer: false});
  }
  mapHandler() {
    this.clearViewState();
    this.setState({showMap: true});
  }
  clockHandler() {
    this.clearViewState();
    this.setState({showClock: true});
  }
  gamesHandler() {
    this.clearViewState();
    this.setState({showConsoleList: true})
  }
  musicPlayerHandler() {
    this.clearViewState();
    this.setState({showMusicPlayer: true});
  }
  goHome() {
    this.clearViewState();
    this.setState({showHomeScreen: true});
  }
  render() {
    return (
      <div className="main-container">
        { this.state.showHomeScreen ? <Home mapHandler={this.mapHandler} clockHandler={this.clockHandler} gamesHandler={this.gamesHandler} musicHandler={this.musicPlayerHandler} /> : null }
        { this.state.showMap ? <Map goHome={this.goHome} /> : null }
        { this.state.showClock ? <Clock goHome={this.goHome} /> : null }
        { this.state.showConsoleList ? <ConsoleList goHome={this.goHome} /> : null }
        { this.state.showMusicPlayer ? <MusicPlayer goHome={this.goHome} /> : null }
      </div>
    );
  }
}

export default App;
