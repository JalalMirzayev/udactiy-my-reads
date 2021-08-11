export const getBooks = (result) => {
	return result.map((book) => {
		return {
			id: book.id,
			shelf: book.shelf,
			title: book.title,
			authors: book.authors.join(", "),
			imageUrl: book.imageLinks.thumbnail,
		};
	});
};
