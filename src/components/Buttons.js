import React, { Component } from 'react';
import './Buttons.css';

export class Buttons extends Component {
    render() {
        return (
            <div className='Buttons'>
                <button
                    onClick={() => this.props.handleButtonModes('easy')}
                    className='easyButton'
                >
                    Easy
                </button>
                <button
                    onClick={() => this.props.handleButtonModes('hard')}
                    className='hardButton'
                >
                    Hard
                </button>
            </div>
        );
    }
}

export default Buttons;
