import React, { Component } from 'react';
import './Quotes.css';

class Quotes extends Component {
    randColor = array => {
        var copy = array.slice(0);
        return function() {
            if (copy.length < 1) {
                copy = array.slice(0);
            }
            var index = Math.floor(Math.random() * copy.length);
            var item = copy[index];
            copy.splice(index, 1);
            return item;
        };
    };

    render() {
        const colors = this.randColor([
            '#EEAF00',
            '#01A7B7',
            '#DE4B43',
            '#FCA080',
            '#FF7E57',
            '#3C3642',
            '#85496F',
            '#5D9B84'
        ]);
        return (
            <div className='QuoteContainer'>
                <ul className='AllQuotes'>
                    {this.props.quotes.map(quote => (
                        <li
                            key={quote.id}
                            className='SingleQuote'
                            style={{
                                backgroundColor: colors()
                            }}
                            onClick={() => this.props.handleChoice(quote.id)}
                        >
                            <h3 className='quote'>{quote.quote}</h3>
                            <div className='quote-about'>
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
