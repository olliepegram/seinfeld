import React, { Component } from 'react';
import Header from './Header';
import Quotes from './Quotes';
import axios from 'axios';
import './App.css';

class App extends Component {
    static defaultProps = {
        numQuotesToGet: 6
    };
    state = {
        quotes: []
    };

    async componentDidMount() {
        let quotes = [];
        while (quotes.length < this.props.numQuotesToGet) {
            let res = await axios.get(
                'https://seinfeld-quotes.herokuapp.com/random'
            );
            let bulkQuote = res.data;
            quotes.push({
                quote: bulkQuote.quote,
                author: bulkQuote.author,
                episode: bulkQuote.episode,
                season: bulkQuote.season
            });
        }
        this.setState({ quotes });
    }

    render() {
        return (
            <div className='App'>
                <Header
                    title={'The Seinfeld Chronicles'}
                    subtitle={'a quiz for a show about nothing'}
                />
                <Quotes quotes={this.state.quotes} />
            </div>
        );
    }
}

export default App;
