import React from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI.js";
import Book from "./Book.js";
import { useEffect } from "react";
import PropTypes from "prop-types";

const SearchPage = (props) => {
	const {
		searchQuery,
		books,
		handleSearchQuery,
		updateShelfValue,
		booksSearch,
		updateBooksSearch,
	} = props;

	useEffect(
		() => {
			updateBooksSearch([]);
			if (searchQuery.trim() !== "") {
				search(searchQuery)
					.then((data) =>
						data.map((book) => {
							return {
								id: book.id,
								shelf: "none",
								title: book.title,
								authors:
									typeof book.authors === "undefined"
										? ""
										: book.authors.join(", "),
								imageUrl:
									typeof book.imageLinks === "undefined"
										? ""
										: book.imageLinks.thumbnail,
							};
						})
					)
					.then((books) => updateBooksSearch(books))
					.catch((error) => {
						updateBooksSearch([]);
						console.log(error);
					});
			}
		},
		[searchQuery]
	);

	const getShelfValue = (id) => {
		const foundBook = books.find((book) => book.id === id);
		return typeof foundBook !== "undefined" ? foundBook.shelf : "none";
	};

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<Link to='/'>
					<button className='close-search'>Close</button>
				</Link>

				<div className='search-books-input-wrapper'>
					{/*
                  Possible BooksAPI search terms:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry ifyou don't find a specific author or title. Every search is limited by search terms.
                */}
					<input
						type='text'
						placeholder='Search by title or author'
						value={searchQuery}
						onChange={(event) => handleSearchQuery(event.target.value)}
					/>
				</div>
			</div>
			<div className='search-books-results'>
				<ol className='books-grid'>
					{booksSearch.map((book) => (
						<li key={book.id}>
							<Book
								id={book.id}
								title={book.title}
								authors={book.authors}
								imageUrl={book.imageUrl}
								selectedShelf={getShelfValue(book.id)}
								updateShelfValue={updateShelfValue}
							/>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default SearchPage;

SearchPage.propTypes = {
	searchQuery: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	handleSearchQuery: PropTypes.func.isRequired,
	updateShelfValue: PropTypes.func.isRequired,
	booksSearch: PropTypes.array.isRequired,
	updateBooksSearch: PropTypes.func.isRequired,
};
