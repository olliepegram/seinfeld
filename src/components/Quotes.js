import React, { Component } from 'react';
import './Quotes.css';

class Quotes extends Component {
    randColor = color => {
        return color[Math.floor(Math.random() * color.length)];
    };
    render() {
        const colors = [
            '#E3BA38',
            '#DEA3B2',
            '#EA6013',
            '#FCA080',
            '#B54337',
            '#1B8CAC'
        ];
        return (
            <div className='QuoteContainer'>
                <ul className='AllQuotes'>
                    {this.props.quotes.map(quote => (
                        <li key={quote.episode} className='SingleQuote'>
                            <h3 className='quote'>{quote.quote}</h3>
                            <div
                                className='quote-about'
                                style={{
                                    backgroundColor: this.randColor(colors)
                                }}
                            >
                                <span className='quote-season'>
                                    Season: {quote.season}
                                </span>
                                <span className='quote-episode'>
                                    Quote: {quote.episode}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Quotes;
