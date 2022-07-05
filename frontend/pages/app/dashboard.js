import { useEffect, useState } from 'react'
import axios from 'axios'
import { BiLogOut } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'

import Tags from '../../src/components/Tags'
import TweepsBookIcon from '../../src/components/Icon'
import BookmarkCards from '../../src/components/BookmarkCards'
import SearchBar from '../../src/components/SearchBar'

export default function dashboard() {
	const [bookmarks, setBookmarks] = useState([])
	const [user, setUser] = useState({})
	const [menuActive, setMenuActive] = useState(false)

	const menuClick = () => {
		setMenuActive(!menuActive)
	}

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
		<div className='overflow-hidden scroll-smooth'>
			<div className='flex items-center justify-around h-24 border'>
				<TweepsBookIcon />

				<SearchBar />

				<div className='flex items-center justify-center'>
					<img
						src='https://pbs.twimg.com/profile_images/1541300431623598080/QNrH1wh1_400x400.jpg'
						className='w-12 h-12 m-1 rounded-full'
					/>
					<button className='m-1 p-1' onClick={menuClick}>
						<AiOutlineDown />
					</button>
					{menuActive && (
						<div className='flex flex-col drop-shadow-xl rounded-md p-2 relative top-16 w-32 z-10 bg-white'>
							<button className='flex items-center m-2'>
								<BiLogOut className='mr-2'/>
								Logout
							</button>
							<button className='flex items-center m-2'>
								<FiSettings className='mr-2'/>
								Settings
							</button>
						</div>
					)}
				</div>
			</div>

			<div className='flex '>
				<div className='flex flex-col h-screen items-start bg-dark-blue pt-10 w-56'>
					<Tags />
				</div>

				<div className='w-5/6 '>
					<div className='flex border-b items-start justify-between p-2 h-20'>
						<h1 className='pl-2 font-bold text-3xl'>#all</h1>
						<div className='flex'>
							<button className='flex text-xs h-8 items-center p-2 mx-3 justify-around opacity-80 ring ring-dark-blue/10  rounded-xl'>Sort By {' '} <AiOutlineDown className='mr-2' /></button>
							<button className='flex text-xs h-8 items-center p-2 mx-3 justify-around opacity-80 ring ring-dark-blue/10 rounded-xl'><AiOutlinePlus />{' '} Add Filter</button>
						</div>
					</div>
					<BookmarkCards
						bookmarks={bookmarks}
						deleteBookmark={deleteBookmark}
					/>
				</div>
			</div>
		</div>
	)
}
