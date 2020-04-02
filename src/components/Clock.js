import React from 'react';
import '../css/Clock.css'
import { FaArrowAltCircleLeft } from 'react-icons/fa';

class Clock extends React.Component {
    constructor() {
        let today = new Date(); 

        super();
        this.state = {
            date: today,
            current_date: (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
        };

        this.tick = this.tick.bind(this);
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({date: new Date()});
    }
    render() {
        return (
            <div className="container">
                <div className='time-container'>
                    {this.state.date.toLocaleTimeString()}
                </div>
                <div className='date-container'>
                    {this.state.current_date}
                </div>
                <div className="back-button">
                    <FaArrowAltCircleLeft style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={40} onClick={this.props.goHome} />
                </div>
            </div>
        );
      }
}

export default Clock;