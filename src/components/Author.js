import React, { Component } from 'react';
import './Author.css';

class Author extends Component {
    render() {
        const { author, gameWon } = this.props;
        return (
            <div className='Author-wrap'>
                <p
                    className='PickedAuthor'
                    style={{ borderColor: gameWon ? author.color : '#fed522' }}
                >
                    {author.author ? `${author.author} said what!?` : ''}
                </p>
            </div>
        );
    }
}

export default Author;
