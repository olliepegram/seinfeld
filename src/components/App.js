import React, { Component } from "react";
import Header from "./Header";
import Quotes from "./Quotes";
import Author from "./Author";
import Buttons from "./Buttons";
import axios from "axios";
import uuid from "uuid";
import "./App.css";

class App extends Component {
  static defaultProps = {
    numQuotesToGetHard: 6,
    numQuotesToGetEasy: 3,
    colors: [
      "#EEAF00",
      "#01A7B7",
      "#DE4B43",
      "#FCA080",
      "#FF7E57",
      "#3C3642",
      "#85496F",
      "#5D9B84"
    ]
  };
  state = {
    quotes: [],
    pickedAuthor: {},
    gameWon: false,
    mode: "hard"
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
    let filteredQuotes = [];
    while (filteredQuotes.length < this.props.numQuotesToGetHard) {
      let res = await axios.get("https://seinfeld-quotes.herokuapp.com/random");
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
          arr.map(mapObj => mapObj["author"]).indexOf(obj["author"]) === pos
        );
      });
    }

    this.setState({ quotes: filteredQuotes });
    this.setState({
      pickedAuthor: this.state.quotes[
        Math.floor(Math.random() * this.state.quotes.length)
      ]
    });
  }

  handleButtonModes = mode => {
    if (mode === "easy") {
      this.setState({ mode: "easy" });
    } else if (mode === "hard") {
      this.setState({ mode: "hard" });
    }

    let quotes = [...this.state.quotes];
    let splitQuotes = this.state.quotes.splice(
      0,
      this.props.numQuotesToGetEasy
    );
    if (this.state.mode === "easy") {
      this.setState({ quotes: splitQuotes });
    }
    if (this.state.mode === "hard") {
      this.setState({ quotes: [...quotes, ...splitQuotes] });
    }
  };

  render() {
    return (
      <div className='App'>
        <Header
          title={"The Seinfeld Chronicles"}
          subtitle={"a quiz for a show about nothing"}
          gameWon={this.state.gameWon}
          author={this.state.pickedAuthor}
        />
        <Author author={this.state.pickedAuthor} gameWon={this.state.gameWon} />
        <Buttons handleButtonModes={this.handleButtonModes} />
        <Quotes
          quotes={this.state.quotes}
          author={this.state.pickedAuthor}
          handleChoice={this.handleChoice}
          gameWon={this.state.gameWon}
          color={this.props.colors}
          mode={this.state.mode}
        />
      </div>
    );
  }
}

export default App;
