import React from 'react';
import API from '../utils/API';
import '../css/MusicPlayer.css';
import { FaArrowAltCircleLeft, FaPlay, FaPause, FaBackward, FaForward, FaFolder } from 'react-icons/fa';

class MusicPlayer extends React.Component {
    constructor() {
        super();
        this.api = new API();
        this.state = {
            music_dirs: [],
            tracks: [],
            current_dir: null,
            current_track: '',
            now_playing: null
        };
        this.control_button_size = 50;

        this.getTracks = this.getTracks.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
        this.resumeTrack = this.resumeTrack.bind(this);
        this.displayMusicDirs = this.displayMusicDirs.bind(this);
        this.previousTrack = this.previousTrack.bind(this);
        this.nextTrack = this.nextTrack.bind(this);
    }
    async displayMusicDirs() {
        try {
            let music_dirs = await this.api.getMusicDirs();
            this.setState({music_dirs: music_dirs.data, tracks: []});
        } catch (err) {
            console.log(err);
        }
    }
    async getTracks(dir) {
        try {
            let tracks = await this.api.getTracksByDir(dir);
            this.setState({music_dirs: [], tracks: tracks.data, current_dir: dir});
        } catch (err) {
            console.log(err);
        }
    }
    playTrack(track) {
        if (this.state.now_playing !== null) {
            this.state.now_playing.pause();
        }
        let audio = new Audio(track);
        audio.play();
        this.setState({now_playing: audio});
    }
    pauseTrack() {
        this.state.now_playing.pause();
    }
    resumeTrack() {
        this.state.now_playing.play();
    }
    nextTrack() {
        if (typeof this.state.current_track == 'undefined' || this.state.current_track == null) { 
            return;
        }
        //'/music/' + this.state.current_dir + '/' + track
        for (let i = 0; i < this.state.tracks.length; i++) {
            if (this.state.tracks[i] == this.state.current_track && i < this.state.tracks.length - 1) {
                this.pauseTrack();
                let audio = new Audio('/music/' + this.state.current_dir + '/' + this.state.tracks[i + 1]);
                audio.play();
                this.setState({now_playing: audio, current_track: this.state.tracks[i + 1]});
            }
        }
    }
    previousTrack() {
        for (let i = 0; i < this.state.tracks.length; i++) {
            if (this.state.tracks[i] == this.state.current_track && i  > 0) {
                this.pauseTrack();
                let audio = new Audio('/music/' + this.state.current_dir + '/' + this.state.tracks[i - 1]);
                audio.play();
                this.setState({now_playing: audio, current_track: this.state.tracks[i - 1]});
            }
        }
    }
    componentDidMount() {
        this.displayMusicDirs();
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div className="music-player-main">
                <div className="d-flex bd-highlight music-player-container">
                    <div className="bd-highlight music-player-controls blank"></div>
                    <div className="flex-fill bd-highlight music-player-controls"></div>
                    <div className="bd-highlight music-player-track-info">
                        <div className='music-control-button' onClick={this.nextTrack}>
                            <FaForward size={this.control_button_size} />
                        </div>
                        <div className='music-control-button' onClick={this.previousTrack}>
                            <FaBackward size={this.control_button_size} />
                        </div>
                        <div className='music-control-button' onClick={this.pauseTrack}>
                            <FaPause size={this.control_button_size} />
                        </div>
                        <div className='music-control-button' onClick={this.resumeTrack}>
                            <FaPlay size={this.control_button_size} />
                        </div>
                        <div className='music-control-button' onClick={this.displayMusicDirs}>
                            <FaFolder size={this.control_button_size} />
                        </div>
                    </div>
                </div>
                <div className="d-flex bd-highlight">
                    <div className="p-2 flex-fill bd-highlight music-dir-control">
                        {this.state.current_track}
                    </div>
                </div>
                <div className="d-flex bd-highlight music-track-list">
                    { this.state.music_dirs.map(dir => (
                        <div className='music-dir-container' onClick={() => { this.getTracks(dir); }}>
                            <div>
                                { dir.length < 28 ? dir : dir.substring(0, 28) + '...' }
                            </div>
                        </div>

                    )) }
                    { this.state.tracks.map(track => (
                        <div className='track-container' onClick={() => { this.playTrack('/music/' + this.state.current_dir + '/' + track); this.setState({current_track: track}) }}>
                            { track.length < 60 ? track : track.substring(0, 60) + '...' }
                        </div>

                    )) }
                </div>
                <div className="back-button">
                    <FaArrowAltCircleLeft style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={60} onClick={this.props.goHome} />
                </div>
            </div>
        );
      }
}

export default MusicPlayer;