import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import SearchPage from './SearchPage'



class BooksApp extends React.Component {
  state = {
    books: []
  }
  
  async componentDidMount() {
    try {
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    } catch (error){
      console.log(error)
    }
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book,shelf)
        BooksAPI.getAll().then((books) => {
          this.setState({books})
        })
    
  }
  
  render() {
    return (
      <div className="app">
         <Route exact path='/'
             render={() => (
              <BookShelf  
               books={this.state.books}
               updateShelf= {this.updateShelf}  />
             )}
              />
        <SearchBooks />
        <Route exact path='/search' 
          render={() => (
            <SearchPage
            updateShelf={this.updateShelf}
            books={this.state.books} />
          )} /> 
      </div>

    )
  }
}

export default BooksApp
