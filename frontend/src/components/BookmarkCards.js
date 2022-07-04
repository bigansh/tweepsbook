import React from 'react'

const bookmarkCards = ({ bookmarks, deleteBookmark }) => {
	return (
		<div className='flex flex-wrap justify-evenly  p-1 m-3 h-full w-full'>
			{bookmarks?.map((bookmark, index) => {
				return (
					<div
						key={index}
						className='flex rounded-md flex-col items-center justify-center border w-1/4 h-60 p-1 m-2 '
					>
						<h1>{bookmark?.text}</h1>
						<button
							onClick={() => deleteBookmark(bookmark.id)}
							className='bg-dark-blue my-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						>
							Delete Bookmark
						</button>
					</div>
				)
			})}
		</div>
	)
}

export default bookmarkCards
