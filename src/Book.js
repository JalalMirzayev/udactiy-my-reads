import React from "react";

const Book = (props) => {
	const {
		id,
		title,
		authors,
		imageUrl,
		updateShelfValue,
		selectedShelf,
	} = props;

	return (
		<div className='book'>
			<div className='book-top'>
				<div
					className='book-cover'
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url("${imageUrl}")`,
					}}
				/>
				<div className='book-shelf-changer'>
					<select
						value={selectedShelf}
						onChange={(event) => updateShelfValue(id, event.target.value)}
					>
						<option value='move' disabled>
							Move to...
						</option>
						<option value='currentlyReading'>Currently Reading</option>
						<option value='wantToRead'>Want to Read</option>
						<option value='read'>Read</option>
						<option value='none'>None</option>
					</select>
				</div>
			</div>
			<div className='book-title'>{title}</div>
			<div className='book-authors'>{authors}</div>
		</div>
	);
};

export default Book;
