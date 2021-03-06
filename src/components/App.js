import React, { Component } from 'react';
import Header from './Header';
import Quotes from './Quotes';
import Author from './Author';
import Spinner from './Spinner';
import axios from 'axios';
import uuid from 'uuid';
import './App.css';

class App extends Component {
    static defaultProps = {
        numQuotesToGetHard: 6,
        numQuotesToGetEasy: 3,
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
        gameWon: false,
        mode: 'hard',
        loading: false
    };

    async componentDidMount() {
        if (this.state.quotes.length === 0) this.getQuotes();
    }
    async getQuotes() {
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
        let filteredQuotes = [];
        while (filteredQuotes.length < this.props.numQuotesToGetHard) {
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

            filteredQuotes = quotes.filter((obj, pos, arr) => {
                return (
                    arr
                        .map(mapObj => mapObj['author'])
                        .indexOf(obj['author']) === pos
                );
            });
            this.setState({ loading: true });
        }

        this.setState({
            pickedAuthor: filteredQuotes[0],
            gameWon: false
        });
        let authorIndex = filteredQuotes.indexOf(this.state.pickedAuthor);
        if (this.state.mode === 'hard') {
            this.setState({
                quotes: filteredQuotes.sort(() => Math.random() - 0.5)
            });
        } else if (this.state.mode === 'easy') {
            this.setState({
                quotes: filteredQuotes
                    .splice(authorIndex, 2)
                    .sort(() => Math.random() - 0.5)
            });
        }
        this.setState({ loading: false });
    }

    handleButtonModes = mode => {
        if (mode === 'easy') {
            this.setState({ mode: 'easy' });
        } else if (mode === 'hard') {
            this.setState({ mode: 'hard' });
        }

        if (this.state.mode === 'easy' || this.state.mode === 'hard') {
            this.setState(this.getQuotes());
        }
    };

    handleChoice = id => {
        const currentGuess = this.state.quotes.find(quote => {
            return quote.id === id;
        });
        if (currentGuess.quote === this.state.pickedAuthor.quote) {
            this.setState({ gameWon: true });
        }
    };

    handleNewQuotesClick = () => {
        this.setState(this.getQuotes());
    };

    renderQuotes = () => {
        if (this.state.loading === true) {
            return <Spinner />;
        } else if (this.state.loading === false) {
            return (
                <React.Fragment>
                    <Author
                        author={this.state.pickedAuthor}
                        gameWon={this.state.gameWon}
                        handleNewQuotesClick={this.handleNewQuotesClick}
                    />

                    <Quotes
                        quotes={this.state.quotes}
                        author={this.state.pickedAuthor}
                        handleChoice={this.handleChoice}
                        gameWon={this.state.gameWon}
                        color={this.props.colors}
                        mode={this.state.mode}
                    />
                </React.Fragment>
            );
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
                    handleButtonModes={this.handleButtonModes}
                    handleNewQuotesClick={this.handleNewQuotesClick}
                />
                {this.renderQuotes()}
                <p className='builtBy'>
                    This is gold,{' '}
                    <a
                        href='https://twitter.com/olliepegram'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Ollie!
                    </a>{' '}
                    Gold!
                </p>
            </div>
        );
    }
}

export default App;
