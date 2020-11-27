import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'




class SearchPage extends Component {
    state = {
        query: '',
        searchResults: []
    }
    
    updateQuery = (query) => {
        this.setState({query})
        this.searchBooks(query);
    }

    
    searchBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then((searchResults) => {
                if (searchResults.error) {
                    this.setState({ searchResults: [] });
                } else {
                    this.setState({ searchResults })
                }

            })
        } else {
            this.setState({ searchResults: [] })
            
        }

    }
    render() {
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">

                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={
                                
                                (event) => this.updateQuery(event.target.value)
                            
                            }
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                       
                        {this.state.searchResults.map(searchResult => {
                            let shelf ="none";
                            if(this.state.query === ''){
                                return ( searchResult = [])
                               
                            }else{
                                
                            this.props.books.map(book =>(
                                book.id === searchResult.id ? shelf = book.shelf : ''
                            ));
                            return (
                                <li key={searchResult.id}>
                                    <Book
                                        book={searchResult}
                                        updateShelf={this.props.updateShelf}
                                        currentShelf={shelf} />
                                </li>
                            );
                            }
                        

                        })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage




