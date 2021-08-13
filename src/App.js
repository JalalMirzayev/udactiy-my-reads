import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { getAll, update } from "./BooksAPI.js";
import ListBooksPage from "./ListBooksPage.js";
import SearchPage from "./SearchPage.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getBooks } from "./utilities.js";

class BooksApp extends React.Component {
	state = {
		searchQuery: "",
		books: [],
		selectedShelf: "",
		booksSearch: [],
	};

	handleSearchQuery = (value) => {
		this.setState({ ...this.state, searchQuery: value });
	};

	updateShelfValue = (id, value) => {
		const foundBook = this.state.books.find((book) => book.id === id);
		if (typeof foundBook !== "undefined") {
			this.setState(
				{
					...this.state,
					selectedShelf: value,
					books: this.state.books.map((book) =>
						book.id !== id
							? book
							: {
									...book,
									shelf: value,
							  }
					),
				},
				() => {
					update({ id: id }, value);
				}
			);
		} else if (typeof foundBook === "undefined") {
			const newBooksSearch = this.state.booksSearch.map((book) =>
				book.id !== id ? book : { ...book, shelf: value }
			);
			this.setState({ ...this.state, booksSearch: newBooksSearch });
			let newBook = this.state.booksSearch.find((book) => book.id === id);
			newBook = { ...newBook, shelf: value };
			this.setState(
				{ ...this.state, books: [...this.state.books, newBook] },
				() => {
					update({ id: id }, value);
				}
			);
		}
	};

	updateBooksSearch = (newBooks) => {
		this.setState({ ...this.state, booksSearch: newBooks });
	};

	componentDidMount() {
		getAll()
			.then((result) => getBooks(result))
			.then((result) => this.setState({ ...this.state, books: result }))
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<div className='app'>
				<BrowserRouter>
					<Switch>
						<Route exact path='/'>
							<ListBooksPage
								books={this.state.books}
								updateShelfValue={this.updateShelfValue}
								selectedShelf={this.state.selectedShelf}
							/>
						</Route>
						<Route path='/search'>
							<SearchPage
								searchQuery={this.state.searchQuery}
								books={this.state.books}
								handleSearchQuery={this.handleSearchQuery}
								updateShelfValue={this.updateShelfValue}
								booksSearch={this.state.booksSearch}
								updateBooksSearch={this.updateBooksSearch}
							/>
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default BooksApp;
