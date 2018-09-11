import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends React.Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
     }

    render() {
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book) => (
                        <li key={book.title}>
                            <Book bookInfo={book} />    
                        </li>
                    ))}
                </ol>
            </div>
            </div>                
        )
    }
}

export default Bookshelf
