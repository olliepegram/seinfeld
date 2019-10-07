import React, { Component } from 'react';
import Header from './Header';
import Quotes from './Quotes';
import Author from './Author';
import axios from 'axios';
import uuid from 'uuid';
import './App.css';

class App extends Component {
    static defaultProps = {
        numQuotesToGet: 6,
        colors: [
            '#EEAF00',
            '#01A7B7',
            '#DE4B43',
            '#FCA080',
            '#FF7E57',
            '#3C3642',
            '#85496F',
            '#5D9B84'
        ]
    };
    state = {
        quotes: [],
        pickedAuthor: {},
        gameWon: false
    };

    async componentDidMount() {
        const randColor = array => {
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
        const color = randColor(this.props.colors);
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
                season: bulkQuote.season,
                color: color()
            });
            // const filteredQuotes = quotes.filter((item, index) => {

            // })
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
                    gameWon={this.state.gameWon}
                    author={this.state.pickedAuthor}
                />
                <Author
                    author={this.state.pickedAuthor}
                    gameWon={this.state.gameWon}
                />
                <Quotes
                    quotes={this.state.quotes}
                    author={this.state.pickedAuthor}
                    handleChoice={this.handleChoice}
                    gameWon={this.state.gameWon}
                    color={this.props.colors}
                />
            </div>
        );
    }
}

export default App;
