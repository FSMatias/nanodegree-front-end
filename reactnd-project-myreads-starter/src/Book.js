import React from 'react'
import PropTypes from 'prop-types'
import { BookshelfConstants } from './Constants'

class Book extends React.Component {
    
    static propTypes = {
       bookInfo: PropTypes.object.isRequired,
       onBookshelfChange: PropTypes.func.isRequired
    }

    render() {
        const { bookInfo, onBookshelfChange } = this.props
        
        return (
            <div className="book">
            <div className="book-top">
                {bookInfo.imageLinks? (
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + bookInfo.imageLinks.smallThumbnail + ')' }}></div>
                ) : (
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url()' }}></div>
                )}
                <div className="book-shelf-changer">
                <select value={bookInfo.shelf} onChange={(event) => onBookshelfChange(bookInfo, event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">{BookshelfConstants.currentReadingBookshelf.name}</option>
                    <option value="wantToRead">{BookshelfConstants.wantToReadBookshelf.name}</option>
                    <option value="read">{BookshelfConstants.readBookshelf.name}</option>
                    <option value="none">{BookshelfConstants.none.name}</option>
                </select>
                </div>
            </div>
            <div className="book-title">{bookInfo.title}</div>
            {bookInfo.authors && (
                <div className="book-authors">{bookInfo.authors.join(", ")}</div>
            )}
            </div>
        )
    }
}

export default Book