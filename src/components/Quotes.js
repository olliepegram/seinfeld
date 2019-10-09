import React, { Component } from 'react';
import 'hover.css';
import './Quotes.css';

class Quotes extends Component {
    state = { activeItem: '' };
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
                                <h3 className='quote'>
                                    {this.props.author.quote}
                                </h3>
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
                        {this.props.quotes.map(quote => (
                            <li
                                key={quote.id}
                                className={`SingleQuote hvr-float`}
                                style={{
                                    backgroundColor: quote.color,
                                    display:
                                        this.state.activeItem === quote.id
                                            ? 'none'
                                            : 'absolute'
                                }}
                                onClick={() => {
                                    this.props.handleChoice(quote.id);
                                    this.handleClickItem(quote.id);
                                }}
                                ref={this.listRef}
                            >
                                <h3 className='quote'>{quote.quote}</h3>
                                <div className='quote-about'>
                                    <span className='quote-season'>
                                        Season: {quote.season}
                                    </span>
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
