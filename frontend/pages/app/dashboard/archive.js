import React from 'react'
import Dashboard from '../dashboard'
import BookmarkCards from '../../../src/components/BookmarkCards'
import { BookmarksContext } from '../../../contexts/BookmarksContext'

const archive = () => {
	const { bookmarks, updateReadStatus, deleteBookmark } =
		React.useContext(BookmarksContext)
	return (
		<Dashboard>
			<BookmarkCards
				bookmarks={bookmarks}
				deleteBookmark={deleteBookmark}
				updateReadStatus={updateReadStatus}
				archive={true}
			/>
		</Dashboard>
	)
}

export default archive
