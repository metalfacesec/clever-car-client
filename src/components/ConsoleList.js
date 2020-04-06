import React from 'react';
import axios from 'axios';
import '../css/ConsoleList.css'
import { FaArrowAltCircleLeft } from 'react-icons/fa';

class ConsoleList extends React.Component {
    constructor() {
        super();
        this.state = {
            games: [],
            showConsoles: true,
            showGames: false
        }

        this.showNesGames = this.showNesGames.bind(this);
    }
    showNesGames() {
        this.setState({showConsoles: false, showGames: true});

        axios.get(`http://127.0.0.1:3069/games?type=nes`)
        .then(res => {
            console.log(res.data);
            this.setState({games: res.data.data});
        });
    }
    launchNesGame(game) {
        axios.get(`http://127.0.0.1:3069/emulate?game=` + game)
        .then(res => {
            console.log(res.data);
        });
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div className="main-container">
                <div className="container">
                    { this.state.showConsoles ?  
                                                <div className="console-container" onClick={this.showNesGames}>
                                                    <div className="console-image-nes"></div>
                                                    <div className="console-text">Nintendo</div>
                                                </div> 
                                            : null 
                    }

                    { this.state.showGames ?    
                                            this.state.games.map((value, index) => {
                                                return  <div className="game-container" onClick={() => this.launchNesGame(value)}>
                                                            <div className="game-image-nes"></div>
                                                            <div className="game-text">{value}</div>
                                                        </div>
                                            })
                                            : null 
                    }
                </div>
                <div className="back-button">
                    <FaArrowAltCircleLeft style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={40} onClick={this.props.goHome} />
                </div>
            </div>
        );
      }
}

export default ConsoleList;