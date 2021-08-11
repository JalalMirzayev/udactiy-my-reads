import React from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI.js";
import Book from "./Book.js";
import { useState, useEffect } from "react";

const SearchPage = (props) => {
	const {
		searchQuery,
		handleSearchQuery,
		selectedShelf,
		updateShelfValue,
	} = props;

	const [searchedBooks, setSearchedBooks] = useState([]);

	useEffect(
		() => {
			if (searchQuery.trim() !== "") {
				search(searchQuery)
					.then((data) =>
						data.map((book) => {
							return {
								id: book.id,
								shelf: "none",
								title: book.title,
								authors: book.authors.join(", "),
								imageUrl: book.imageLinks.thumbnail,
							};
						})
					)
					.then((books) => setSearchedBooks(books))
					.catch((error) => console.log(error));
			}
		},
		[searchQuery]
	);

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
					{searchedBooks.map((book) => (
						<li key={book.id}>
							<Book
								id={book.id}
								title={book.title}
								authors={book.authors}
								imageUrl={book.imageUrl}
								selectedShelf={selectedShelf}
								updateShelf={updateShelfValue}
							/>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default SearchPage;
