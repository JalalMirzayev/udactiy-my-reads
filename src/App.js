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
	};

	handleSearchQuery = (value) => {
		this.setState({ ...this.state, searchQuery: value });
	};

	updateShelfValue = (id, value) => {
		const newBooks = this.state.books.map((book) =>
			book.id !== id
				? book
				: {
						...book,
						shelf: value,
				  }
		);
		this.setState({ ...this.state, books: newBooks }, () =>
			update({ id: id }, value)
		);
	};

	componentDidMount() {
		const promise = getAll();
		promise
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
								handleSearchQuery={this.handleSearchQuery}
								searchQuery={this.state.searchQuery}
								selectedShelf={this.state.selectedShelf}
								updateShelfValue={this.updateShelfValue}
							/>
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default BooksApp;
