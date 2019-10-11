import React, { Component } from "react";
import "./Buttons.css";

export class Buttons extends Component {
  render() {
    return (
      <div className='Buttons'>
        <button className='newQuotes' onClick={this.props.handleNewQuotesClick}>
          <span className='quotesSpan hvr-float'>New Quotes</span>
        </button>
        <button
          onClick={() => this.props.handleButtonModes("easy")}
          className='easyButton'
        >
          <span className='easySpan hvr-float'>Easy</span>
        </button>
        <button
          onClick={() => this.props.handleButtonModes("hard")}
          className='hardButton'
        >
          <span className='hardSpan hvr-float'>Giddy Up</span>
        </button>
      </div>
    );
  }
}

export default Buttons;
