import Tags from '../../src/components/Tags'
import BookmarkCards from '../../src/components/BookmarkCards'
import SearchBar from '../../src/components/SearchBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import { getTweets } from '../api/utils'

export default function dashboard() {
	const [bookmarks, setBookmarks] = useState([])
	const [user, setUser] = useState({})
	const getUser = async () => {
		const res = await axios.get(
			process.env.NEXT_PUBLIC_FETCH_ACCOUNT_DETAILS,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
				},
			}
		)
		console.log(res.data)
		setUser(res.data)
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
			console.log(res)
			setBookmarks(res.data)
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

	useEffect(() => {
		// importBookmarks()
		fetchBookmarks()
		getUser()
	}, [])

	return (
		<div className='min-h-screen overflow-hidden'>
			<div className='flex items-center justify-center h-24 border border-black'>
				<span>{user?.name}</span>
			</div>
			<div className='flex items-center justify-center h-24 border border-black'>
				<SearchBar />
			</div>

			<div className='flex'>
				<div className='flex flex-col items-start bg-dark-blue pt-10 w-1/5'>
					<Tags />
				</div>

				<div className='w-5/6'>
					<BookmarkCards
						bookmarks={bookmarks}
						deleteBookmark={deleteBookmark}
					/>
				</div>
			</div>
		</div>
	)
}
