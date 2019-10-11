import React, { Component } from 'react';
import './Author.css';

class Author extends Component {
    authorOrWon = (author, gameWon) => {
        if (gameWon === false) {
            return (
                <p
                    className='PickedAuthor'
                    style={{ borderColor: gameWon ? author.color : '#fed522' }}
                >
                    {author.author ? `${author.author} said what!?` : ''}
                </p>
            );
        } else if (gameWon === true) {
            return (
                <React.Fragment>
                    <button
                        className='newQuotesWin'
                        onClick={this.props.handleNewQuotesClick}
                    >
                        <span className='quotesSpan'>New Quotes</span>
                    </button>
                    <p className='PickedAuthorWin'>
                        <span className='fancy-moses'>Sweet fancy moses</span>,
                        you won!
                    </p>
                </React.Fragment>
            );
        }
    };

    render() {
        const { author, gameWon } = this.props;
        return (
            <div className='Author-wrap'>
                {this.authorOrWon(author, gameWon)}
            </div>
        );
    }
}

export default Author;
