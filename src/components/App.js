import React, { Component } from 'react';
import Header from './Header';
import Quotes from './Quotes';
import Author from './Author';
import axios from 'axios';
import uuid from 'uuid';
import './App.css';

class App extends Component {
    static defaultProps = {
        numQuotesToGet: 6
    };
    state = {
        quotes: [],
        pickedAuthor: {},
        gameWon: false
    };

    async componentDidMount() {
        let quotes = [];

        while (quotes.length < this.props.numQuotesToGet) {
            let res = await axios.get(
                'https://seinfeld-quotes.herokuapp.com/random'
            );
            let bulkQuote = res.data;
            quotes.push({
                id: uuid.v4(),
                quote: bulkQuote.quote,
                author: bulkQuote.author,
                episode: bulkQuote.episode,
                season: bulkQuote.season
            });
        }
        this.setState({ quotes });
        this.setState({
            pickedAuthor: this.state.quotes[Math.floor(Math.random() * 6)]
        });
    }

    handleChoice = id => {
        const currentGuess = this.state.quotes.find(quote => {
            return quote.id === id;
        });
        if (currentGuess.quote === this.state.pickedAuthor.quote) {
            this.setState({ gameWon: true });
        }
    };

    render() {
        return (
            <div className='App'>
                <Header
                    title={'The Seinfeld Chronicles'}
                    subtitle={'a quiz for a show about nothing'}
                />
                <Author author={this.state.pickedAuthor} />
                <Quotes
                    quotes={this.state.quotes}
                    author={this.state.pickedAuthor}
                    handleChoice={this.handleChoice}
                    gameWon={this.state.gameWon}
                />
            </div>
        );
    }
}

export default App;
