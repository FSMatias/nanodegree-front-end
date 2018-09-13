import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import Bookshelf from './Bookshelf'
import { BookshelfConstants } from './Constants'
import serilaizeForm from 'form-serialize'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    books:[],
    searchBooks: [],
    queryReturnedNoBooks: false
  }

  updateState = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBookshelf = (book, shelf) => {
   BooksAPI.update(book, shelf).then(() => {
    this.updateState()
   })
  }

  componentDidMount() {
    this.updateState()
  }
  
  componentDidUpdate(){
    window.onpopstate  = (e) => {
      this.setState({searchBooks: []})
      this.setState({queryReturnedNoBooks: false})
    }
  }

  handleFormSubit = (event) => {
    event.preventDefault()
    const values = serilaizeForm(event.target, { hash: true })
 
    BooksAPI.search(values.query).then((searchBooks) => {
      if (searchBooks) {
        var resJson = JSON.parse(JSON.stringify(searchBooks))
        if (resJson.hasOwnProperty('error')) {
          this.setState({ searchBooks: [] })
          console.log("Found no books")
          this.setState({queryReturnedNoBooks: true})
        } else {
          this.setState({queryReturnedNoBooks: false})

          resJson.forEach(element => {
            const bookInShelf = this.state.books.filter(book => book.id === element.id)
            if (bookInShelf.length > 0) {
              element["shelf"] = bookInShelf[0].shelf
            } else {
              element["shelf"] = BookshelfConstants.none.id
            }
          });
          this.setState({ searchBooks: resJson })
        }
      }
    })
  }

  onClickBackButton = (history) => {
    history.push('/') 
    this.setState({ searchBooks: [] })
    this.setState({queryReturnedNoBooks: false})
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={( { history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.onClickBackButton(history) }>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <form onSubmit={this.handleFormSubit}> 
                  <input type="text" name="query" placeholder="Search by title or author"/>
                </form>
              </div>
            </div>

            {this.state.queryReturnedNoBooks && (
              <div className="no-search-books">
                <p> Could not find any books</p>
              </div>
            )} 

            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchBooks.map((book) => (
                  <li key={book.id}>
                    <Book 
                      bookInfo={book} 
                      onBookshelfChange = {this.updateBookshelf}
                    />    
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  bookshelfTitle="Currently Reading"
                  books = {this.state.books.filter((book) => book.shelf === BookshelfConstants.currentReadingBookshelf.id )}
                  updateBookshelf = {this.updateBookshelf}
                />
                <Bookshelf
                  bookshelfTitle="Want to Read"
                  books = {this.state.books.filter((book) => book.shelf === BookshelfConstants.wantToReadBookshelf.id )}
                  updateBookshelf = {this.updateBookshelf}
                />
                <Bookshelf
                  bookshelfTitle="Read"
                  books = {this.state.books.filter((book) => book.shelf === BookshelfConstants.readBookshelf.id )}
                  updateBookshelf = {this.updateBookshelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
