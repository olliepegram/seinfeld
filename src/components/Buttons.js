import React, { Component } from 'react';
import './Buttons.css';

export class Buttons extends Component {
    render() {
        return (
            <div className='Buttons'>
                <button
                    className='newQuotes'
                    onClick={this.props.handleNewQuotesClick}
                >
                    New Quotes
                </button>
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
                    Giddy Up!
                </button>
            </div>
        );
    }
}

export default Buttons;
