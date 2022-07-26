import axios from 'axios'
import { createContext, useState } from 'react'
import { toast } from 'react-toastify'
const BookmarksContext = createContext()

const BookmarksProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([])
	const [activeTag, setActiveTag] = useState()
	const [searchTerm, setSearchTerm] = useState('')
	const [showLoader, setShowLoader] = useState(false)
	const [sortByDate, setSortByDate] = useState(false)
	const [sortBySource, setSortBySource] = useState(false)
	const stripHashtag = (text) => {
		return text.replace('#', '')
	}
	const updateReadStatus = async ({ id, currentStatus }) => {
		try {
			setShowLoader(true)
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
			await fetchBookmarks()
			setShowLoader(false)
			toast.success('Read status updated successfully')
		} catch (err) {
			setShowLoader(false)
			throw err
		}
	}
	const updateShareStatus = async ({ id, currentStatus }) => {
		try {
			setShowLoader(true)
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
			await fetchBookmarks()
			setShowLoader(false)
			toast.success('Share status updated successfully')
		} catch (err) {
			setShowLoader(false)
			throw err
		}
	}
	const updateTags = async ({ id, tags }) => {
		try {
			setShowLoader(true)
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
			await fetchBookmarks()
			await fetchTags()
			setShowLoader(false)
			toast.success('Tags updated successfully')
		} catch (err) {
			setShowLoader(false)
			throw err
		}
	}
	const importBookmarks = async () => {
		try {
			setShowLoader(true)
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
			// console.log(bookmarks)
			await fetchBookmarks()
			setShowLoader(false)
			toast.success('Bookmarks imported successfully')
		} catch (err) {
			// console.log('err', err)
			toast.error(
				err?.response?.data?.message ?? 'Error importing bookmarks'
			)
			setShowLoader(false)
			throw err
		}
	}
	const updateNotes = async ({ id, notes }) => {
		try {
			setShowLoader(true)
			const res = await axios.patch(
				process.env.NEXT_PUBLIC_HOST + `/crud/update?queryType=notes`,
				{
					bookmarkId: id,
					notes: notes,
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
			setShowLoader(false)
			toast.success('Notes updated successfully')
		} catch (err) {
			setShowLoader(false)
			throw err
		}
	}

	const fetchBookmarks = async () => {
		try {
			setShowLoader(true)
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
			let twitterData = []
			const chunkSize = 100
			for (let i = 0; i < tempBookmarkIds.length; i += chunkSize) {
				const chunk = tempBookmarkIds.slice(i, i + chunkSize)
				const res = await axios.post('/api/utils', {
					ids: chunk,
				})
				twitterData = [...twitterData, ...res.data]
				// do whatever
			}

			let mergedArr = []
			bookmarks.data.forEach((i) => {
				twitterData.forEach((j) => {
					if (j.id === i.twitter_status_id) {
						mergedArr.push({ backend: i, twitter: j })
					}
				})
			})
			setBookmarks(mergedArr)
			mergedArr.length === 0 && importBookmarks()
			// console.log(mergedArr)
			// console.log('mergedBookmarks', mergedBookmarks)
			// console.log('twt', res.data)
			// console.log('be', bookmarks.data)
			// setBookmarks(res.data)
			setShowLoader(false)
		} catch (err) {
			setShowLoader(false)
			throw err
		}
	}
	const fetchBookmark = async ({ id }) => {
		try {
			setShowLoader(true)
			const bookmark = await axios.get(
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
			const res = await axios.post('/api/utils', {
				ids: [bookmark?.data?.bookmark?.twitter_status_id],
			})

			setShowLoader(false)
			return {
				backend: bookmark?.data?.bookmark,
				twitter: res.data[0],
				ownershipStatus: bookmark?.data?.ownershipStatus,
			}
		} catch (err) {
			setShowLoader(false)
			toast.error('Error fetching bookmarks')
			throw err
		}
	}
	const fetchTags = async () => {
		try {
			setShowLoader(true)
			console.log('fetching tags', showLoader)
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
			setShowLoader(false)
			// toast.success('Tags fetched successfully')
			return res.data
		} catch (err) {
			setShowLoader(false)
			toast.error('Error fetching tags')
			throw err
		}
	}
	const deleteBookmark = async (id) => {
		try {
			setShowLoader(true)
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
			setShowLoader(false)
			toast.success('Bookmark deleted successfully')
		} catch (err) {
			setShowLoader(false)
			throw err
		}
	}
	const deleteTag = async (tagId) => {
		try {
			setShowLoader(true)
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

			await fetchBookmarks()
			setShowLoader(false)
			toast.success('Tag deleted successfully')
		} catch (err) {
			setShowLoader(false)
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
				showLoader,
				setShowLoader,
				setSortByDate,
				sortByDate,
				setSortBySource,
				sortBySource,
				updateNotes,
				stripHashtag,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	)
}

export { BookmarksContext, BookmarksProvider }
