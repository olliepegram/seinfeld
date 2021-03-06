import React, { Component } from "react";
import "./Header.css";
import Buttons from "./Buttons";

class Header extends Component {
  render() {
    const { title, subtitle, gameWon, author } = this.props;
    return (
      <div
        className='Header'
        style={{ backgroundColor: gameWon ? author.color : "#23a4db" }}
      >
        <div className='HeaderInner'>
          <h1 className='title'>{title}</h1>
          <h2 className='subtitle'>{subtitle}</h2>
        </div>

        <Buttons
          handleButtonModes={this.props.handleButtonModes}
          handleNewQuotesClick={this.props.handleNewQuotesClick}
        />
      </div>
    );
  }
}

export default Header;
