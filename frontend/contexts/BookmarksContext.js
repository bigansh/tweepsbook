import axios from 'axios'
import { createContext, useState } from 'react'

const BookmarksContext = createContext()

const BookmarksProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([])

	const updateReadStatus = async ({ id, currentStatus }) => {
		try {
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_UPDATE_READ_STATUS_URL,
				{
					bookmarkId: id,
					readStatus: !currentStatus,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
				}
			)
			fetchBookmarks()
		} catch (err) {}
	}
	const updateShareStatus = async ({ id, currentStatus }) => {
		try {
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_UPDATE_SHARE_STATUS_URL,
				{
					bookmarkId: id,
					shareStatus: !currentStatus,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
				}
			)
			fetchBookmarks()
		} catch (err) {}
	}
	const updateTags = async ({ id, tags }) => {
		try {
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_UPDATE_TAGS_URL,
				{
					bookmarkId: id,
					tags: tags,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
				}
			)
			fetchBookmarks()
		} catch (err) {}
	}
	const importBookmarks = async () => {
		try {
			const bookmarks = await axios.post(
				process.env.NEXT_PUBLIC_IMPORT_BOOKMARKS_URL,
				{},
				{
					headers: {
						Authorization:
							process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN,
					},
				}
			)
			console.log(bookmarks)
		} catch (err) {
			throw err
		}
	}

	const fetchBookmarks = async () => {
		try {
			const bookmarks = await axios.get(
				process.env.NEXT_PUBLIC_FETCH_BOOKMARKS_URL,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
				}
			)
			const tempBookmarkIds = bookmarks.data.map(
				(bookmark) => bookmark.twitter_status_id
			)
			const res = await axios.post('/api/utils', {
				ids: tempBookmarkIds,
			})

			let mergedArr = []
			bookmarks.data.forEach((i) => {
				res.data.forEach((j) => {
					if (j.id === i.twitter_status_id) {
						mergedArr.push({ backend: i, twitter: j })
					}
				})
			})
			setBookmarks(mergedArr)
			console.log(mergedArr)
			// console.log('mergedBookmarks', mergedBookmarks)
			console.log('twt', res.data)
			console.log('be', bookmarks.data)
			// setBookmarks(res.data)
		} catch (err) {
			throw err
		}
	}
	const fetchBookmark = async ({ id }) => {
		try {
			const tags = await axios.get(
				process.env.NEXT_PUBLIC_FETCH_BOOKMARK_URL + id,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
				}
			)
		} catch (err) {
			throw err
		}
	}
	const fetchTags = async () => {
		try {
			const tags = await axios.get(
				process.env.NEXT_PUBLIC_FETCH_TAGS_URL,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
				}
			)
		} catch (err) {
			throw err
		}
	}
	const deleteBookmark = async (id) => {
		try {
			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_DELETE_BOOKMARK_URL}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
					data: {
						bookmarkId: id,
					},
				}
			)
			console.log(res)
			fetchBookmarks()
		} catch (err) {
			throw err
		}
	}
	const deleteTag = async (tagId) => {
		try {
			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_DELETE_BOOKMARK_URL}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
					},
					data: {
						tagId: tagId,
					},
				}
			)
			console.log(res)
			fetchBookmarks()
		} catch (err) {
			throw err
		}
	}

	return (
		<BookmarksContext.Provider
			value={{
				bookmarks,
				setBookmarks,
				updateReadStatus,
				importBookmarks,
				deleteBookmark,
				fetchBookmarks,
				updateShareStatus,
				updateTags,
				fetchTags,
				deleteTag,
				fetchBookmark,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	)
}

export { BookmarksContext, BookmarksProvider }
