import Tags from '../../src/components/Tags'
import BookmarkCards from '../../src/components/BookmarkCards'
import SearchBar from '../../src/components/SearchBar'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function dashboard() {
	const [bookmarks, setBookmarks] = useState([])
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
						Authorization:
							process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN,
					},
				}
			)
			console.log(bookmarks)
			setBookmarks(bookmarks.data)
		} catch (err) {
			throw err
		}
	}

	useEffect(() => {
		importBookmarks()
		fetchBookmarks()
	}, [])

	return (
		<div className='min-h-screen overflow-hidden'>
			<div className='flex items-center justify-center h-24 border border-black'>
				<SearchBar />
			</div>

			<div className='flex'>
				<div className='flex flex-col items-start bg-dark-blue pt-10 w-1/5'>
					<Tags />
				</div>

				<div className='w-5/6'>
					<BookmarkCards bookmarks={bookmarks} />
				</div>
			</div>
		</div>
	)
}
