import React from "react";
import BookSection from "./BookSection.js";
import { Link } from "react-router-dom";

const ListBooksPage = (props) => {
	const { books, updateShelf, updateShelfValue } = props;

	return (
		<div className='list-books'>
			<div className='list-books-title'>
				<h1>MyReads</h1>
			</div>
			<div className='list-books-content'>
				<div>
					<BookSection
						shelf='currentlyReading'
						books={books}
						updateShelf={updateShelf}
						updateShelfValue={updateShelfValue}
					/>
					<BookSection
						shelf='wantToRead'
						books={books}
						updateShelf={updateShelf}
						updateShelfValue={updateShelfValue}
					/>
					<BookSection
						shelf='read'
						books={books}
						updateShelf={updateShelf}
						updateShelfValue={updateShelfValue}
					/>
				</div>
			</div>
			<div className='open-search'>
				<Link to='/search'>
					<button>Add a book</button>
				</Link>
			</div>
		</div>
	);
};

export default ListBooksPage;
