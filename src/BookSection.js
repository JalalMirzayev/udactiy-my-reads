import React from "react";
import Book from "./Book.js";
import { BookType } from "./BookType.js";

const BookSection = (props) => {
	const { shelf, books, updateShelfValue } = props;
	const relevantBooks = books.filter((book) => book.shelf === shelf);

	return (
		<div className='bookshelf'>
			<h2 className='bookshelf-title'>{BookType[shelf]}</h2>
			<div className='bookshelf-books'>
				<ol className='books-grid'>
					{relevantBooks.map((book) => (
						<li key={book.id}>
							<Book
								id={book.id}
								title={book.title}
								authors={book.authors}
								imageUrl={book.imageUrl}
								selectedShelf={book.shelf}
								updateShelfValue={updateShelfValue}
							/>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default BookSection;
