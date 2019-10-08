import React, { Component } from "react";
import "hover.css";
import "./Quotes.css";

class Quotes extends Component {
  state = { activeItem: -1 };
  listRef = React.createRef();

  handleClickItem(index) {
    this.setState({ activeItem: index });
  }

  render() {
    if (this.props.gameWon) {
      return (
        <div className='QuoteContainer'>
          <ul className='AllQuotes'>
            {this.props.quotes.map(quote => (
              <li
                key={quote.id}
                className='SingleQuote hvr-float'
                style={{
                  backgroundColor: this.props.author.color
                }}
              >
                <h3 className='quote'>{this.props.author.quote}</h3>
                <div className='quote-about'>
                  <span className='quote-season'>
                    Season: {this.props.author.season}
                  </span>
                  <span className='quote-episode'>
                    Episode: {this.props.author.episode}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (this.props.gameWon === false) {
      return (
        <div className='QuoteContainer'>
          <ul className='AllQuotes'>
            {this.props.quotes.map((quote, index) => (
              <li
                key={quote.id}
                className={`${
                  this.state.activeItem === index ? "SingleQuote-hidden" : ""
                } SingleQuote hvr-float`}
                style={{
                  backgroundColor: quote.color
                }}
                onClick={() => {
                  this.props.handleChoice(quote.id);
                  this.handleClickItem(index);
                }}
                ref={this.listRef}
              >
                <h3 className='quote'>{quote.quote}</h3>
                <div className='quote-about'>
                  <span className='quote-season'>Season: {quote.season}</span>
                  <span className='quote-episode'>
                    Episode: {quote.episode}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Quotes;
