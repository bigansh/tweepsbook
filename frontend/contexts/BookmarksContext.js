import axios from 'axios'
import { createContext, useState } from 'react'

const BookmarksContext = createContext()

const BookmarksProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([])
	const [activeTag, setActiveTag] = useState()
	const [searchTerm, setSearchTerm] = useState('')
	const updateReadStatus = async ({ id, currentStatus }) => {
		try {
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_HOST +
					`/crud/update?queryType=readStatus`,
				{
					bookmarkId: id,
					readStatus: !currentStatus,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
				}
			)
			fetchBookmarks()
		} catch (err) {}
	}
	const updateShareStatus = async ({ id, currentStatus }) => {
		try {
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_HOST +
					`/crud/update?queryType=shareStatus`,
				{
					bookmarkId: id,
					shareStatus: !currentStatus,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
				}
			)
			fetchBookmarks()
		} catch (err) {}
	}
	const updateTags = async ({ id, tags }) => {
		try {
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_HOST + `/crud/update?queryType=tags`,
				{
					bookmarkId: id,
					tags: tags,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
				}
			)
			fetchBookmarks()
		} catch (err) {}
	}
	const importBookmarks = async () => {
		try {
			const bookmarks = await axios.post(
				process.env.NEXT_PUBLIC_HOST + `/crud/create?queryType=twitter`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
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
				process.env.NEXT_PUBLIC_HOST + `/crud/read?queryType=bookmarks`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
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
				process.env.NEXT_PUBLIC_HOST +
					`/crud/read?queryType=bookmark&bookmarkId=` +
					id,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
				}
			)
		} catch (err) {
			throw err
		}
	}
	const fetchTags = async () => {
		try {
			const res = await axios.get(
				process.env.NEXT_PUBLIC_HOST + `/crud/read?queryType=tags`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
					},
				}
			)
			return res.data
		} catch (err) {
			throw err
		}
	}
	const deleteBookmark = async (id) => {
		try {
			const res = await axios.delete(
				process.env.NEXT_PUBLIC_HOST +
					`/crud/delete?queryType=bookmark`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
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
				process.env.NEXT_PUBLIC_HOST + `/crud/delete?queryType=tag`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'sessionToken'
						)}`,
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
				activeTag,
				setActiveTag,
				searchTerm,
				setSearchTerm,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	)
}

export { BookmarksContext, BookmarksProvider }
