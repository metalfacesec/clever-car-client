import React from 'react';
import '../css/Home.css';
import { FaMapMarkedAlt, FaClock, FaMusic, FaCogs, FaGamepad, FaMicrochip, FaNewspaper, FaFilm } from 'react-icons/fa';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        let icon_size = 70;
        return (
            <div className="icon-parent">
                <div className="icons-container row">  
                    <div className="icon-container col">
                        <FaMapMarkedAlt style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} onClick={this.props.mapHandler} />
                    </div>
                    <div className="icon-container col">
                        <FaClock style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} onClick={this.props.clockHandler} />
                    </div>
                    <div className="icon-container col">
                        <FaMusic style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} onClick={this.props.musicHandler} />
                    </div>
                    <div className="icon-container col">
                        <FaFilm style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} />
                    </div>
                </div>
                <div className="icons-container row">  
                    <div className="icon-container col">
                        <FaGamepad style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} onClick={this.props.gamesHandler} />
                    </div>
                    <div className="icon-container col">
                        <FaMicrochip style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} />
                    </div>
                    <div className="icon-container col">
                        <FaNewspaper style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} />
                    </div>
                    <div className="icon-container col">
                        <FaCogs style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={icon_size} />
                    </div>
                </div>
            </div>
        );
      }
}

export default Home;