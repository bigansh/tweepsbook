import React from 'react'
import Dashboard from '../dashboard'
import BookmarkCards from '../../../src/components/BookmarkCards'
import { BookmarksContext } from '../../../contexts/BookmarksContext'

const archive = () => {
	const { bookmarks, archiveBookmark, deleteBookmark } =
		React.useContext(BookmarksContext)
	return (
		<Dashboard>
			<BookmarkCards
				bookmarks={bookmarks}
				deleteBookmark={deleteBookmark}
				archiveBookmark={archiveBookmark}
				archive={true}
			/>
		</Dashboard>
	)
}

export default archive
