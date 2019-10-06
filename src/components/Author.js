import React, { Component } from 'react';
import './Author.css';

class Author extends Component {
    render() {
        const { author } = this.props.author;
        return (
            <div>
                <p className='PickedAuthor'>
                    {author ? `${author} said what!?` : ''}
                </p>
            </div>
        );
    }
}

export default Author;
